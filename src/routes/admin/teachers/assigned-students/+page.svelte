<script lang="ts">
  import AssignStudent from './components/AssignStudent/AssignStudent.svelte';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { fly } from 'svelte/transition';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import Table from './components/Table/components/Table.svelte';
  import { columns } from './components/Table/components/columns';
  import RemoveStudent from './components/RemoveStudent/RemoveStudent.svelte';
  import { initTableState } from './components/Table/tableState.svelte';
  import { page } from '$app/stores';
  const { data } = $props();

  initTableState();
</script>

<main class="container flex flex-col gap-5 px-[2rem] py-10">
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/admin/teachers">Teachers</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>
          Assign Students for Teacher 👉 {$page.url.searchParams.get('lastname')}
          {$page.url.searchParams.get('firstname')}
          {$page.url.searchParams.get('middlename')}
        </Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>
  <h1 class="mt-5 text-5xl font-bold" in:fly={{ x: -100 }}>ASSIGNED STUDENTS</h1>

  <div class="sticky top-[5rem] z-20">
    <AssignStudent />
  </div>

  {#await data.getTeacherStudents}
    <section class="flex flex-col gap-1.5">
      <Skeleton class="h-[20px] w-full rounded-full bg-primary/50" />
      <Skeleton class="h-[20px] w-[80%] rounded-full bg-primary/50" />
      <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
      <Skeleton class="h-[20px] w-[90%] rounded-full bg-primary/50" />
    </section>
  {:then teacherStudents}
    <Table
      data={teacherStudents?.map((item) => ({
        id: item.id,
        created_at: item.created_at,
        user_id: item.students_tb?.user_id ?? '',
        email: item.students_tb?.user_meta_data?.email ?? '',
        studentId: item.students_tb?.user_meta_data?.studentId ?? '',
        firstName: item.students_tb?.user_meta_data?.firstName ?? '',
        middleName: item.students_tb?.user_meta_data?.middleName ?? '',
        lastName: item.students_tb?.user_meta_data?.lastName ?? '',
        gender: item.students_tb?.user_meta_data?.gender ?? '',
        yearLevel: item.students_tb?.user_meta_data?.yearLevel ?? '',
        course: item.students_tb?.user_meta_data?.course ?? '',
        sections: item.students_tb?.user_meta_data?.sections ?? [],
        subjects: item.students_tb?.user_meta_data?.subjects ?? []
      })) ?? []}
      {columns}
    />
  {/await}
</main>

<RemoveStudent />
