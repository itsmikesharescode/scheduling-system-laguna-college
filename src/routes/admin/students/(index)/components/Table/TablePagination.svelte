<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import ChevronRight from 'lucide-svelte/icons/chevron-right';
  import ChevronLeft from 'lucide-svelte/icons/chevron-left';
  import ChevronsRight from 'lucide-svelte/icons/chevrons-right';
  import ChevronsLeft from 'lucide-svelte/icons/chevrons-left';
  import type { Table } from '@tanstack/table-core';
  import { Button } from '$lib/components/ui/button';

  let { table }: { table: Table<TData> } = $props();
</script>

<div class="flex items-center justify-between px-2">
  <div class="flex items-center space-x-6 lg:space-x-8">
    <div class="flex w-[100px] items-center justify-center text-sm font-medium">
      Page {table.getState().pagination.pageIndex + 1} of
      {table.getPageCount()}
    </div>
    <div class="flex items-center space-x-2">
      <Button
        variant="outline"
        class="hidden size-8 p-0 lg:flex"
        onclick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span class="sr-only">Go to first page</span>
        <ChevronsLeft />
      </Button>
      <Button
        variant="outline"
        class="size-8 p-0"
        onclick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span class="sr-only">Go to previous page</span>
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        class="size-8 p-0"
        onclick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span class="sr-only">Go to next page</span>
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        class="hidden size-8 p-0 lg:flex"
        onclick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span class="sr-only">Go to last page</span>
        <ChevronsRight />
      </Button>
    </div>
  </div>
</div>
