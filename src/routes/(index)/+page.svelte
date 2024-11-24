<script lang="ts">
  import Login from './components/Login.svelte';
  import { page } from '$app/stores';
  import ForgotPwd from './components/ForgotPwd.svelte';

  const { data } = $props();
</script>

<main class="grid h-screen grid-cols-[3fr_2fr]">
  <enhanced:img
    src="/static/assets/system-bg.png"
    alt="system background"
    class="h-full w-full object-cover"
  />

  <section>
    <div class="flex flex-col items-center justify-center gap-10 rounded-lg bg-white/20 p-5">
      <section class="s flex flex-col items-center justify-center gap-2.5">
        <enhanced:img src="/static/assets/logo.png" alt="logo" class=" w-[200px]" />
        <span class="text-center text-2xl font-bold text-primary">
          ITE Department Scheduling System
        </span>

        <div class="mt-[10dvh]">
          {#if $page.url.searchParams.get('switch') === 'forgot-password'}
            <ForgotPwd forgotPwdForm={data.forgotPwdForm} />
          {:else}
            <Login loginForm={data.loginForm} />
          {/if}
        </div>
      </section>
    </div>
  </section>
</main>
