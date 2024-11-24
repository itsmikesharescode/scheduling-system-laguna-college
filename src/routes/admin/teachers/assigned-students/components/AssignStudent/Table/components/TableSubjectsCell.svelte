<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import Pen from 'lucide-svelte/icons/pen';
  import type { Row } from '@tanstack/table-core';
  import { type AssignableStudentsPageSchema } from '../data/schemas';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import Expand from 'lucide-svelte/icons/expand';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

  let { row }: { row: Row<AssignableStudentsPageSchema> } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class="flex items-center gap-1.5 transition-all duration-150 hover:underline"
  >
    <Expand class="size-4" />
    View
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="max-w-[300px] p-2">
    <section class="flex flex-wrap gap-1.5">
      <ScrollArea class="max-h-[300px] p-2">
        {#each row.original.subjects as subject}
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <span>{subject.name}</span>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <section class="flex flex-col gap-1.5 p-2">
                {#each subject.schedules as schedule}
                  <span>{schedule.day} {schedule.startTime} - {schedule.endTime}</span>
                {/each}
              </section>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        {/each}
      </ScrollArea>
    </section>
  </DropdownMenu.Content>
</DropdownMenu.Root>
