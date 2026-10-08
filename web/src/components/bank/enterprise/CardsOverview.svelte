<script lang="ts">
  import { ArrowRight, CreditCard } from '@lucide/svelte'
  import { push } from 'svelte-spa-router'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { formatPercent } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'
  import { PATHS } from '@/lib/paths'

  const ratio = $derived(
    enterprise.cards.limit > 0 ? Math.min(1, enterprise.cards.spent / enterprise.cards.limit) : 0,
  )
</script>

<GlassCard padding="md" class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <span class="sk-title text-[15px]">{m.enterprise_cards_title()}</span>
    <span class="sk-badge sk-badge--accent">
      <CreditCard class="h-3 w-3" />
      {m.enterprise_cards_active({ count: enterprise.cards.active })}
    </span>
  </div>

  <div class="flex flex-col gap-1">
    <Amount value={enterprise.cards.spent} size="lg" />
    <span class="text-[12px] text-sk-soft">
      {m.enterprise_cards_overview_hint({ blocked: enterprise.cards.blocked })}
    </span>
  </div>

  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between text-[11.5px]">
      <span class="text-sk-muted">{m.enterprise_cards_overview_caps()}</span>
      <span class="flex items-center gap-1.5">
        <span class="sk-mono text-sk-body">{formatPercent(ratio, locale.current)}</span>
        <span class="text-sk-faint">·</span>
        <Amount value={enterprise.cards.limit} size="sm" class="text-sk-soft" />
      </span>
    </div>
    <span class="bar">
      <span class="bar__fill" style:width="{ratio * 100}%"></span>
    </span>
  </div>

  <button
    type="button"
    class="flex items-center gap-1.5 self-start text-[12px] text-sk-muted transition-colors hover:text-sk"
    onclick={() => push(PATHS.enterpriseAccounts)}
  >
    {m.enterprise_cards_manage()}
    <ArrowRight class="h-3.5 w-3.5" />
  </button>
</GlassCard>

<style>
  .bar {
    display: block;
    height: 6px;
    overflow: hidden;
    border-radius: 9999px;
    background: var(--sk-rule);
  }

  .bar__fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--sk-accent-strong), var(--sk-accent));
    box-shadow: 0 0 12px var(--sk-accent-glow);
    transition: width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
</style>
