<script lang="ts">
  import { EllipsisVertical } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

  import type { Infer, SuperValidated } from 'sveltekit-superforms';

  /*  interface Props {
    updateStudentForm: SuperValidated<Infer<UpdateStudentSchema>>;
  }

  const { updateStudentForm }: Props = $props(); */

  let showView = $state(false);
  let showUpdate = $state(false);
  let showDelete = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <EllipsisVertical class="size-5" />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Item onclick={() => (showView = true)}>View</DropdownMenu.Item>
      <DropdownMenu.Item onclick={() => (showDelete = true)}>Delete</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
