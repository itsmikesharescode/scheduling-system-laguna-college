<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js';
  import { cn } from '$lib/utils';
  import type { ClassNameValue } from 'tailwind-merge';

  interface Props {
    selections: {
      label: string;
      value: string;
    }[];
    selected: string;
    class?: ClassNameValue;
    name: string;
    onValueChange?: (value: string) => void;
  }

  let { selected = $bindable(), ...props }: Props = $props();

  let displayValue = $state('');
</script>

<Select.Root type="single" bind:value={selected} onValueChange={props.onValueChange}>
  <Select.Trigger class={cn('', props.class)}>
    {selected ? selected : props.name}
  </Select.Trigger>
  <Select.Content>
    {#each props.selections as selection}
      <Select.Item value={selection.value}>
        {selection.label}
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
