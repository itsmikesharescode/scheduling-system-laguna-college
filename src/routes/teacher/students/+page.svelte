<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import { initTableState } from './components/Table/tableState.svelte';

  const { data } = $props();

  initTableState();
</script>

<main class="container flex flex-col gap-5 px-[2rem] py-10">
  <h1 class="mt-5 text-5xl font-bold" in:fly={{ x: -100 }}>Students</h1>

  <div class="flex flex-col gap-5">
    {#await data.getTeacherStudents}
      <section class="flex flex-col gap-1.5">
        <Skeleton class="h-[20px] w-full rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[80%] rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
        <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
      </section>
    {:then students}
      <Table
        data={students?.map((item) => ({
          id: item.id,
          created_at: item.created_at,
          studentId: item.students_tb?.user_meta_data.studentId ?? '',
          firstName: item.students_tb?.user_meta_data.firstName ?? '',
          middleName: item.students_tb?.user_meta_data.middleName ?? '',
          lastName: item.students_tb?.user_meta_data.lastName ?? '',
          gender: item.students_tb?.user_meta_data.gender ?? '',
          yearLevel: item.students_tb?.user_meta_data.yearLevel ?? '',
          course: item.students_tb?.user_meta_data.course ?? '',
          email: item.students_tb?.user_meta_data.email ?? '',
          sections: item.students_tb?.user_meta_data.sections ?? [],
          subjects: item.students_tb?.user_meta_data.subjects ?? []
        })) ?? []}
        {columns}
      />
    {/await}
  </div>
</main>
