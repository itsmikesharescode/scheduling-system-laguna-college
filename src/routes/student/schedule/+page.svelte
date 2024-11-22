<script lang="ts">
  import Schedules from './components/Schedules.svelte';
  import IssueReport from './components/IssueReport.svelte';
  import { page } from '$app/stores';

  const { data } = $props();
</script>

<div class="flex flex-col gap-4 p-4">
  {#if $page.data.user}
    <section>
      <IssueReport reportIssueForm={data.reportIssueForm} />
    </section>
    <Schedules />
  {/if}
</div>
