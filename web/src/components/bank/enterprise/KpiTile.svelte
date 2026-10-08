<script lang="ts">
  import { TrendingDown, TrendingUp, type LucideIcon } from '@lucide/svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import { formatPercent } from '@/lib/format'
  import { locale } from '@/lib/locale.svelte'

  let {
    label,
    value,
    icon: Icon,
    signed = false,
    trend = null,
    hint,
    accent = false,
  }: {
    label: string
    value: number
    icon: LucideIcon
    signed?: boolean
    /** A change as a share, shown with its direction; null hides it. */
    trend?: number | null
    hint: string
    /** Whether the tile leads the row, lit a little more. */
    accent?: boolean
  } = $props()

  const rising = $derived(trend !== null && trend >= 0)
</script>

<GlassCard padding="md" class="flex flex-col gap-4 {accent ? 'sk-glass--active' : ''}">
  <div class="flex items-center justify-between">
    <span class="sk-label">{label}</span>
    <span class="sk-tile h-8 w-8 bg-sk-tint text-sk-accent">
      <Icon class="h-4 w-4" />
    </span>
  </div>

  <Amount {value} {signed} size="lg" />

  <div class="flex items-center gap-2 text-[12px]">
    {#if trend !== null}
      <span class="trend" class:is-up={rising}>
        {#if rising}
          <TrendingUp class="h-3.5 w-3.5" />
        {:else}
          <TrendingDown class="h-3.5 w-3.5" />
        {/if}
        {formatPercent(trend, locale.current, true)}
      </span>
    {/if}
    <span class="text-sk-soft">{hint}</span>
  </div>
</GlassCard>

<style>
  .trend {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 7px;
    border-radius: var(--sk-radius-badge);
    border: 1px solid var(--sk-border-soft);
    color: var(--sk-text-muted);
    font-weight: 500;
  }

  .trend.is-up {
    border-color: var(--sk-accent-border);
    background: var(--sk-accent-tint);
    color: var(--sk-accent-text);
  }
</style>
