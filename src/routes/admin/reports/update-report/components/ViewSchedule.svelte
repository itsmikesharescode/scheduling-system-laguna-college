<script lang="ts">
  import Schedules from '$lib/components/general/Schedules.svelte';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Subject } from '$lib/types/database/aux.types';
  import CalendarCheck2 from 'lucide-svelte/icons/calendar-check-2';
  import X from 'lucide-svelte/icons/x';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';

  interface Props {
    subjects: Subject[];
  }

  let { subjects }: Props = $props();

  let open = $state(false);
  let showSched = $state(false);
  $effect(() => {
    if (open) {
      setTimeout(() => {
        showSched = true;
      }, 500);

      return () => {
        showSched = false;
      };
    }
  });
</script>

<Button onclick={() => (open = true)}>View Schedule <CalendarCheck2 /></Button>
<AlertDialog.Root bind:open>
  <AlertDialog.Content class="max-w-[1200px]">
    <button
      onclick={() => {
        open = false;
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>Viewing Calendar</AlertDialog.Title>
    </AlertDialog.Header>
    <ScrollArea class="max-h-[70dvh]">
      <div class="p-4">
        {#if showSched}
          <Schedules {subjects} />
        {:else}
          <section class="flex h-[70dvh] flex-col gap-2.5">
            <div class="flex w-full items-center gap-2.5">
              <Skeleton class="h-[100px] w-[100px] rounded-lg bg-primary/50" />
              <Skeleton class="h-[100px] w-full rounded-lg bg-primary/50" />
            </div>

            <Skeleton class="h-full w-full rounded-lg bg-primary/50" />
          </section>
        {/if}
      </div>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
