<script lang="ts">
  import { onMount } from 'svelte'
  import { Asterisk } from '@lucide/svelte'
  import { m } from '@/lib/i18n.svelte'
  import { INTRO_TIMINGS } from '@/lib/session.svelte'

  const slots = Array.from({ length: INTRO_TIMINGS.digits }, (_, index) => index)

  let filled = $state(0)

  const verifying = $derived(filled >= slots.length)

  onMount(() => {
    const timer = setInterval(() => {
      filled += 1

      if (filled >= slots.length) {
        clearInterval(timer)
      }
    }, INTRO_TIMINGS.digit)

    return () => clearInterval(timer)
  })
</script>

<div class="flex flex-col items-center gap-7">
  <span class="sk-label">{m.intro_code_label()}</span>

  <div class="flex gap-3" class:is-verifying={verifying}>
    {#each slots as index (index)}
      <span class="slot sk-mono" class:is-filled={index < filled}>
        {#if index < filled}
          <Asterisk class="slot__mask" aria-hidden="true" strokeWidth={2.4} />
        {/if}
      </span>
    {/each}
  </div>

  <div class="flex h-6 flex-col items-center gap-2.5">
    {#if verifying}
      <span class="text-xs text-sk-muted">{m.intro_code_verifying()}</span>
      <span class="progress" style:--verify-ms="{INTRO_TIMINGS.verify}ms">
        <span class="progress__fill"></span>
      </span>
    {/if}
  </div>
</div>

<style>
  .slot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 58px;
    border-radius: var(--sk-radius-control);
    border: 1px solid var(--sk-border);
    background: var(--sk-glass);
    box-shadow: inset 0 1px 0 var(--sk-glass-highlight);
    font-size: 22px;
    font-weight: 600;
    color: var(--sk-text);
    transition:
      border-color 0.2s ease,
      box-shadow 0.3s ease;
  }

  .slot.is-filled {
    border-color: var(--sk-accent-border);
    animation: pop 260ms cubic-bezier(0.2, 0.9, 0.3, 1.3);
  }

  .is-verifying .slot {
    border-color: var(--sk-accent-strong);
    box-shadow:
      inset 0 1px 0 var(--sk-glass-highlight),
      0 0 0 3px var(--sk-accent-ring),
      0 0 22px -6px var(--sk-accent-glow);
  }

  .slot :global(.slot__mask) {
    width: 22px;
    height: 22px;
    color: var(--sk-text);
    animation: rise 220ms ease-out;
  }

  .progress {
    display: block;
    width: 160px;
    height: 2px;
    overflow: hidden;
    border-radius: 9999px;
    background: var(--sk-rule);
  }

  .progress__fill {
    display: block;
    height: 100%;
    width: 0;
    border-radius: inherit;
    background: var(--sk-accent);
    box-shadow: 0 0 10px var(--sk-accent-glow);
    animation: fill var(--verify-ms) cubic-bezier(0.65, 0, 0.35, 1) forwards;
  }

  @keyframes pop {
    0% {
      transform: scale(1);
    }
    45% {
      transform: scale(1.08);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes rise {
    0% {
      opacity: 0;
      transform: translateY(6px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fill {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
</style>
