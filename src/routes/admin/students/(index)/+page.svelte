<script lang="ts">
  import { columns } from './components/Table/columns';
  import { fly } from 'svelte/transition';
  import Add from './components/AddStudent/Add.svelte';
  import Table from './components/Table/Table.svelte';
  import { sampleData } from './components/Table/sampleData';
  import UpdateStudent from './components/UpdateStudent/UpdateStudent.svelte';
  import DeleteStudent from './components/DeleteStudent/DeleteStudent.svelte';
  const { data } = $props();
</script>

<main class="flex flex-col gap-5 px-[2rem] py-10">
  <h1 class="mt-5 text-5xl font-bold" in:fly={{ x: -100 }}>STUDENTS</h1>

  <div class="flex flex-col gap-5">
    <div class="sticky top-[5rem] z-20">
      <Add addStudentForm={data.addStudentForm} />
    </div>
    <Table data={sampleData} {columns} />
  </div>
</main>

<UpdateStudent updateStudentForm={data.updateStudentForm} />
<DeleteStudent />
