<script lang="ts" module>
  type TData = unknown;
  type TValue = unknown;
</script>

<script lang="ts" generics="TData, TValue">
  import {
    type ColumnDef,
    type ColumnFiltersState,
    type PaginationState,
    type RowSelectionState,
    type SortingState,
    type VisibilityState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel
  } from '@tanstack/table-core';
  import DataTableToolbar from './TableToolbar.svelte';
  import DataTablePagination from './TablePagination.svelte';
  import { createSvelteTable } from '$lib/components/ui/data-table/data-table.svelte';
  import FlexRender from '$lib/components/ui/data-table/flex-render.svelte';
  import * as Table from '$lib/components/ui/table/index';
  import type { AssignableStudentsPageSchema } from '../data/schemas';
  import Button from '$lib/components/ui/button/button.svelte';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import { page } from '$app/stores';
  import { toast } from 'svelte-sonner';
  import { invalidateAll } from '$app/navigation';

  let {
    columns,
    data
  }: {
    columns: ColumnDef<AssignableStudentsPageSchema, unknown>[];
    data: AssignableStudentsPageSchema[];
  } = $props();

  let rowSelection = $state<RowSelectionState>({});
  let columnVisibility = $state<VisibilityState>({});
  let columnFilters = $state<ColumnFiltersState>([]);
  let sorting = $state<SortingState>([]);
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const table = createSvelteTable({
    get data() {
      return data;
    },
    state: {
      get sorting() {
        return sorting;
      },
      get columnVisibility() {
        return columnVisibility;
      },
      get rowSelection() {
        return rowSelection;
      },
      get columnFilters() {
        return columnFilters;
      },
      get pagination() {
        return pagination;
      }
    },
    columns,
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      if (typeof updater === 'function') {
        rowSelection = updater(rowSelection);
      } else {
        rowSelection = updater;
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === 'function') {
        sorting = updater(sorting);
      } else {
        sorting = updater;
      }
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === 'function') {
        columnFilters = updater(columnFilters);
      } else {
        columnFilters = updater;
      }
    },
    onColumnVisibilityChange: (updater) => {
      if (typeof updater === 'function') {
        columnVisibility = updater(columnVisibility);
      } else {
        columnVisibility = updater;
      }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        pagination = updater(pagination);
      } else {
        pagination = updater;
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  const sb = $page.data.supabase;
  let assignLoader = $state(false);
  const handleAssign = async () => {
    if (!sb) return;

    const dbFormat = table.getFilteredSelectedRowModel().rows.map((row) => ({
      student_id: row.original.user_id,
      teacher_id: $page.url.searchParams.get('user_id') ?? ''
    }));

    assignLoader = true;
    const { error } = await sb.from('assigned_students_tb').insert(dbFormat);
    if (error) {
      alert(error.message);
      toast.error(error.message);
    } else {
      toast.success('Students assigned successfully');
      await invalidateAll();
    }
  };
</script>

<div class="space-y-4">
  <DataTableToolbar {table} />
  <DataTablePagination {table} />
  <div class="">
    <Table.Root>
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
          <Table.Row>
            {#each headerGroup.headers as header (header.id)}
              <Table.Head colspan={header.colSpan}>
                {#if !header.isPlaceholder}
                  <FlexRender
                    content={header.column.columnDef.header}
                    context={header.getContext()}
                  />
                {/if}
              </Table.Head>
            {/each}
          </Table.Row>
        {/each}
      </Table.Header>
      <Table.Body>
        {#each table.getRowModel().rows as row (row.id)}
          <Table.Row data-state={row.getIsSelected() && 'selected'}>
            {#each row.getVisibleCells() as cell (cell.id)}
              <Table.Cell>
                <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
              </Table.Cell>
            {/each}
          </Table.Row>
        {:else}
          <Table.Row>
            <Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  {#if table.getRowModel().rows.length > 11}
    <DataTablePagination {table} />
  {/if}

  <div class="absolute bottom-6 right-6">
    <Button
      disabled={table.getFilteredSelectedRowModel().rows.length < 1 || assignLoader}
      onclick={handleAssign}
    >
      {#if assignLoader}
        <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary">
          <LoaderCircle class="animate-spin" />
        </div>
      {/if}
      Assign
      {#if table.getFilteredSelectedRowModel().rows.length > 0}
        {table.getFilteredSelectedRowModel().rows.length} students
      {/if}
    </Button>
  </div>
</div>
