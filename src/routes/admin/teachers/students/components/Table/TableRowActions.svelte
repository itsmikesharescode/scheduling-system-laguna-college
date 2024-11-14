<script lang="ts" module>
  type TData = unknown;
</script>

<script lang="ts" generics="TData">
  import UserRoundMinus from 'lucide-svelte/icons/user-round-minus';
  import type { Row } from '@tanstack/table-core';
  import { tableSchema } from './schema';
  import { Button } from '$lib/components/ui/button';
  import { tableState } from '../tableState.svelte';

  interface Props {
    row: Row<TData>;
  }

  let { row }: Props = $props();

  const user = tableSchema.parse(row.original);
</script>

<Button variant="destructive" size="icon" onclick={() => tableState.setDeleteState(true)}>
  <UserRoundMinus class="size-4" />
</Button>
