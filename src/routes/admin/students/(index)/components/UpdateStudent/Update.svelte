<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { updateStudentSchema, type UpdateStudentSchema } from './schema';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import { LoaderCircle, X } from 'lucide-svelte';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { Label } from '$lib/components/ui/label/index';
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { allSubjects, days, timeSlots } from '$lib';
  import type { Result } from '$lib/types/types';
  import { toast } from 'svelte-sonner';

  interface Props {
    showUpdate: boolean;
    updateStudentForm: SuperValidated<Infer<UpdateStudentSchema>>;
  }

  let { showUpdate = $bindable(), updateStudentForm }: Props = $props();

  const form = superForm(updateStudentForm, {
    validators: zodClient(updateStudentSchema),
    id: crypto.randomUUID(),
    dataType: 'json',
    onUpdate: ({ result, form }) => {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success(data.msg);
          reset();
          cleanUpStates();
          showUpdate = false;
          break;
        case 400:
          if (
            form.data.course &&
            form.data.email &&
            form.data.firstName &&
            form.data.lastName &&
            form.data.middleName &&
            form.data.password &&
            form.data.gender &&
            form.data.yearLevel
          ) {
            toast.error('Please fill up all required fields such as sections and subjects');
          }
          break;
        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting, reset } = form;

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

  $effect(() => {
    $formData.subjects = subjects;
  });

  $effect(() => {
    if (showUpdate) {
      ///
    }
  });

  const cleanUpStates = () => {
    sections = [
      {
        id: crypto.randomUUID(),
        value: ''
      }
    ];
    subjects = [
      {
        id: crypto.randomUUID(),
        name: '',
        schedules: [
          {
            id: crypto.randomUUID(),
            day: '',
            startTime: '',
            endTime: ''
          }
        ]
      }
    ];
  };
</script>

<AlertDialog.Root bind:open={showUpdate}>
  <AlertDialog.Content class="max-h-[90dvh] max-w-[1200px] p-0">
    <button
      onclick={() => {
        form.reset();
        showUpdate = false;
        cleanUpStates();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header class="px-6 pt-6">
      <AlertDialog.Title>Update Student Account</AlertDialog.Title>
    </AlertDialog.Header>
    <ScrollArea class="max-h-[80dvh]">
      <form method="POST" action="?/updateStudentEvent" use:enhance class="px-6">
        <input type="hidden" name="userId" value="id here" />
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <section class="">
            <div class="sticky top-0">
              <Form.Field {form} name="studentId">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Student ID</Form.Label>
                    <Input
                      {...props}
                      bind:value={$formData.studentId}
                      placeholder="Enter Student ID"
                    />
                  {/snippet}
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="email">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Email</Form.Label>
                    <Input {...props} bind:value={$formData.email} placeholder="Enter Email" />
                  {/snippet}
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="firstName">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>First Name</Form.Label>
                    <Input
                      {...props}
                      bind:value={$formData.firstName}
                      placeholder="Enter First Name"
                    />
                  {/snippet}
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="middleName">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Middle Name</Form.Label>
                    <Input
                      {...props}
                      bind:value={$formData.middleName}
                      placeholder="Enter Middle Name"
                    />
                  {/snippet}
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="lastName">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Last Name</Form.Label>
                    <Input
                      {...props}
                      bind:value={$formData.lastName}
                      placeholder="Enter Last Name"
                    />
                  {/snippet}
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="password">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Password</Form.Label>
                    <Input
                      type="password"
                      {...props}
                      bind:value={$formData.password}
                      placeholder="Enter Password"
                    />
                  {/snippet}
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>
            </div>
          </section>

          <section>
            <div class="sticky top-0">
              <Form.Field {form} name="gender">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Gender</Form.Label>
                    <SelectPicker
                      selections={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' }
                      ]}
                      bind:selected={$formData.gender}
                      name="Select Gender"
                    />
                    <input type="hidden" name={props.name} bind:value={$formData.gender} />
                  {/snippet}
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="yearLevel">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Year Level</Form.Label>
                    <SelectPicker
                      selections={[
                        { value: 'First Year', label: 'First Year' },
                        { value: 'Second Year', label: 'Second Year' },
                        { value: 'Third Year', label: 'Third Year' },
                        { value: 'Fourth Year', label: 'Fourth Year' }
                      ]}
                      bind:selected={$formData.yearLevel}
                      name="Select Year Level"
                    />
                    <input type="hidden" name={props.name} bind:value={$formData.yearLevel} />
                  {/snippet}
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="course">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Course</Form.Label>
                    <SelectPicker
                      selections={[
                        { value: 'BSIS', label: 'BSIS' },
                        { value: 'BSCS', label: 'BSCS' },
                        { value: 'BSIT', label: 'BSIT' }
                      ]}
                      bind:selected={$formData.course}
                      name="Select Course"
                    />
                    <input type="hidden" name={props.name} bind:value={$formData.course} />
                  {/snippet}
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>

              <div class="mt-[16px] flex flex-col gap-[16px]">
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
                <div class="">
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
                  {#if sections.length > 3}
                    <Button
                      size="sm"
                      variant="outline"
                      onclick={() => {
                        sections = sections.slice(0, 1);
                      }}
                    >
                      Clear
                    </Button>
                  {/if}
                </div>
              </div>
            </div>
          </section>

          <section class="flex flex-col gap-2.5">
            <div class="flex flex-col gap-2.5">
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

                    <ScrollArea class="h-[30dvh]">
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
          </section>

          <input type="hidden" name="subjects" bind:value={subjects} />
          <input type="hidden" name="sections" bind:value={sections} />
        </div>
        <div class="absolute bottom-6 right-6">
          <Form.Button>
            {#if $submitting}
              <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary">
                <LoaderCircle class="animate-spin" />
              </div>
            {/if}
            Update Account
          </Form.Button>
        </div>
      </form>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
