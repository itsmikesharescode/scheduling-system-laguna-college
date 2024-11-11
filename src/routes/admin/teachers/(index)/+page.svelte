<script lang="ts">
  import Search from '$lib/components/general/Search.svelte';
  import * as Table from '$lib/components/ui/table/index.js';
  import Menu from './components/Menu.svelte';
  import AddTeacher from './components/AddTeacher/AddTeacher.svelte';
</script>

<main class="container flex flex-col gap-5">
  <h1 class="mt-5 text-center text-5xl font-bold">TEACHERS</h1>

  <div class="flex items-center justify-between">
    <AddTeacher />
    <Search class="w-[300px]" placeholder="Search full name ..." />
  </div>
  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[50px]"></Table.Head>
        <Table.Head class="">Full Name</Table.Head>
        <Table.Head>Email</Table.Head>
        <Table.Head>Sections</Table.Head>
        <Table.Head class="">Subjects</Table.Head>
        <Table.Head class="">Created At</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each Array(5) as _}
        <Table.Row>
          <Table.Cell class=""><Menu /></Table.Cell>
          <Table.Cell class="font-medium">John Doe</Table.Cell>
          <Table.Cell>john.doe@example.com</Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell class="">2024-01-01</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</main>
