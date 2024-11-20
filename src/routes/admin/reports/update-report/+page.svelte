<script lang="ts">
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import X from 'lucide-svelte/icons/x';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { page } from '$app/stores';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { superForm, type ValidationErrors } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { updateReportSchema, type UpdateReportSchema } from './schema.js';
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import Label from '$lib/components/ui/label/label.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { allSubjects, days, timeSlots } from '$lib';
  import Terminal from 'lucide-svelte/icons/terminal';
  import * as Alert from '$lib/components/ui/alert/index.js';
  import type { Result } from '$lib/types/types.js';
  import { toast } from 'svelte-sonner';
  import { onMount } from 'svelte';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { goto } from '$app/navigation';

  const { data } = $props();

  let showError = $state(false);

  const form = superForm(data.updateUserInfoForm, {
    validators: zodClient(updateReportSchema),
    id: crypto.randomUUID(),
    dataType: 'json',
    onUpdate: async ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success(data.msg);
          await goto('/admin/reports');
          break;
        case 401:
          toast.error(data.msg);
          break;
        case 400:
          showError = true;
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  let divElement = $state<HTMLElement>();

  let sections = $state([
    {
      id: crypto.randomUUID(),
      value: ''
    }
  ]);

  let subjects = $state([
    {
      id: crypto.randomUUID(),
      name: '',
      schedules: [
        {
          id: crypto.randomUUID(),
          startTime: '',
          endTime: '',
          day: ''
        }
      ]
    }
  ]);

  onMount(async () => {
    const userInfo = await data.getUserInfo;
    $formData.user_id = userInfo?.user_id ?? '';
    sections = (userInfo?.user_meta_data.sections ?? []) as typeof sections;
    subjects = (userInfo?.user_meta_data.subjects ?? []) as typeof subjects;
  });

  $effect(() => {
    $formData.sections = sections;
    $formData.subjects = subjects;
  });
</script>

<main class="flex flex-col gap-5 px-[2rem] py-10">
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/admin/reports">Reports</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page class=""
          >Updating for user_id
          <span class="text-muted-foreground">{$page.url.searchParams.get('user_id')}</span>
        </Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>

  <div class="grid grid-cols-[1fr_2fr] gap-2.5">
    <section>
      <div class="sticky top-[5rem]">
        <Alert.Root class="flex flex-col gap-2.5">
          <Terminal class="size-4" />
          <Alert.Title>Report Update Mode</Alert.Title>
          <Alert.Description class="flex flex-col gap-2.5 text-muted-foreground">
            <span>
              You can add multiple sections and subjects with their corresponding schedules. All
              changes will be saved when you click the Update button.
            </span>

            <span> Located at the upper right of the page. </span>
          </Alert.Description>
        </Alert.Root>
      </div>
    </section>
    <section class="">
      <form method="POST" action="?/updateScheduleEvent" use:enhance class="">
        <input type="hidden" name="user_id" bind:value={$formData.user_id} />
        <input type="hidden" name="sections" bind:value={$formData.sections} />
        <input type="hidden" name="subjects" bind:value={$formData.subjects} />
        <Form.Button disabled={$submitting} class="fixed right-6 top-[5rem] z-20">
          {#if $submitting}
            <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary">
              <LoaderCircle class="animate-spin" />
            </div>
          {/if}
          Update
        </Form.Button>
        <div class="grid grid-cols-2 gap-5">
          <section class="">
            <div class="sticky top-[5rem] flex flex-col gap-2.5">
              <div class=" flex flex-col gap-2.5 overflow-hidden p-2">
                {#each sections as section, i (section)}
                  <div
                    class="flex w-full flex-col gap-[10px]"
                    transition:fly={{ x: 100, duration: 200 }}
                    animate:flip={{ duration: 200 }}
                  >
                    <Label for={`${section.id}-section`}>Section {i + 1}</Label>
                    <div class="relative" bind:this={divElement}>
                      <Input
                        type="text"
                        id={`${section.id}-section`}
                        class="pr-[45px]"
                        placeholder={`Enter section ${i + 1}`}
                        bind:value={section.value}
                        oninput={() => {
                          $formData.sections[i] = {
                            id: section.id,
                            value: section.value
                          };
                        }}
                      />
                      {#if sections.length > 1}
                        <Button
                          size="sm"
                          onclick={() => sections.splice(i, 1)}
                          class="absolute right-0 top-1/2 -translate-y-1/2"
                        >
                          <X class="size-4" />
                        </Button>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
              <div class="z-10">
                <Button
                  onclick={() => {
                    sections.push({ id: crypto.randomUUID(), value: '' });
                    setTimeout(() => {
                      divElement?.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                  }}
                >
                  More Section
                </Button>
              </div>
            </div>
          </section>
          <section class="">
            <div class="sticky top-[5rem] flex flex-col gap-2.5 overflow-hidden">
              <div class="flex flex-col gap-2.5 p-2">
                {#each subjects as subject, i (subject)}
                  <div
                    class="relative flex w-full flex-col gap-[10px] border-b-2"
                    transition:fly={{ x: 100, duration: 200 }}
                    animate:flip={{ duration: 200 }}
                    bind:this={divElement}
                  >
                    {#if subjects.length > 1}
                      <Button
                        size="sm"
                        onclick={() => subjects.splice(i, 1)}
                        class="absolute right-0 top-5 z-10 -translate-y-1/2"
                      >
                        <X class="size-4" />
                      </Button>
                    {/if}
                    <Label for={`${subject.id}-subject`}>Subject</Label>
                    <div class="relative">
                      <Combobox
                        selections={allSubjects}
                        bind:selected={subject.name}
                        placeholder="Select subject"
                        name="Select Subject"
                      />

                      <ScrollArea class="">
                        <div class="flex flex-col gap-2.5 p-2">
                          {#each subject.schedules as schedule, j (schedule)}
                            <section
                              class="relative flex flex-col gap-[10px] rounded-lg border-2 p-2"
                              transition:fly={{ x: 100, duration: 200 }}
                              animate:flip={{ duration: 200 }}
                              bind:this={divElement}
                            >
                              {#if subject.schedules.length > 1}
                                <Button
                                  size="sm"
                                  onclick={() => subjects[i].schedules.splice(j, 1)}
                                  class="absolute right-0 top-5 z-10 -translate-y-1/2"
                                >
                                  <X class="size-4" />
                                </Button>
                              {/if}
                              <div class="flex flex-col gap-[10px]">
                                <Label for={`${schedule.id}-${j}-day`}>Day</Label>
                                <div class="relative">
                                  <Combobox
                                    selections={days}
                                    bind:selected={schedule.day}
                                    placeholder="Select Day"
                                    name="Select Day"
                                  />
                                </div>
                              </div>

                              <div class="grid grid-cols-2 gap-[10px]">
                                <div class="flex flex-col gap-[10px]">
                                  <Label for={`${schedule.id}-${j}-startTime`}>Start Time</Label>
                                  <div class="relative">
                                    <Combobox
                                      selections={timeSlots}
                                      bind:selected={schedule.startTime}
                                      placeholder="Select Start Time"
                                      name="Select Time"
                                    />
                                  </div>
                                </div>

                                <div class="flex flex-col gap-[10px]">
                                  <Label for={`${schedule.id}-${j}-endTime`}>End Time</Label>
                                  <div class="relative">
                                    <Combobox
                                      selections={timeSlots}
                                      bind:selected={schedule.endTime}
                                      placeholder="Select End Time"
                                      name="Select Time"
                                    />
                                  </div>
                                </div>
                              </div>
                            </section>
                          {/each}

                          <div class="">
                            <Button
                              size="sm"
                              onclick={() => {
                                subjects[i].schedules.push({
                                  id: crypto.randomUUID(),
                                  day: '',
                                  startTime: '',
                                  endTime: ''
                                });
                                setTimeout(() => {
                                  divElement?.scrollIntoView({ behavior: 'smooth' });
                                }, 200);
                              }}
                            >
                              More Schedule
                            </Button>

                            {#if subjects[i].schedules.length > 3}
                              <Button
                                size="sm"
                                variant="outline"
                                onclick={() =>
                                  (subjects[i].schedules = subjects[i].schedules.slice(0, 1))}
                              >
                                Clear
                              </Button>
                            {/if}
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                {/each}
              </div>

              <div class="z-10">
                <Button
                  size="sm"
                  onclick={() => {
                    subjects.push({
                      id: crypto.randomUUID(),
                      name: '',
                      schedules: [{ id: crypto.randomUUID(), day: '', startTime: '', endTime: '' }]
                    });
                    setTimeout(() => {
                      divElement?.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                  }}
                >
                  More Subject
                </Button>
                {#if subjects.length > 3}
                  <Button
                    size="sm"
                    variant="outline"
                    onclick={() => (subjects = subjects.slice(0, 1))}
                  >
                    Clear
                  </Button>
                {/if}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>
  </div>
</main>

<!--Errors-->
<Dialog.Root bind:open={showError}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title class="text-red-500">Ops!</Dialog.Title>
      <Dialog.Description>
        Please check the form make sure all fields are filled.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
