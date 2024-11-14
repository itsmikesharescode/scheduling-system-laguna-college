<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import type { Row } from '@tanstack/table-core';
  import { tableSchema } from './schema';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button } from '$lib/components/ui/button';
  import Expand from 'lucide-svelte/icons/expand';
  let { row }: { row: Row<TData> } = $props();

  const user = tableSchema.parse(row.original);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" class="flex h-8 p-0 px-2 data-[state=open]:bg-muted">
        <Expand class="size-4" />
        <span>View Subjects</span>
        <span class="sr-only">Open Subjects</span>
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-fit" align="end">
    {#each user.subjects as subject}
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>
          <span>{subject.name}</span>
        </DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          {#each subject.schedules as schedule}
            <DropdownMenu.Label class="text-sm font-medium">
              <span>{schedule.day} - {schedule.startTime} - {schedule.endTime}</span>
            </DropdownMenu.Label>
          {/each}
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
