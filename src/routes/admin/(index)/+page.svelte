<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Plus } from 'lucide-svelte';
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
  <h1 class="mt-5 text-center text-5xl font-bold">ADMIN DASHBOARD</h1>

  <div class="grid grid-cols-2 gap-5">
    <section
      class="flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-[#0F224C] p-5 text-white"
    >
      <div class="flex flex-col items-center justify-center gap-2.5">
        <span class="text-center text-3xl">Hi, Admin.</span>
        <span class="text-center text-2xl">
          We have notified you of the two schedule conflicts from BSIT-4. Please check. Thank you!
        </span>
      </div>

      <Button variant="secondary" size="sm">View Schedule</Button>
    </section>

    <section class="flex flex-col gap-2.5 rounded-2xl bg-[#0F224C] p-5 text-white">
      <div class="flex w-full items-center justify-between">
        <span class="text-center text-3xl">Daily Reminder</span>
        <Button size="sm" variant="secondary">
          <Plus class="size-4" />
          Add
        </Button>
      </div>

      <ScrollArea class="h-[40dvh] p-5">
        <div class="flex flex-col gap-2.5">
          {#each Array(5) as _}
            <section class="w-full">
              <span>Upcomming</span>
              <div class="flex w-full flex-col rounded-lg border-2 p-2">
                <span>DSS Meeting</span>
                <span class="text-sm text-muted-foreground">09:30 AM</span>
              </div>
            </section>
          {/each}
        </div>
      </ScrollArea>
    </section>
  </div>

  <section class="grid w-full grid-cols-3 gap-5">
    {@render counter(40, 'Total Teachers')}
    {@render counter(1200, 'Total Students')}
    {@render counter(30, 'Total Reports')}
  </section>
</main>
