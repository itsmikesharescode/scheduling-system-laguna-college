<script lang="ts">
  import { teacherRoutes } from '$lib';
  import Header from '$lib/components/nav/Header.svelte';
  const { children } = $props();
</script>

<Header navigations={teacherRoutes} />
{@render children()}
