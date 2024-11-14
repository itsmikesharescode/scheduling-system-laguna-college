<script lang="ts">
  import AddTeacher from './components/AddTeacher/Add.svelte';
  import Table from './components/Table/Table.svelte';
  import { sampleData } from './components/Table/sampleData';
  import { columns } from './components/Table/columns';
  import { fly } from 'svelte/transition';
  import UpdateTeacher from './components/UpdateTeacher/UpdateTeacher.svelte';
  import DeleteTeacher from './components/DeleteTeacher/DeleteTeacher.svelte';

  const { data } = $props();
</script>

<main class="flex flex-col gap-5 px-[2rem] py-10">
  <h1 class="mt-5 text-5xl font-bold" in:fly={{ x: -100 }}>TEACHERS</h1>

  <div class="flex flex-col gap-5">
    <div class="sticky top-[5rem] z-20">
      <AddTeacher addTeacherForm={data.addTeacherForm} />
    </div>
    <Table data={sampleData} {columns} />
  </div>
</main>

<UpdateTeacher updateTeacherForm={data.updateTeacherForm} />
<DeleteTeacher />
