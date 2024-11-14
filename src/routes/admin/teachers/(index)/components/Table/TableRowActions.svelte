<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import UserPen from 'lucide-svelte/icons/user-pen';
  import UserRoundMinus from 'lucide-svelte/icons/user-round-minus';
  import type { Row } from '@tanstack/table-core';
  import { tableSchema } from './schema';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button } from '$lib/components/ui/button';
  import { tableState } from '../tableState.svelte';
  import UserRoundPlus from 'lucide-svelte/icons/user-round-plus';

  interface Props {
    row: Row<TData>;
  }

  let { row }: Props = $props();

  const user = tableSchema.parse(row.original);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <Ellipsis />
        <span class="sr-only">Open Menu</span>
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="" align="start">
    <a href="/admin/teachers/students">
      <DropdownMenu.Item>
        <UserRoundPlus />
        Assign Students
      </DropdownMenu.Item>
    </a>
    <DropdownMenu.Item
      onclick={() => {
        tableState.setUpdateState(true);
        //set active row
      }}
    >
      <UserPen />
      Update
    </DropdownMenu.Item>
    <DropdownMenu.Item
      onclick={() => {
        tableState.setDeleteState(true);
        //set active row
      }}
    >
      <UserRoundMinus />
      Delete
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
