<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { X, Send } from 'lucide-svelte';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';
  import { reportIssueSchema, type ReportIssueSchema } from './schema';
  import { Textarea } from '$lib/components/ui/textarea';
  import type { User } from '@supabase/supabase-js';
  import type { Result } from '$lib/types/types';

  interface Props {
    open: boolean;
    reportIssueForm: SuperValidated<Infer<ReportIssueSchema>>;
    user: User;
  }

  let { reportIssueForm, user, open = $bindable() }: Props = $props();

  const form = superForm(reportIssueForm, {
    validators: zodClient(reportIssueSchema),
    id: crypto.randomUUID(),
    async onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          form.reset();
          open = false;
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Button variant="destructive" onclick={() => (open = true)} class="gap-1.5">
  Report Schedule
  <Send class="h-[15px] w-[15px]" />
</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <button
      type="button"
      onclick={() => {
        form.reset();
        open = false;
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>Have Schedule Issue?</AlertDialog.Title>
      <AlertDialog.Description
        >This will be read by admins and revolve your issue accordingly.</AlertDialog.Description
      >
    </AlertDialog.Header>

    <form method="POST" action="?/reportIssueEvent" use:enhance>
      <Form.Field {form} name="userObj" class="hidden">
        <Form.Control>
          {#snippet children({ props })}
            <Input {...props} value={JSON.stringify(user)} />
          {/snippet}
        </Form.Control>
      </Form.Field>

      <Form.Field {form} name="msg">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Describe The Issue</Form.Label>
            <Textarea {...props} bind:value={$formData.msg} placeholder="Describe the issue" />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <div class="flex justify-end">
        <Form.Button disabled={$submitting} class="relative">
          {#if $submitting}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
            >
              <Loader class="h-[20px] w-[20px] animate-spin" />
            </div>
          {/if}
          Submit
        </Form.Button>
      </div>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
