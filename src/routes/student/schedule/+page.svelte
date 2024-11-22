<script lang="ts">
  import IssueReport from './components/IssueReport.svelte';
  import { page } from '$app/stores';
  import Schedules from '$lib/components/general/Schedules.svelte';
  import { fly } from 'svelte/transition';

  const { data } = $props();
</script>

<main class="container flex flex-col gap-5 px-[2rem] py-10">
  <h1 class="mt-5 text-5xl font-bold" in:fly={{ x: -100 }}>Schedule</h1>
  {#if $page.data.user}
    <section>
      <IssueReport reportIssueForm={data.reportIssueForm} />
    </section>
    <Schedules subjects={$page.data.user?.user_metadata.subjects || []} />
  {/if}
</main>
