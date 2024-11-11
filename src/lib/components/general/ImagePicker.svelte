<script lang="ts">
  import { ImageUp } from 'lucide-svelte';

  interface Props {
    imageLink: File | null;
    hasLink?: string;
  }

  let { imageLink = $bindable(), hasLink }: Props = $props();

  let image = $state<File | null>(null);
  let url = $state<string | null>(null);
</script>

{#if imageLink || hasLink}
  <div class="">
    <button
      onclick={(e) => {
        imageLink = null;
        image = null;
        hasLink = undefined;
      }}
      type="button"
      class="group relative"
    >
      <div
        class="bottom-0 left-0 right-0 top-0 hidden items-center justify-center rounded-lg bg-black/50 group-hover:absolute group-hover:flex"
      >
        <span class="text-sm font-bold text-white">Remove</span>
      </div>
      <img src={url || hasLink} alt="uploadedimage" class="h-[128px] w-[161.13px] rounded-lg" />
    </button>
  </div>
{:else}
  <label class="p-10t flex max-w-fit flex-col items-center gap-2 rounded-lg bg-secondary p-10">
    <ImageUp />
    <input
      class="hidden"
      type="file"
      accept="image/png, image/jpeg"
      oninput={(e) => {
        image = e.currentTarget.files?.item(0) as File;
        imageLink = e.currentTarget.files?.item(0) as File;
        url = URL.createObjectURL(image);
      }}
    />
    <span class="text-xs font-bold text-muted-foreground">Upload Photo</span>
  </label>
{/if}
