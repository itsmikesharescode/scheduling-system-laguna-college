<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import X from 'lucide-svelte/icons/x';
  import type { Table } from '@tanstack/table-core';
  import { priorities, statuses } from './data';
  import { DataTableFacetedFilter, DataTableViewOptions } from './index.js';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';

  let { table }: { table: Table<TData> } = $props();

  const isFiltered = $derived(table.getState().columnFilters.length > 0);
  const statusCol = $derived(table.getColumn('status'));
  const priorityCol = $derived(table.getColumn('priority'));
</script>

<div class="flex items-center justify-between">
  <div class="flex flex-1 items-center space-x-2">
    <Input
      placeholder="Search by full name..."
      value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
      oninput={(e) => {
        table.getColumn('email')?.setFilterValue(e.currentTarget.value);
      }}
      onchange={(e) => {
        table.getColumn('email')?.setFilterValue(e.currentTarget.value);
      }}
      class="h-8 w-[150px] lg:w-[250px]"
    />

    {#if isFiltered}
      <Button variant="ghost" onclick={() => table.resetColumnFilters()} class="h-8 px-2 lg:px-3">
        Reset
        <X />
      </Button>
    {/if}
  </div>
  <DataTableViewOptions {table} />
</div>
