<script lang="ts">
  import Check from 'lucide-svelte/icons/check';
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import { tick } from 'svelte';
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils.js';

  interface Props {
    selected: string;
    selections: {
      value: string;
      label: string;
    }[];
    placeholder: string;
    name: string;
  }

  let { selected = $bindable(), selections, placeholder, name }: Props = $props();

  let open = $state(false);
  let value = $state('');
  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedValue = $derived(selections.find((f) => f.value === value)?.label);

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }

  $effect(() => {
    if (selectedValue) {
      selected = selectedValue;
    }
  });
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class="w-full justify-between"
        {...props}
        role="combobox"
        aria-expanded={open}
      >
        {selected || name}
        <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input {placeholder} />
      <Command.List>
        <Command.Empty>No found.</Command.Empty>
        <Command.Group>
          {#each selections as selection}
            <Command.Item
              value={selection.value}
              onSelect={() => {
                value = selection.value;
                closeAndFocusTrigger();
              }}
            >
              <Check class={cn('mr-2 size-4', value !== selection.value && 'text-transparent')} />
              {selection.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
