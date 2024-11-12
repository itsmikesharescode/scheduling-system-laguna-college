<script lang="ts">
  import { EllipsisVertical } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import Update from './UpdateTeacher/Update.svelte';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { UpdateTeacherSchema } from './UpdateTeacher/schema';
  import Delete from './DeleteTeacher/Delete.svelte';

  interface Props {
    updateTeacherForm: SuperValidated<Infer<UpdateTeacherSchema>>;
  }

  const { updateTeacherForm }: Props = $props();

  let showUpdate = $state(false);
  let showDelete = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <EllipsisVertical class="size-5" />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Item onclick={() => (showUpdate = true)}>Update</DropdownMenu.Item>
      <DropdownMenu.Item onclick={() => (showDelete = true)}>Delete</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<Update bind:showUpdate {updateTeacherForm} />
<Delete bind:showDelete />
