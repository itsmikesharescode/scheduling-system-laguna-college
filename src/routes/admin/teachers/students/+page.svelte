<script lang="ts">
  import AssignStudent from './components/AssignStudent/AssignStudent.svelte';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import Table from './components/Table/Table.svelte';
  import { sampleData } from './components/Table/sampleData';
  import { columns } from './components/Table/columns';
  import { fly } from 'svelte/transition';
  import RemoveStudent from './components/RemoveStudent/RemoveStudent.svelte';

  const { data } = $props();
</script>

<main class="flex flex-col gap-5 px-[2rem] py-10">
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/admin/teachers">Teachers</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>Assign Students</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>
  <h1 class="mt-5 text-5xl font-bold" in:fly={{ x: -100 }}>ASSIGN STUDENTS</h1>

  <div class="sticky top-[5rem] z-20">
    <AssignStudent />
  </div>

  <Table data={sampleData} {columns} />
</main>

<RemoveStudent />
