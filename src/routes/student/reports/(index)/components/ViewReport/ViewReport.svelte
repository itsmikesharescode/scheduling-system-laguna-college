<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { useTableState } from '../Table/tableState.svelte';
  import X from 'lucide-svelte/icons/x';

  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import { page } from '$app/stores';

  const tableState = useTableState();
</script>

<AlertDialog.Root open={tableState.getShowView()}>
  <AlertDialog.Content>
    <button
      onclick={() => {
        tableState.setActiveRow(null);
        tableState.setShowView(false);
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>View Report</AlertDialog.Title>
      <AlertDialog.Description></AlertDialog.Description>
    </AlertDialog.Header>
    <ScrollArea class="max-h-[50dvh]">
      <pre class="whitespace-pre-wrap break-words font-poppins text-sm">{tableState.getActiveRow()
          ?.message}</pre>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
