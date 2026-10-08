<script lang="ts">
  import { onMount } from 'svelte'
  import Router from 'svelte-spa-router'
  import { fade } from 'svelte/transition'
  import IntroSequence from '@/components/bank/intro/IntroSequence.svelte'
  import BankShell from '@/components/bank/layout/BankShell.svelte'
  import OnboardingFlow from '@/components/bank/onboarding/OnboardingFlow.svelte'
  import { duration } from '@/lib/motion'
  import { onboarding } from '@/lib/onboarding.svelte'
  import { routes } from '@/lib/routes'
  import { session } from '@/lib/session.svelte'
  import { workspace } from '@/lib/workspace.svelte'

  onMount(() => {
    onboarding.begin()

    if (session.introWanted) {
      session.start()
    } else {
      session.skipIntro()
    }

    return () => {
      session.reset()
      onboarding.reset()
      workspace.reset()
    }
  })
</script>

<div class="fixed inset-0 z-40 grid place-items-center">
  <div class="bank sk-panel relative overflow-hidden">
    {#if !session.ready}
      <div class="absolute inset-0" out:fade={{ duration: duration(220) }}>
        <IntroSequence />
      </div>
    {:else if onboarding.active}
      <div
        class="absolute inset-0"
        in:fade={{ duration: duration(360), delay: duration(120) }}
        out:fade={{ duration: duration(220) }}
      >
        <OnboardingFlow />
      </div>
    {:else}
      <div class="absolute inset-0" in:fade={{ duration: duration(360), delay: duration(120) }}>
        <BankShell>
          <Router {routes} />
        </BankShell>
      </div>
    {/if}
  </div>
</div>

<style>
  .bank {
    width: min(92vw, 1320px);
    height: min(88vh, 860px);
  }
</style>
