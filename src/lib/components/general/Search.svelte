<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import { cn } from '$lib/utils';
  import type { ClassNameValue } from 'tailwind-merge';
  import type { HTMLInputTypeAttribute } from 'svelte/elements';
  import { Search, ArrowDownUp } from 'lucide-svelte';
  import Button from '../ui/button/button.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import * as Select from '$lib/components/ui/select/index.js';

  interface Props {
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    class?: ClassNameValue;
    selections?: { label: string; value: string }[];
  }

  const { placeholder = 'Search something ...', type = 'text', ...restProps }: Props = $props();

  let searchValue = $state('');

  const handleSearch = async () => {
    const currentParams = new URLSearchParams($page.url.search);
    currentParams.set('search', searchValue);
    await goto(`?${currentParams.toString()}`);
    searchValue = '';
  };
</script>

<div class="flex items-center gap-2.5">
  <div class="relative">
    <Input
      {type}
      {placeholder}
      class={cn('w-full pl-8', restProps.class)}
      bind:value={searchValue}
    />
    <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2" />
    <Button onclick={handleSearch} size="sm" class="absolute right-0 top-1/2 -translate-y-1/2"
      >Search</Button
    >
  </div>
</div>
