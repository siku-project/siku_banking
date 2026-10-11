<script lang="ts">
  import { ArrowLeft, ArrowRight, Landmark, LoaderCircle } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import { fly } from 'svelte/transition'
  import AccountStep from '@/components/bank/onboarding/steps/AccountStep.svelte'
  import DoneStep from '@/components/bank/onboarding/steps/DoneStep.svelte'
  import IdentityStep from '@/components/bank/onboarding/steps/IdentityStep.svelte'
  import ReviewStep from '@/components/bank/onboarding/steps/ReviewStep.svelte'
  import WelcomeStep from '@/components/bank/onboarding/steps/WelcomeStep.svelte'
  import ThemeToggle from '@/components/bank/shared/ThemeToggle.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { m } from '@/lib/i18n.svelte'
  import { duration } from '@/lib/motion'
  import { onboarding, ONBOARDING_STEPS, type OnboardingStep } from '@/lib/onboarding.svelte'

  const STEP_MS = 320

  const titles: Record<OnboardingStep, () => string> = {
    welcome: () => m.onboarding_step_welcome(),
    identity: () => m.onboarding_step_identity(),
    account: () => m.onboarding_step_account(),
    review: () => m.onboarding_step_review(),
    done: () => m.onboarding_step_done(),
  }

  const listed = ONBOARDING_STEPS.filter((step) => step !== 'done')

  const submit = async (): Promise<void> => {
    const ok = await onboarding.submit()

    if (!ok) {
      toast.error(reasonMessage(onboarding.error ?? undefined))
    }
  }

  const advance = (): void => {
    if (onboarding.step === 'review') {
      void submit()
    } else {
      onboarding.next()
    }
  }
</script>

<div class="flex h-full w-full">
  <aside class="rail flex w-[300px] shrink-0 flex-col justify-between px-8 py-8">
    <div class="flex flex-col gap-10">
      <div class="flex items-center gap-3">
        <span class="sk-tile h-9 w-9 border border-sk-accent bg-sk-tint text-sk-accent">
          <Landmark class="h-4 w-4" />
        </span>
        <div class="flex flex-col gap-0.5 leading-none">
          <span class="sk-brand">{m.common_bank_name()}</span>
          <span class="sk-label text-[10px]">{m.onboarding_rail_label()}</span>
        </div>
      </div>

      <ol class="flex flex-col gap-1">
        {#each listed as step, position (step)}
          {@const state =
            onboarding.step === 'done' || position < onboarding.index
              ? 'done'
              : step === onboarding.step
                ? 'current'
                : 'todo'}
          <li class="rail__step" data-state={state}>
            <span class="rail__dot sk-mono">{position + 1}</span>
            <span class="text-[13px]">{titles[step]()}</span>
          </li>
        {/each}
      </ol>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-[11px] text-sk-faint">{m.onboarding_rail_hint()}</span>
      <ThemeToggle />
    </div>
  </aside>

  <section class="relative flex min-w-0 flex-1 flex-col">
    <div class="sk-scroll flex-1 overflow-y-auto px-14 pt-14">
      {#key onboarding.step}
        <div
          class="mx-auto flex w-full max-w-[560px] flex-col gap-8 pb-10"
          in:fly={{ y: 12, duration: duration(STEP_MS), delay: duration(60) }}
        >
          {#if onboarding.step === 'welcome'}
            <WelcomeStep />
          {:else if onboarding.step === 'identity'}
            <IdentityStep />
          {:else if onboarding.step === 'account'}
            <AccountStep />
          {:else if onboarding.step === 'review'}
            <ReviewStep />
          {:else}
            <DoneStep />
          {/if}
        </div>
      {/key}
    </div>

    {#if onboarding.step !== 'done'}
      <footer class="flex items-center justify-between border-t border-sk-soft px-14 py-5">
        <button
          type="button"
          class="sk-btn sk-btn--ghost"
          class:invisible={onboarding.index === 0}
          disabled={onboarding.submitting}
          onclick={() => onboarding.back()}
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          {m.common_back()}
        </button>

        <button
          type="button"
          class="sk-btn sk-btn--primary"
          disabled={!onboarding.canContinue || onboarding.submitting}
          onclick={advance}
        >
          {#if onboarding.submitting}
            <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
            {m.onboarding_signing()}
          {:else if onboarding.step === 'review'}
            {m.onboarding_sign()}
          {:else if onboarding.step === 'welcome'}
            {m.onboarding_start()}
            <ArrowRight class="h-3.5 w-3.5" />
          {:else}
            {m.common_continue()}
            <ArrowRight class="h-3.5 w-3.5" />
          {/if}
        </button>
      </footer>
    {/if}
  </section>
</div>

<style>
  .rail {
    border-right: 1px solid var(--sk-border-soft);
    background: linear-gradient(to bottom, var(--sk-quiet), transparent 60%);
  }

  .rail__step {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 10px;
    border-radius: var(--sk-radius-control);
    color: var(--sk-text-soft);
    transition: color 0.2s ease;
  }

  .rail__step[data-state='current'] {
    color: var(--sk-text);
    background: var(--sk-quiet);
  }

  .rail__step[data-state='done'] {
    color: var(--sk-text-muted);
  }

  .rail__dot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 9999px;
    border: 1px solid var(--sk-border);
    font-size: 11px;
    font-weight: 600;
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease;
  }

  .rail__step[data-state='current'] .rail__dot {
    border-color: var(--sk-accent-strong);
    background: var(--sk-accent-tint);
    color: var(--sk-accent-text);
    box-shadow: 0 0 0 3px var(--sk-accent-ring);
  }

  .rail__step[data-state='done'] .rail__dot {
    border-color: var(--sk-accent-border);
    background: var(--sk-accent);
    color: var(--sk-accent-ink);
  }
</style>
