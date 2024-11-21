<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Database } from '$lib/types/database/database.types';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';

  interface Props {
    showDelete: boolean;
    reminder: Database['public']['Tables']['reminders_tb']['Row'];
  }
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { toast } from 'svelte-sonner';

  let { showDelete = $bindable(), reminder }: Props = $props();

  let loader = $state(false);
  const deleteReminderEvent: SubmitFunction = () => {
    loader = true;
    return async ({ result, update }) => {
      const { status } = result;

      switch (status) {
        case 200:
          toast.success('Reminder deleted successfully');
          showDelete = false;
          break;

        case 401:
          toast.error('Something went wrong');
          break;
      }
      await update();
      loader = false;
    };
  };
</script>

<AlertDialog.Root bind:open={showDelete}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Delete Reminder?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete this reminder from our database.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <Button variant="outline" onclick={() => (showDelete = false)}>Cancel</Button>
      <form method="post" action="?/deleteReminderEvent" use:enhance={deleteReminderEvent}>
        <input name="id" type="hidden" bind:value={reminder.id} />
        <input name="userId" type="hidden" bind:value={reminder.user_id} />
        <Button type="submit" disabled={loader} class="relative">
          {#if loader}
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
