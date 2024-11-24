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
  import type { Result } from '$lib/types/types';
  import { page } from '$app/stores';
  import { findConflicts } from '$lib';

  interface Props {
    reportIssueForm: SuperValidated<Infer<ReportIssueSchema>>;
  }

  let { reportIssueForm }: Props = $props();

  let open = $state(false);

  const form = superForm(reportIssueForm, {
    validators: zodClient(reportIssueSchema),
    id: crypto.randomUUID(),
    async onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success(data.msg);
          form.reset();
          open = false;
          break;

        case 401:
          toast.error(data.msg);
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  const generateReport = () => {
    const conflicts = findConflicts($page.data.user?.user_metadata.subjects || []);
    const formattedConflicts = conflicts
      .map(
        (conflict) =>
          `Schedule Conflict:\n` +
          `• ${conflict.subject1}\n` +
          `• ${conflict.subject2}\n` +
          `Day: ${conflict.day}\n` +
          `Time: ${conflict.time}\n`
      )
      .join('\n');

    $formData.msg = formattedConflicts;
  };
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
      <input type="hidden" name="reporter_id" value={$page.data.user?.user_metadata.teacherId} />
      <Form.Field {form} name="user_id" class="hidden">
        <Form.Control>
          {#snippet children({ props })}
            <Input {...props} value={$page.data.user?.id} />
          {/snippet}
        </Form.Control>
      </Form.Field>

      <Form.Field {form} name="msg">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Describe The Issue</Form.Label>
            <Textarea
              {...props}
              bind:value={$formData.msg}
              placeholder="Describe the issue"
              rows={Math.min(($formData.msg?.match(/\n/g)?.length || 0) + 1 || 3, 25)}
              class="w-full"
            />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <div class="flex justify-end gap-2.5">
        <Button variant="outline" onclick={generateReport}>Generate Report</Button>
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
