<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { tableState } from '../tableState.svelte';
</script>

<AlertDialog.Root open={tableState.getDeleteState()}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <Button variant="outline" onclick={() => tableState.setDeleteState(false)}>Cancel</Button>
      <Button>Continue</Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
