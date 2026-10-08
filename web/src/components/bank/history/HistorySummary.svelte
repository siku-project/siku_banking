<script lang="ts">
  import { ArrowDownLeft, ArrowUpRight, Hash, Scale } from '@lucide/svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import StatTile from '@/components/bank/shared/StatTile.svelte'
  import { history } from '@/lib/history.svelte'
  import { m } from '@/lib/i18n.svelte'
</script>

<div class="grid grid-cols-4 gap-3">
  <StatTile label={m.history_summary_count()}>
    {#snippet icon()}<Hash class="h-4 w-4" />{/snippet}
    <span class="sk-mono text-[15px] font-semibold text-sk">{history.summary.count}</span>
  </StatTile>
  <StatTile label={m.history_summary_in()}>
    {#snippet icon()}<ArrowDownLeft class="h-4 w-4" />{/snippet}
    <Amount value={history.summary.credits} class="text-sk-accent" />
  </StatTile>
  <StatTile label={m.history_summary_out()}>
    {#snippet icon()}<ArrowUpRight class="h-4 w-4" />{/snippet}
    <Amount value={-history.summary.debits} signed class="text-sk-body" />
  </StatTile>
  <StatTile label={m.history_summary_net()}>
    {#snippet icon()}<Scale class="h-4 w-4" />{/snippet}
    <Amount value={history.summary.net} signed />
  </StatTile>
</div>
