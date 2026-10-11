<script lang="ts">
  import { ArrowDownLeft, ArrowUpRight, Hash, Scale } from '@lucide/svelte'
  import { fly } from 'svelte/transition'
  import CompanyHistoryFilters from '@/components/bank/enterprise/history/CompanyHistoryFilters.svelte'
  import CompanyHistoryGroups from '@/components/bank/enterprise/history/CompanyHistoryGroups.svelte'
  import EnterprisePageHeader from '@/components/bank/enterprise/shared/EnterprisePageHeader.svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import EmptyState from '@/components/bank/shared/EmptyState.svelte'
  import StatTile from '@/components/bank/shared/StatTile.svelte'
  import { companyHistory } from '@/lib/company-history.svelte'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { pageReveal } from '@/lib/reveal'

  const reveal = pageReveal()
</script>

{#if enterprise.company}
  {@const summary = companyHistory.summary}
  <div class="flex flex-col gap-6">
    <div in:fly={reveal(0)}>
      <EnterprisePageHeader title={m.enterprise_history_title()} />
    </div>

    <div in:fly={reveal(1)}>
      <CompanyHistoryFilters />
    </div>

    <section class="grid grid-cols-4 gap-3" in:fly={reveal(2)}>
      <StatTile label={m.history_summary_count()}>
        {#snippet icon()}<Hash class="h-4 w-4" />{/snippet}
        <span class="sk-mono text-[15px] font-semibold text-sk">{summary.count}</span>
      </StatTile>
      <StatTile label={m.history_summary_in()}>
        {#snippet icon()}<ArrowDownLeft class="h-4 w-4" />{/snippet}
        <Amount value={summary.credits} class="text-sk-accent" />
      </StatTile>
      <StatTile label={m.history_summary_out()}>
        {#snippet icon()}<ArrowUpRight class="h-4 w-4" />{/snippet}
        <Amount value={-summary.debits} signed class="text-sk-body" />
      </StatTile>
      <StatTile label={m.history_summary_net()}>
        {#snippet icon()}<Scale class="h-4 w-4" />{/snippet}
        <Amount value={summary.net} signed />
      </StatTile>
    </section>

    <div in:fly={reveal(3)}>
      <CompanyHistoryGroups />
    </div>
  </div>
{:else}
  <div class="sk-glass" in:fly={reveal(0)}>
    <EmptyState title={m.enterprise_empty_title()} hint={m.enterprise_empty_hint()} />
  </div>
{/if}
