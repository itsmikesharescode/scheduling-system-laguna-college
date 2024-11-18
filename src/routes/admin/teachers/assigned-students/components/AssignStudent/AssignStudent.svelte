<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X } from 'lucide-svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import { getAssignableStudents } from '../../../(database)/getAssignableStudents';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import { page } from '$app/stores';
  import Table from './Table/components/Table.svelte';
  import { columns } from './Table/components/columns';
  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Assign Student</Button>
<AlertDialog.Root bind:open>
  <AlertDialog.Content class="max-w-[90dvw] p-0">
    <button
      onclick={() => {
        open = false;
      }}
      class="absolute right-4 top-4 z-20 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />

      <span class="sr-only">Close</span>
    </button>

    <ScrollArea class="h-[80dvh]">
      {#await getAssignableStudents($page.data.supabase, $page.url.searchParams.get('user_id') ?? '')}
        <section class="flex flex-col gap-1.5 p-6 pt-10">
          <Skeleton class="h-[20px] w-full rounded-full bg-primary/50" />
          <Skeleton class="h-[20px] w-[80%] rounded-full bg-primary/50" />
          <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
          <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
        </section>
      {:then assignableStudents}
        <section class="px-6 pt-10">
          <Table
            data={assignableStudents?.map((item) => ({
              user_id: item.user_id,
              created_at: item.created_at,
              ...item.user_meta_data
            })) ?? []}
            {columns}
          />
        </section>
      {/await}
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
