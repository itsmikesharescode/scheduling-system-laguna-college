<script lang="ts">
  import { fly } from 'svelte/transition';
  import { sampleData } from './components/Table/sampleData';
  import { columns } from './components/Table/columns';
  import Table from './components/Table/Table.svelte';
  import ViewReport from './components/ViewReport/ViewReport.svelte';
  import DeleteReport from './components/DeleteReport/DeleteReport.svelte';

  const { data } = $props();
</script>

<main class="flex flex-col gap-5 px-[2rem] py-10">
  <h1 class="mt-5 text-5xl font-bold" in:fly={{ x: -100 }}>Reports</h1>

  <Table data={sampleData} {columns} />
</main>

<ViewReport />
<DeleteReport />
