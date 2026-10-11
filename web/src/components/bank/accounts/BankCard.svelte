<script lang="ts">
  import { Landmark, Nfc } from '@lucide/svelte'
  import type { Card } from '@/lib/bank.svelte'
  import { formatCardNumber, formatExpiry } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'

  let { card, compact = false }: { card: Card; compact?: boolean } = $props()
</script>

<div class="card sk-mono" class:is-blocked={card.state === 'blocked'} class:is-compact={compact}>
  <div class="card__sheen"></div>

  <div class="relative flex items-start justify-between">
    <span class="flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.18em]">
      <Landmark class="h-3.5 w-3.5" />
      SIKU
    </span>
    <Nfc class="h-4 w-4 opacity-70" />
  </div>

  <div class="relative flex flex-col gap-3">
    <span class="text-[15px] tracking-[0.2em]">{formatCardNumber(card.last4)}</span>
    <div class="flex items-end justify-between">
      <span class="text-[11px] tracking-[0.1em]">{card.holder}</span>
      <div class="flex flex-col items-end leading-none">
        <span class="font-sans text-[8.5px] uppercase tracking-[0.16em] opacity-60">
          {m.cards_expires()}
        </span>
        <span class="text-[11px] tracking-[0.1em]">{formatExpiry(card.expiresAt)}</span>
      </div>
    </div>
  </div>

  {#if card.state === 'blocked'}
    <span class="card__state font-sans">{m.cards_state_blocked()}</span>
  {/if}
</div>

<style>
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    aspect-ratio: 1.586;
    width: 100%;
    overflow: hidden;
    padding: 20px 22px;
    border-radius: 16px;
    border: 1px solid var(--sk-glass-border);
    background:
      radial-gradient(120% 90% at 100% 0%, var(--sk-accent-haze) 0%, transparent 55%),
      linear-gradient(150deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%),
      var(--sk-panel);
    color: var(--sk-text);
    box-shadow:
      inset 0 1px 0 var(--sk-glass-highlight),
      0 24px 40px -28px rgba(0, 0, 0, 0.8);
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .card.is-compact {
    padding: 16px 18px;
    border-radius: 13px;
  }

  .card__sheen {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      transparent 30%,
      rgba(255, 255, 255, 0.06) 45%,
      transparent 60%
    );
    pointer-events: none;
  }

  .card.is-blocked {
    color: var(--sk-text-muted);
    filter: saturate(0.4);
  }

  .card__state {
    position: absolute;
    right: 18px;
    bottom: 18px;
    padding: 4px 9px;
    border-radius: var(--sk-radius-badge);
    border: 1px solid var(--sk-border);
    background: var(--sk-surface);
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
</style>
