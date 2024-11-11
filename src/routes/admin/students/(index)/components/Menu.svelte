<script lang="ts">
  import { EllipsisVertical } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

  let showUpdate = $state(false);
  let showDelete = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <EllipsisVertical class="size-5" />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Item>Update</DropdownMenu.Item>
      <DropdownMenu.Item>Delete</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
