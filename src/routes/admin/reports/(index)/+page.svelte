<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';

  const { data } = $props();
</script>

<main class="flex flex-col gap-5 px-[2rem] py-10">
  <h1 class="mt-5 text-5xl font-bold" in:fly={{ x: -100 }}>Reports</h1>

  <div class="flex flex-col gap-5">
    {#await data.getReports}
      <section class="flex flex-col gap-1.5">
        <Skeleton class="h-[20px] w-full rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[80%] rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
      </section>
    {:then reports}
      <Table
        data={reports?.map((item) => ({
          id: item.id,
          created_at: item.created_at,
          user_id: item.user_id,
          status: item.status,
          reporter_id: item.reporter_id
        })) ?? []}
        {columns}
      />
    {/await}
  </div>
</main>
