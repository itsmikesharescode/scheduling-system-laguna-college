<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { page } from '$app/stores';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';

  const { data } = $props();
</script>

{#snippet counter(count: number, title: string)}
  <Card.Root class="shadow-lg ">
    <Card.Content class="flex flex-col items-center justify-center gap-2.5">
      <span class="text-2xl font-bold">{title}</span>
      <span class="text-7xl font-bold text-[#0F224C]">{count.toLocaleString()}</span>
    </Card.Content>
  </Card.Root>
{/snippet}

<main class="container flex flex-col gap-10 py-10">
  <h1 class="mt-5 text-center text-5xl font-bold">STUDENT DASHBOARD</h1>

  <div class="grid grid-cols-2 gap-5">
    <section class="grid grid-rows-[3fr_2fr] gap-2.5">
      <section
        class="flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-[#0F224C] p-5 text-white"
      >
        <div class="flex flex-col items-center justify-center gap-2.5">
          <span class="text-center text-3xl">Hi, {$page.data.user?.user_metadata.lastName}.</span>
          <span class="text-center text-2xl">
            You have 5 classes today. Please check. Thank you!
          </span>
        </div>

        <Button href="/student/schedule" variant="secondary" size="sm">View Schedule</Button>
      </section>
      <section
        class="flex flex-col gap-2.5 rounded-2xl border-2 border-[#0F224C] p-5 text-[#0F224C]"
      >
        <span class=" text-3xl">Monday</span>
        <span class="text-center text-4xl font-semibold"> Nov 6, 1996 </span>
      </section>
    </section>

    <section class="flex flex-col gap-2.5 rounded-2xl bg-[#0F224C] p-5 text-white">
      <div class="flex w-full items-center justify-between">
        <span class="text-center text-3xl">Today's Schedule</span>
      </div>

      <ScrollArea class="h-[40dvh] p-5"></ScrollArea>
    </section>
  </div>
</main>
