<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import { cn } from '$lib/utils';
  import type { ClassNameValue } from 'tailwind-merge';
  import type { HTMLInputTypeAttribute } from 'svelte/elements';
  import { Search, ArrowDownUp } from 'lucide-svelte';
  import Button from '../ui/button/button.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import SelectPicker from './SelectPicker.svelte';

  interface Props {
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    class?: ClassNameValue;
    selections?: { label: string; value: string }[];
  }

  const { placeholder = 'Search something ...', type = 'text', ...restProps }: Props = $props();

  let searchValue = $state('');
  let filter = $state('');

  const handleSearch = async () => {
    const currentParams = new URLSearchParams($page.url.search);
    currentParams.set('search', searchValue);
    if (filter) {
      currentParams.set('filter', filter);
    }
    await goto(`?${currentParams.toString()}`);
    searchValue = '';
  };

  $effect(() => {
    filter = $page.url.searchParams.get('filter') || '';
  });
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
    <Button onclick={handleSearch} size="sm" class="absolute right-0 top-1/2 -translate-y-1/2"
      >Search</Button
    >
  </div>

  <SelectPicker
    selections={restProps?.selections ?? []}
    bind:selected={filter}
    name="Select Sort"
    onValueChange={(v) => {
      const currentParams = new URLSearchParams($page.url.search);
      currentParams.set('filter', v);
      goto(`?${currentParams.toString()}`);
    }}
  />
</div>
