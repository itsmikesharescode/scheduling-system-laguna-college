<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { useTableState } from '../Table/tableState.svelte';
  import X from 'lucide-svelte/icons/x';
  import NotebookPen from 'lucide-svelte/icons/notebook-pen';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import { page } from '$app/stores';
  import { toast } from 'svelte-sonner';
  import { goto, invalidateAll } from '$app/navigation';

  const tableState = useTableState();

  const sb = $page.data.supabase;
  let updateLoader = false;
  const handleUpdate = async (action: 'resolved' | 'rejected') => {
    if (!sb) return;
    updateLoader = true;
    const { error } = await sb
      .from('reports_tb')
      .update({ status: action })
      .eq('id', tableState.getActiveRow()?.id);

    if (error) return null;
    await invalidateAll();
    updateLoader = false;
    toast.success(`Report ${action} successfully`);
    tableState.setShowView(false);
  };
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
      <span class="text-sm">
        {tableState.getActiveRow()?.message}
      </span>
    </ScrollArea>
    <AlertDialog.Footer>
      {#if tableState.getActiveRow()?.status !== 'rejected'}
        <Button
          disabled={updateLoader}
          variant="destructive"
          onclick={() => handleUpdate('rejected')}
          class="relative"
        >
          {#if updateLoader}
            <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary">
              <LoaderCircle class="animate-spin" />
            </div>
          {/if}
          Reject
        </Button>
      {/if}

      {#if tableState.getActiveRow()?.status !== 'resolved'}
        <Button
          disabled={updateLoader}
          class="relative bg-green-500 text-white hover:bg-green-500/80"
          onclick={() => handleUpdate('resolved')}
        >
          {#if updateLoader}
            <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary">
              <LoaderCircle class="animate-spin" />
            </div>
          {/if}
          Resolved
        </Button>
      {/if}

      <Button
        disabled={updateLoader}
        href={`/admin/reports/update-report?user_id=${tableState.getActiveRow()?.user_id}`}
      >
        <NotebookPen class="size-4" />
        Update
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
