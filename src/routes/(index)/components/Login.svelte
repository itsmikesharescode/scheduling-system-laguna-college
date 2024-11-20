<script lang="ts">
  import * as Form from '$lib/components/ui/form/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { loginSchema, type LoginSchema } from './schema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { Result } from '$lib/types/types';
  import { toast } from 'svelte-sonner';
  import { LoaderCircle } from 'lucide-svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Eye from 'lucide-svelte/icons/eye';
  import EyeClosed from 'lucide-svelte/icons/eye-closed';

  interface Props {
    loginForm: SuperValidated<Infer<LoginSchema>>;
  }

  const { loginForm }: Props = $props();

  const form = superForm(loginForm, {
    validators: zodClient(loginSchema),
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

  let showPassword = $state(false);
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

  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Password</Form.Label>
        <section class="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            {...props}
            bind:value={$formData.password}
            placeholder="Enter your password"
            class="pr-7"
          />
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2"
            onclick={() => (showPassword = !showPassword)}
          >
            {#if showPassword}
              <Eye class="size-4" />
            {:else}
              <EyeClosed class="size-4" />
            {/if}
          </button>
        </section>
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
    Log in
  </Form.Button>
  <Button href="?switch=forgot-password" variant="ghost">Forgot Password?</Button>
</form>
