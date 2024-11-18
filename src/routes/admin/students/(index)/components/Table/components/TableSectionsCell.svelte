<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import FileMinus from 'lucide-svelte/icons/file-minus';
  import Pen from 'lucide-svelte/icons/pen';
  import type { Row } from '@tanstack/table-core';
  import { type StudentPageSchema } from '../data/schemas';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  let { row }: { row: Row<StudentPageSchema> } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class="underline">View</DropdownMenu.Trigger>
  <DropdownMenu.Content class="max-w-[300px] p-2">
    <section class="flex flex-wrap gap-1.5">
      {#each row.original.sections as section}
        <Badge class="max-w-fit">
          <span>{section.value}</span>
        </Badge>
      {/each}
    </section>
  </DropdownMenu.Content>
</DropdownMenu.Root>
