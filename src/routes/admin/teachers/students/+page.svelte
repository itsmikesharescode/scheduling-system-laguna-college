<script lang="ts">
  import Search from '$lib/components/general/Search.svelte';
  import * as Table from '$lib/components/ui/table/index.js';
  import AssignStudent from './components/AssignStudent/AssignStudent.svelte';
  import RemoveStudent from './components/RemoveStudent/RemoveStudent.svelte';
  import { CornerUpLeft } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';
  import Menu from './components/Menu.svelte';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

  const { data } = $props();
</script>

<main class="container flex flex-col gap-5 py-10">
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

  <div class="flex items-center justify-between">
    <AssignStudent />
    <Search
      selections={[
        { label: 'First Name', value: 'firstName' },
        { label: 'Middle Name', value: 'middleName' },
        { label: 'Last Name', value: 'lastName' },
        { label: 'Email', value: 'email' },
        { label: 'Created At', value: 'createdAt' }
      ]}
      class="w-[300px]"
      placeholder="Search student full name ..."
    />
  </div>

  {#if $page.url.searchParams.get('search')}
    <div class="flex justify-end">
      <a href="/admin/teachers" class="flex items-center gap-2 transition-all hover:underline">
        <CornerUpLeft class="size-4" />
        <span class="text-sm">Clear search</span>
      </a>
    </div>
  {/if}

  <Table.Root>
    <Table.Caption>A list of teachers.</Table.Caption>
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
          <Table.Cell class="">
            <Menu />
          </Table.Cell>
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
