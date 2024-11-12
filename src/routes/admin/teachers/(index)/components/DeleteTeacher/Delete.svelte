<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';

  interface Props {
    showDelete: boolean;
  }

  let { showDelete = $bindable() }: Props = $props();
</script>

<AlertDialog.Root bind:open={showDelete}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <Button variant="outline" onclick={() => (showDelete = false)}>Cancel</Button>
      <Button>Continue</Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
