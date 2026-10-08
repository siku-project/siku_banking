<script lang="ts">
  import Amount from '@/components/bank/shared/Amount.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import type { CategoryShare } from '@/lib/enterprise.svelte'
  import { formatPercent } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { CATEGORY_ICONS, categoryLabel } from '@/lib/labels'
  import { locale } from '@/lib/locale.svelte'

  let { shares }: { shares: CategoryShare[] } = $props()
</script>

<GlassCard padding="md" class="flex flex-col gap-4">
  <div class="flex flex-col gap-1">
    <span class="sk-title text-[15px]">{m.enterprise_spending()}</span>
    <span class="text-[12px] text-sk-soft">{m.enterprise_spending_hint()}</span>
  </div>

  {#if shares.length === 0}
    <span class="text-[12.5px] text-sk-faint">{m.enterprise_spending_empty()}</span>
  {:else}
    <div class="flex flex-col gap-3.5">
      {#each shares as entry (entry.category)}
        {@const Icon = CATEGORY_ICONS[entry.category]}
        <div class="flex flex-col gap-1.5">
          <div class="flex items-center gap-2.5">
            <Icon class="h-3.5 w-3.5 text-sk-soft" />
            <span class="flex-1 text-[12.5px] text-sk-body">{categoryLabel(entry.category)}</span>
            <span class="sk-mono text-[11px] text-sk-faint">
              {formatPercent(entry.share, locale.current)}
            </span>
            <Amount value={entry.amount} size="sm" class="w-[92px] text-right" />
          </div>
          <span class="bar">
            <span class="bar__fill" style:width="{entry.share * 100}%"></span>
          </span>
        </div>
      {/each}
    </div>
  {/if}
</GlassCard>

<style>
  .bar {
    display: block;
    height: 4px;
    overflow: hidden;
    border-radius: 9999px;
    background: var(--sk-rule);
  }

  .bar__fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--sk-accent-strong);
    transition: width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
</style>
