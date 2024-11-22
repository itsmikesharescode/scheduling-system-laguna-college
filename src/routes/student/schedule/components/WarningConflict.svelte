<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';

  interface Props {
    conflictMsgs: string[];
    controls: {
      hasConflict: boolean;
      open: boolean;
    };
  }

  let { controls = $bindable(), conflictMsgs }: Props = $props();
</script>

<AlertDialog.Root bind:open={controls.hasConflict}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>You have conflict schedule!!</AlertDialog.Title>
      {#each conflictMsgs as msg}
        <AlertDialog.Description class="text-red-500">{msg}</AlertDialog.Description>
      {/each}
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>No now</AlertDialog.Cancel>
      <AlertDialog.Action
        onclick={() => {
          controls.hasConflict = false;
          controls.open = true;
        }}>Report</AlertDialog.Action
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
