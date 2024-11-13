<script lang="ts">
  import { Trash2 } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import Button from '$lib/components/ui/button/button.svelte';
  import RemoveStudent from './RemoveStudent/RemoveStudent.svelte';

  /* interface Props {
    updateTeacherForm: SuperValidated<Infer<UpdateTeacherSchema>>;
  }

  const { updateTeacherForm }: Props = $props(); */

  let showUpdate = $state(false);
  let showDelete = $state(false);
</script>

<Button variant="destructive" onclick={() => (showDelete = true)}>
  <Trash2 class="size-4" />
</Button>

<RemoveStudent bind:showDelete />
