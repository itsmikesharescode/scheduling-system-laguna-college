<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import AddReminder from './components/AddReminder/AddReminder.svelte';
  import Menu from './components/Menu.svelte';
  import { page } from '$app/stores';

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
  <h1 class="mt-5 text-center text-5xl font-bold">ADMIN DASHBOARD</h1>

  <div class="grid grid-cols-2 gap-5">
    <section
      class="flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-[#0F224C] p-5 text-white"
    >
      <div class="flex flex-col items-center justify-center gap-2.5">
        <span class="text-center text-3xl">
          Hi, Admin. {$page.data?.user?.user_metadata.firstName}
        </span>
        <span class="text-center text-2xl"> You can view reports here </span>
      </div>

      <Button href="/admin/reports" variant="secondary" size="sm">View Reports</Button>
    </section>

    <section class="flex flex-col gap-2.5 rounded-2xl bg-[#0F224C] p-5 text-white">
      <div class="flex w-full items-center justify-between">
        <span class="text-center text-3xl">Daily Reminder</span>
        <AddReminder addReminderForm={data.addReminderForm} />
      </div>

      <ScrollArea class="h-[40dvh] p-5">
        <div class="flex flex-col gap-2.5">
          {#await data.getReminders}
            {#each Array(4) as _}
              <section class="flex w-full flex-col gap-1.5">
                <span><Skeleton class="h-[20px] w-[30%] rounded-full" /></span>
                <div class="flex w-full items-center justify-between rounded-lg border-2 p-2">
                  <div class="flex flex-col gap-1.5">
                    <span><Skeleton class="h-[20px] w-[120px] rounded-full" /></span>
                    <span><Skeleton class="h-[20px] w-[80px] rounded-full" /></span>
                  </div>

                  <Skeleton class="h-[40px] w-[40px] rounded-lg" />
                </div>
              </section>
            {/each}
          {:then reminders}
            {#if !reminders?.length}
              <span class="text-center text-muted-foreground">No reminders found</span>
            {/if}

            {#each reminders ?? [] as reminder}
              <section class="flex w-full flex-col gap-1.5">
                <span>Upcomming</span>
                <div class="flex w-full items-center justify-between rounded-lg border-2 p-2">
                  <div class="flex flex-col">
                    <span>{reminder.title}</span>
                    <span class="text-sm text-muted-foreground">{reminder.time}</span>
                  </div>

                  <Menu {reminder} />
                </div>
              </section>
            {/each}
          {/await}
        </div>
      </ScrollArea>
    </section>
  </div>

  {#await data.getDashboardCounts}
    <section class="grid w-full grid-cols-3 gap-5">
      <Card.Root class="shadow-lg ">
        <Card.Content class="flex flex-col items-center justify-center gap-2.5">
          <span class="text-2xl font-bold">Total Teachers</span>
          <span class="text-7xl font-bold text-[#0F224C]">
            <Skeleton class="h-[50px] w-[60px] rounded-lg bg-[#0F224C]" />
          </span>
        </Card.Content>
      </Card.Root>

      <Card.Root class="shadow-lg ">
        <Card.Content class="flex flex-col items-center justify-center gap-2.5">
          <span class="text-2xl font-bold">Total Students</span>
          <span class="text-7xl font-bold text-[#0F224C]">
            <Skeleton class="h-[50px] w-[60px] rounded-lg bg-[#0F224C]" />
          </span>
        </Card.Content>
      </Card.Root>

      <Card.Root class="shadow-lg ">
        <Card.Content class="flex flex-col items-center justify-center gap-2.5">
          <span class="text-2xl font-bold">Total Reports</span>
          <span class="text-7xl font-bold text-[#0F224C]">
            <Skeleton class="h-[50px] w-[60px] rounded-lg bg-[#0F224C]" />
          </span>
        </Card.Content>
      </Card.Root>
    </section>
  {:then counts}
    <section class="grid w-full grid-cols-3 gap-5">
      {@render counter(counts?.teacher_count ?? 0, 'Total Teachers')}
      {@render counter(counts?.student_count ?? 0, 'Total Students')}
      {@render counter(counts?.report_count ?? 0, 'Total Reports')}
    </section>
  {/await}
</main>
