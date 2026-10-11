<script lang="ts">
  import { ArrowDownLeft, ArrowUpRight, Landmark, Scale } from '@lucide/svelte'
  import { fly } from 'svelte/transition'
  import CashflowChart from '@/components/bank/enterprise/CashflowChart.svelte'
  import CompanyAccounts from '@/components/bank/enterprise/CompanyAccounts.svelte'
  import CompanyHeader from '@/components/bank/enterprise/CompanyHeader.svelte'
  import KpiTile from '@/components/bank/enterprise/KpiTile.svelte'
  import OperationsList from '@/components/bank/enterprise/OperationsList.svelte'
  import CardsOverview from '@/components/bank/enterprise/CardsOverview.svelte'
  import SpendingBreakdown from '@/components/bank/enterprise/SpendingBreakdown.svelte'
  import EmptyState from '@/components/bank/shared/EmptyState.svelte'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { duration, stagger } from '@/lib/motion'
  import { SWITCH_TIMINGS, workspace } from '@/lib/workspace.svelte'

  const REVEAL_MS = 460
  const STEP_MS = 80

  /** Mounted under the veil, the page waits for it to lift before revealing itself. */
  const base = workspace.switching ? duration(SWITCH_TIMINGS.hold) : 0

  const reveal = (index: number) => ({
    y: 16,
    duration: duration(REVEAL_MS),
    delay: stagger(index, STEP_MS, base),
  })
</script>

{#if enterprise.company}
  {@const company = enterprise.company}
  {@const summary = enterprise.summary}
  <div class="flex flex-col gap-6">
    <section in:fly={reveal(0)}>
      <CompanyHeader {company} />
    </section>

    <section class="grid grid-cols-4 gap-4" in:fly={reveal(1)}>
      <KpiTile
        label={m.enterprise_kpi_treasury()}
        value={summary.treasury}
        icon={Landmark}
        hint={m.enterprise_kpi_treasury_hint({ count: company.accounts.length })}
        accent
      />
      <KpiTile
        label={m.enterprise_kpi_revenue()}
        value={summary.credits}
        icon={ArrowDownLeft}
        hint={m.enterprise_kpi_period()}
      />
      <KpiTile
        label={m.enterprise_kpi_expenses()}
        value={-summary.debits}
        signed
        icon={ArrowUpRight}
        hint={m.enterprise_kpi_period()}
      />
      <KpiTile
        label={m.enterprise_kpi_net()}
        value={summary.net}
        signed
        icon={Scale}
        trend={summary.trend}
        hint={m.enterprise_kpi_trend_hint()}
      />
    </section>

    <section class="grid grid-cols-[minmax(0,1fr)_340px] gap-6" in:fly={reveal(2)}>
      <CashflowChart points={enterprise.series} />
      <div class="flex flex-col gap-6">
        <CompanyAccounts accounts={company.accounts} />
        <CardsOverview />
      </div>
    </section>

    <section class="grid grid-cols-[minmax(0,1fr)_340px] gap-6" in:fly={reveal(3)}>
      <OperationsList operations={enterprise.recent} />
      <div class="flex flex-col gap-6">
        <SpendingBreakdown shares={enterprise.spending} />
      </div>
    </section>
  </div>
{:else}
  <div class="sk-glass" in:fly={reveal(0)}>
    <EmptyState title={m.enterprise_empty_title()} hint={m.enterprise_empty_hint()} />
  </div>
{/if}
