<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { addReminderSchema, type AddReminderSchema } from './schema';
  import { X, Plus, LoaderCircle } from 'lucide-svelte';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import Combobox from '$lib/components/general/Combobox.svelte';
  import { timeSlots } from '$lib';
  import type { Result } from '$lib/types/types';
  import { toast } from 'svelte-sonner';

  interface Props {
    addReminderForm: SuperValidated<Infer<AddReminderSchema>>;
  }

  const { addReminderForm }: Props = $props();

  let open = $state(false);

  const form = superForm(addReminderForm, {
    validators: zodClient(addReminderSchema),
    id: crypto.randomUUID(),
    onUpdate: ({ result }) => {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success(data.msg);
          break;
        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Button variant="secondary" size="sm" onclick={() => (open = true)}
  ><Plus class="size-4" /> Add Reminder</Button
>

<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <button
      onclick={() => (open = false)}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>Add Reminder</AlertDialog.Title>
    </AlertDialog.Header>
    <form method="POST" use:enhance>
      <Form.Field {form} name="title">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Title</Form.Label>
            <Input {...props} bind:value={$formData.title} placeholder="Enter title" />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="time">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Time</Form.Label>
            <Combobox
              selections={timeSlots}
              bind:selected={$formData.time}
              placeholder="Select Time"
              name="Select Time"
            />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <AlertDialog.Footer>
        <Form.Button>
          {#if $submitting}
            <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary">
              <LoaderCircle class="animate-spin" />
            </div>
          {/if}
          Create
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
