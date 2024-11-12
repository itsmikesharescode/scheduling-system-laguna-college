<script lang="ts">
  import { EllipsisVertical } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import Update from './UpdateStudent/Update.svelte';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { UpdateStudentSchema } from './UpdateStudent/schema';

  interface Props {
    updateStudentForm: SuperValidated<Infer<UpdateStudentSchema>>;
  }

  const { updateStudentForm }: Props = $props();

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
      <DropdownMenu.Item>Delete</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<Update bind:showUpdate {updateStudentForm} />
