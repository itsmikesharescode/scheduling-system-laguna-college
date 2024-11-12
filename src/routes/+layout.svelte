<script lang="ts">
  import { i18n } from '$lib/i18n';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import '../app.css';
  import Header from '$lib/components/nav/Header.svelte';
  import { Toaster } from '$lib/components/ui/sonner/index.js';
  import { onNavigate } from '$app/navigation';

  let { children } = $props();

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<ParaglideJS {i18n}>
  <Toaster />
  {@render children()}
</ParaglideJS>
