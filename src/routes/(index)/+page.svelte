<script lang="ts">
  import Login from './components/Login.svelte';
  import { page } from '$app/stores';
  import ForgotPwd from './components/ForgotPwd.svelte';

  const { data } = $props();
</script>

<main class="relative grid min-h-screen grid-cols-[3fr_2fr]">
  <enhanced:img
    src="/static/assets/system-bg.png"
    alt="system background"
    class="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover"
  />

  <section class="relative flex items-center justify-center">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="relative z-10 rounded-lg bg-white/60 p-5">
      <div class="flex flex-col items-center justify-center gap-2.5">
        <enhanced:img src="/static/assets/logo.png" alt="logo" class=" w-[200px]" />
        <span class="text-center text-2xl font-bold">ITE Department Scheduling System</span>

        <div class="w-[300px]">
          {#if $page.url.searchParams.get('switch') === 'forgot-password'}
            <ForgotPwd forgotPwdForm={data.forgotPwdForm} />
          {:else}
            <Login loginForm={data.loginForm} />
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>
