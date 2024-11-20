<script lang="ts">
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { page } from '$app/stores';

  const { data } = $props();
</script>

<main class="flex flex-col gap-5 px-[2rem] py-10">
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/admin/reports">Reports</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page class=""
          >Updating for user_id
          <span class="text-muted-foreground">{$page.url.searchParams.get('user_id')}</span>
        </Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>

  {#await data.getUserInfo}
    <div class="absolute inset-0 flex items-center justify-center">
      <LoaderCircle class="animate-spin" />
    </div>
  {:then userInfo}
    {JSON.stringify(userInfo)}
  {/await}
</main>
