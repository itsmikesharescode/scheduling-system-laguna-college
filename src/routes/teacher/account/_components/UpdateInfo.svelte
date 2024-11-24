<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { updateInfoSchema, type UpdateInfoSchema } from './schema';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';
  import type { Result } from '$lib/types/types';

  interface Props {
    updateInfoForm: SuperValidated<Infer<UpdateInfoSchema>>;
  }

  const { updateInfoForm }: Props = $props();

  const form = superForm(updateInfoForm, {
    validators: zodClient(updateInfoSchema),
    id: crypto.randomUUID(),
    async onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<form method="POST" action="?/updateInfoEvent" use:enhance>
  <Form.Field {form} name="firstName">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>New First Name</Form.Label>
        <Input {...props} bind:value={$formData.firstName} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="middleName">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>New Middle Name</Form.Label>
        <Input {...props} bind:value={$formData.middleName} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="lastName">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>New Last Name</Form.Label>
        <Input {...props} bind:value={$formData.lastName} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={$submitting} class="relative">
    {#if $submitting}
      <div
        class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
      >
        <Loader class="h-[20px] w-[20px] animate-spin" />
      </div>
    {/if}
    Update Info
  </Form.Button>
</form>
