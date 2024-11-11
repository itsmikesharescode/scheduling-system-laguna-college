<script lang="ts">
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { forgotPwdSchema, type ForgotPwdSchema } from './schema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { Result } from '$lib/types/types';
  import { toast } from 'svelte-sonner';
  import { LoaderCircle } from 'lucide-svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  interface Props {
    forgotPwdForm: SuperValidated<Infer<ForgotPwdSchema>>;
  }

  const { forgotPwdForm }: Props = $props();

  const form = superForm(forgotPwdForm, {
    validators: zodClient(forgotPwdSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
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

<form method="POST" action="?/loginEvent" use:enhance class="flex flex-col gap-2.5">
  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input {...props} bind:value={$formData.email} placeholder="Enter your email" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={$submitting} class="relative w-full">
    {#if $submitting}
      <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-primary">
        <LoaderCircle class="animate-spin" />
      </div>
    {/if}
    Send Reset Link
  </Form.Button>
  <Button href="/" variant="ghost">Log in here</Button>
</form>
