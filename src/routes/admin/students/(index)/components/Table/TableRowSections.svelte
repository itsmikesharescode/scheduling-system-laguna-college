<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  import { userSchema, type UserSchema } from './schema';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button } from '$lib/components/ui/button';
  import Expand from 'lucide-svelte/icons/expand';

  let { row }: { row: Row<UserSchema> } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" class="flex h-8 p-0 px-2 data-[state=open]:bg-muted">
        <Expand class="size-4" />
        <span>View Sections</span>
        <span class="sr-only">Open Sections</span>
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-[160px]" align="end">
    {#each row.original.sections as section}
      <DropdownMenu.Label class="text-sm font-medium">{section.value}</DropdownMenu.Label>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
