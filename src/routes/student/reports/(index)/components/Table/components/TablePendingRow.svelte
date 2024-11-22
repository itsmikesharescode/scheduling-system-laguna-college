<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import Expand from 'lucide-svelte/icons/expand';
  import type { Row } from '@tanstack/table-core';
  import { type ReportPageSchema } from '../data/schemas';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  let { row }: { row: Row<ReportPageSchema> } = $props();

  const statusBGcolor = () => {
    if (row.getValue('status') === 'pending') return 'bg-pink-500 text-white';
    if (row.getValue('status') === 'resolved') return 'bg-green-500 text-white';
    if (row.getValue('status') === 'rejected') return 'bg-red-500 text-white';
  };
</script>

<Badge class="{statusBGcolor()} hover:bg-default">{row.getValue('status')}</Badge>
