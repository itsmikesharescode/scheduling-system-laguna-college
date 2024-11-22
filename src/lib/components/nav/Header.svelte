<script lang="ts">
  import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
  import { i18n } from '$lib/i18n';
  import { page } from '$app/stores';
  import { goto, invalidateAll } from '$app/navigation';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import * as m from '$lib/paraglide/messages.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import CircleUserRound from 'lucide-svelte/icons/circle-user-round';

  function switchToLanguage(newLanguage: AvailableLanguageTag) {
    const canonicalPath = i18n.route($page.url.pathname);
    const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
    goto(localisedPath);
  }

  interface Props {
    navigations: {
      url: string;
      name: string;
    }[];
  }

  const { navigations }: Props = $props();

  const sb = $page.data.supabase;
  let logoutLoader = $state(false);
  const handleLogout = async () => {
    if (!sb) return;
    logoutLoader = true;
    await sb.auth.signOut();
    logoutLoader = false;
    await invalidateAll();
  };

  const navIndicator = (url: string) => {
    // Basic exact match
    if ($page.url.pathname === url) return true;

    // Check if current path starts with url and handle special cases
    if ($page.url.pathname.startsWith(url + '/')) {
      // Return false only for exact matches with excluded paths
      if (url === '/admin' || url === '/student' || url === '/teacher') {
        return url === $page.url.pathname.split('/')[1];
      }
      return true;
    }

    return false;
  };
</script>

<!-- <header class="container flex items-center justify-end gap-2 p-2">
  <button onclick={() import * as Avatar from "$lib/components/ui/avatar/index.js";=> switchToLanguage('en')}>English</button>
  <button onclick={() => switchToLanguage('ph')}>Tagalog</button>
</header>
 -->

<nav class="sticky top-0 z-30 flex items-center bg-[#0F224C] p-2">
  <section class="container flex items-center justify-end gap-2 p-2">
    <section class="flex w-full items-center justify-between px-[2rem]">
      <div class="flex items-center gap-2">
        <!-- <img src="/assets/nav-logo.png" alt="Nav logo" class="h-[40px]" />
        <span class="font-bold text-[#FFC700]">
          LC<span class="text-[#fff]">ITE</span><span>DSS</span>
        </span> -->
      </div>

      <div class="flex items-center gap-5">
        {#each navigations as navigation}
          <a
            href={navigation.url}
            class="{navIndicator(navigation.url)
              ? 'font-bold text-[#FFC700]'
              : 'text-white'} p-2 transition-all hover:scale-95"
          >
            {navigation.name}
          </a>
        {/each}

        <Popover.Root>
          <Popover.Trigger class="rounded-lg bg-white p-2">
            <div class="flex items-center gap-2">
              <CircleUserRound class="h-[30px] w-[30px]" />
            </div>
          </Popover.Trigger>
          <Popover.Content class="">
            <div class="flex items-center gap-2.5">
              <CircleUserRound class="h-[100px] w-[100px]" />
              <section class="flex flex-col">
                <span class="line-clamp-1 text-sm font-bold">
                  {$page.data.user?.user_metadata.firstName}
                  {$page.data.user?.user_metadata.middleName}
                  {$page.data.user?.user_metadata.lastName}
                </span>
                <span class="line-clamp-1 text-sm text-muted-foreground"
                  >{$page.data.user?.user_metadata.email}</span
                >
                <Button size="sm" onclick={handleLogout} class="relative mt-5">
                  {#if logoutLoader}
                    <div
                      class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary"
                    >
                      <LoaderCircle class="animate-spin" />
                    </div>
                  {/if}
                  Logout
                </Button>
              </section>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    </section>
  </section>
</nav>
