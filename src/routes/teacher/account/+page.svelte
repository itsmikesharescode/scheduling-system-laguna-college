<script lang="ts">
  import { fly } from 'svelte/transition';
  import UpdateEmail from './_components/UpdateEmail.svelte';
  import UpdateInfo from './_components/UpdateInfo.svelte';
  import UpdatePassword from './_components/UpdatePassword.svelte';

  const { data } = $props();
</script>

<main class="container flex flex-col gap-5 px-[2rem] py-10">
  <h1 class="mt-5 text-center text-5xl font-bold" in:fly={{ x: -100 }}>Account</h1>
  <div class="mx-auto max-w-[500px]">
    <UpdateEmail updateEmailForm={data.updateEmailForm} />
    <UpdateInfo updateInfoForm={data.updateInfoForm} />
    <UpdatePassword updatePwdForm={data.updatePwdForm} />
  </div>
</main>
