<script lang="ts">
  import AddTeacher from './components/AddTeacher/Add.svelte';
  import { fly } from 'svelte/transition';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import { initTableState } from './components/Table/tableState.svelte';
  import UpdateTeacher from './components/UpdateTeacher/UpdateTeacher.svelte';
  import DeleteTeacher from './components/DeleteTeacher/DeleteTeacher.svelte';

  const { data } = $props();

  initTableState();
</script>

<main class="flex flex-col gap-5 px-[2rem] py-10">
  <h1 class="mt-5 text-5xl font-bold" in:fly={{ x: -100 }}>TEACHERS</h1>

  <div class="flex flex-col gap-5">
    <div class="sticky top-[5rem] z-20">
      <AddTeacher addTeacherForm={data.addTeacherForm} />
    </div>
    {#await data.getTeachers}
      <section class="flex flex-col gap-1.5">
        <Skeleton class="h-[20px] w-full rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[80%] rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
      </section>
    {:then teachers}
      <Table
        data={teachers?.map((item) => ({
          user_id: item.user_id,
          created_at: item.created_at,
          ...item.user_meta_data
        })) ?? []}
        {columns}
      />
    {/await}
  </div>
</main>

<UpdateTeacher updateTeacherForm={data.updateTeacherForm} />
<DeleteTeacher />
