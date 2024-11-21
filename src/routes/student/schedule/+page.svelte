<script lang="ts">
  import Schedules from './components/Schedules.svelte';
  import IssueReport from './components/IssueReport.svelte';
  import { page } from '$app/stores';
  import { isScheduleConflicting } from '$lib';

  const { data } = $props();

  let open = $state(false);
</script>

<div class="flex flex-col gap-4 p-4">
  {#if $page.data.user}
    <section>
      <IssueReport bind:open reportIssueForm={data.reportIssueForm} user={$page.data.user} />
    </section>
    <Schedules />
  {/if}
</div>
