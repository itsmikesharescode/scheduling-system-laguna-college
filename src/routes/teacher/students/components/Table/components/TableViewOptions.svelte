<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import Settings2 from 'lucide-svelte/icons/settings-2';
  import type { Table } from '@tanstack/table-core';
  import { buttonVariants } from '$lib/components/ui/button/index';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
  import type { StudentsPageSchema } from '../data/schemas';
  let { table }: { table: Table<StudentsPageSchema> } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class={buttonVariants({
      variant: 'outline',
      size: 'sm',
      class: 'ml-auto hidden h-8 lg:flex'
    })}
  >
    <Settings2 />
    View
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>Toggle columns</DropdownMenu.GroupHeading>
      <DropdownMenu.Separator />
      {#each table
        .getAllColumns()
        .filter((col) => typeof col.accessorFn !== 'undefined' && col.getCanHide()) as column}
        <DropdownMenu.CheckboxItem
          controlledChecked
          checked={column.getIsVisible()}
          onCheckedChange={(v) => column.toggleVisibility(!!v)}
          class="capitalize"
        >
          {column.id}
        </DropdownMenu.CheckboxItem>
      {/each}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
