<script lang="ts">
  import IssueReport from './components/IssueReport.svelte';
  import { page } from '$app/stores';
  import Schedules from '$lib/components/general/Schedules.svelte';

  const { data } = $props();
</script>

<div class="flex flex-col gap-4 p-4">
  {#if $page.data.user}
    <section>
      <IssueReport reportIssueForm={data.reportIssueForm} />
    </section>
    <Schedules subjects={$page.data.user?.user_metadata.subjects || []} />
  {/if}
</div>
