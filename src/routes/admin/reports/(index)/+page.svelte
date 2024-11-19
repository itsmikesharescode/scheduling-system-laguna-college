<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import DeleteReport from './components/DeleteReport/DeleteReport.svelte';
  import ViewReport from './components/ViewReport/ViewReport.svelte';
  import { initTableState } from './components/Table/tableState.svelte';

  const { data } = $props();

  initTableState();
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
          reporter_id: item.reporter_id,
          message: item.message,
          email: item.users_tb?.user_meta_data?.email ?? '',
          firstName: item.users_tb?.user_meta_data?.firstName ?? '',
          middleName: item.users_tb?.user_meta_data?.middleName ?? '',
          lastName: item.users_tb?.user_meta_data?.lastName ?? '',
          gender: item.users_tb?.user_meta_data?.gender ?? '',
          sections: item.users_tb?.user_meta_data?.sections ?? [],
          subjects: item.users_tb?.user_meta_data?.subjects ?? []
        })) ?? []}
        {columns}
      />
    {/await}
  </div>
</main>

<ViewReport />
<DeleteReport />
