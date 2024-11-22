<script lang="ts">
  import { fly } from 'svelte/transition';
  import Add from './components/AddStudent/Add.svelte';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import UpdateStudent from './components/UpdateStudent/UpdateStudent.svelte';
  import DeleteStudent from './components/DeleteStudent/DeleteStudent.svelte';
  import { initTableState } from './components/Table/tableState.svelte';

  const { data } = $props();

  initTableState();
</script>

<main class="container flex flex-col gap-5 px-[2rem] py-10">
  <h1 class="mt-5 text-5xl font-bold" in:fly={{ x: -100 }}>STUDENTS</h1>

  <div class="flex flex-col gap-5">
    <div class="sticky top-[5rem] z-20">
      <Add addStudentForm={data.addStudentForm} />
    </div>
    {#await data.streamStudents}
      <section class="flex flex-col gap-1.5">
        <Skeleton class="h-[20px] w-full rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[80%] rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
      </section>
    {:then students}
      <Table
        data={students?.map((item) => ({
          user_id: item.user_id,
          created_at: item.created_at,
          ...item.user_meta_data
        })) ?? []}
        {columns}
      />
    {/await}
  </div>
</main>

<UpdateStudent updateStudentForm={data.updateStudentForm} />
<DeleteStudent />
