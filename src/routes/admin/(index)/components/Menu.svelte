<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { Trash2 } from 'lucide-svelte';
  import DeleteReminder from './DeleteReminder/DeleteReminder.svelte';

  let showDelete = $state(false);
</script>

<Button variant="destructive" size="icon" onclick={() => (showDelete = true)}>
  <Trash2 class="size-4" />
</Button>

<DeleteReminder bind:showDelete />
