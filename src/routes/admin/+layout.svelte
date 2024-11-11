<script lang="ts">
  import { adminRoutes } from '$lib';
  import Header from '$lib/components/nav/Header.svelte';
  const { data, children } = $props();
</script>

<Header navigations={adminRoutes} />
{@render children()}
