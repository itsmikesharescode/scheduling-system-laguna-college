<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { Input } from '$lib/components/ui/input/index.js';
  import { cn } from '$lib/utils';
  import { Search } from 'lucide-svelte';
  import type { HTMLInputTypeAttribute } from 'svelte/elements';
  import type { ClassNameValue } from 'tailwind-merge';

  interface Props {
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    class?: ClassNameValue;
  }

  const { placeholder = 'Search student', type = 'text', ...restProps }: Props = $props();

  let searchValue = $state('');
</script>

<div class="flex items-center gap-2.5">
  <div class="relative">
    <Input
      {...restProps}
      {type}
      {placeholder}
      class={cn('w-full pl-8', restProps.class)}
      bind:value={searchValue}
    />
    <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2" />
    <Button size="sm" class="absolute right-0 top-1/2 -translate-y-1/2">Search</Button>
  </div>
</div>
