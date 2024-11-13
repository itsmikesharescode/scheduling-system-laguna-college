<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { X } from 'lucide-svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import SearchStudent from '../SearchStudent/SearchStudent.svelte';

  let open = $state(true);
</script>

<Button onclick={() => (open = true)}>Assign Student</Button>
<AlertDialog.Root bind:open>
  <AlertDialog.Content class="max-w-[1200px] p-0">
    <button
      onclick={() => {
        open = false;
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X class="size-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header class="px-6 pt-6">
      <AlertDialog.Title class="flex flex-col">
        Available Students
        <SearchStudent />
      </AlertDialog.Title>
    </AlertDialog.Header>

    <ScrollArea class="max-h-[70dvh]">
      <section class="grid gap-2 px-6 pb-6 md:grid-cols-2 lg:grid-cols-3">
        {#each Array(50) as _}
          <div class="flex items-center justify-between gap-2.5 rounded-lg border-2 p-2">
            <div class="flex items-center gap-2.5">
              <Avatar.Root>
                <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
                <Avatar.Fallback>CN</Avatar.Fallback>
              </Avatar.Root>
              <div class="flex flex-col">
                <span class="text-sm">John Doe Evangelista</span>
                <span class="text-xs text-muted-foreground">johnjohn@gmail.com</span>
              </div>
            </div>

            <Button size="sm">Assign</Button>
          </div>
        {/each}
      </section>
    </ScrollArea>
  </AlertDialog.Content>
</AlertDialog.Root>
