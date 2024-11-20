<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { Trash2 } from 'lucide-svelte';
  import DeleteReminder from './DeleteReminder/DeleteReminder.svelte';
  import type { Database } from '$lib/types/database/database.types';

  interface Props {
    reminder: Database['public']['Tables']['reminders_tb']['Row'];
  }

  const { reminder }: Props = $props();

  let showDelete = $state(false);
</script>

<Button variant="destructive" size="icon" onclick={() => (showDelete = true)}>
  <Trash2 class="size-4" />
</Button>

<DeleteReminder bind:showDelete {reminder} />
