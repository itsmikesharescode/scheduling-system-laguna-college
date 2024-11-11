<script lang="ts">
  import { EllipsisVertical } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <EllipsisVertical class="size-5" />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>
          <span>Update</span>
        </DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.Item>
            <span>Assign Students</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <span>Update Information</span>
          </DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
      <DropdownMenu.Item>Delete</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
