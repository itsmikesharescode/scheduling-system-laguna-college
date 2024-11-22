<script lang="ts">
  import { studentRoutes } from '$lib';
  import Header from '$lib/components/nav/Header.svelte';
  const { children } = $props();
</script>

<Header navigations={studentRoutes} />
{@render children()}
