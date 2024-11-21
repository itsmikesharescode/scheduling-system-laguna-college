<script lang="ts">
  import { enhance } from '$app/forms';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { useTableState } from '../Table/tableState.svelte';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import type { Result } from '$lib/types/types';
  import { toast } from 'svelte-sonner';

  const tableState = useTableState();

  let deleteLoader = $state(false);
  const deleteReportEvent: SubmitFunction = () => {
    deleteLoader = true;
    return async ({ result, update }) => {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success(data.msg);
          tableState.setShowDelete(false);
          tableState.setActiveRow(null);
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
      await update();
      deleteLoader = false;
    };
  };
</script>

<AlertDialog.Root open={tableState.getShowDelete()}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Confirm Report Deletion</AlertDialog.Title>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <Button
        variant="outline"
        type="button"
        onclick={() => {
          tableState.setShowDelete(false);
          tableState.setActiveRow(null);
        }}
      >
        Cancel
      </Button>
      <form method="post" action="?/deleteReportEvent" use:enhance={deleteReportEvent}>
        <input type="hidden" value={tableState.getActiveRow()?.id} name="id" />
        <Button type="submit" disabled={deleteLoader} class="relative">
          {#if deleteLoader}
            <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary">
              <LoaderCircle class="animate-spin" />
            </div>
          {/if}
          Continue
        </Button>
      </form>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
