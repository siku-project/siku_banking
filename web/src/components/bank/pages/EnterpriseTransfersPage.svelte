<script lang="ts">
  import { ArrowDownLeft, ArrowUpRight, Landmark } from '@lucide/svelte'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import KpiTile from '@/components/bank/enterprise/KpiTile.svelte'
  import EnterprisePageHeader from '@/components/bank/enterprise/shared/EnterprisePageHeader.svelte'
  import CompanyTransferConfirm from '@/components/bank/enterprise/transfers/CompanyTransferConfirm.svelte'
  import CompanyTransferFeed from '@/components/bank/enterprise/transfers/CompanyTransferFeed.svelte'
  import CompanyTransferForm from '@/components/bank/enterprise/transfers/CompanyTransferForm.svelte'
  import SupplierList from '@/components/bank/enterprise/transfers/SupplierList.svelte'
  import EmptyState from '@/components/bank/shared/EmptyState.svelte'
  import { companyTransfer } from '@/lib/company-transfer.svelte'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { pageReveal } from '@/lib/reveal'

  const DAY_MS = 86_400_000
  const PERIOD_DAYS = 30
  const FEED_COUNT = 8

  const reveal = pageReveal()

  const transfers = $derived(
    enterprise.operations.filter((operation) => operation.category === 'transfer'),
  )

  const flows = $derived.by(() => {
    const since = Date.now() - PERIOD_DAYS * DAY_MS
    let sent = 0
    let received = 0

    for (const operation of transfers) {
      if (operation.at < since) {
        continue
      }

      if (operation.amount >= 0) {
        received += operation.amount
      } else {
        sent -= operation.amount
      }
    }

    return { sent, received }
  })

  const main = $derived(enterprise.company?.accounts.find((account) => account.main) ?? null)

  onMount(() => companyTransfer.prepare())
</script>

{#if enterprise.company}
  <div class="flex flex-col gap-6">
    <div in:fly={reveal(0)}>
      <EnterprisePageHeader title={m.enterprise_transfers_title()} />
    </div>

    <section class="grid grid-cols-3 gap-4" in:fly={reveal(1)}>
      <KpiTile
        label={m.enterprise_transfer_kpi_available()}
        value={main?.balance ?? 0}
        icon={Landmark}
        hint={main?.label ?? ''}
        accent
      />
      <KpiTile
        label={m.enterprise_transfer_kpi_sent()}
        value={-flows.sent}
        signed
        icon={ArrowUpRight}
        hint={m.enterprise_kpi_period()}
      />
      <KpiTile
        label={m.enterprise_transfer_kpi_received()}
        value={flows.received}
        icon={ArrowDownLeft}
        hint={m.enterprise_kpi_period()}
      />
    </section>

    <div class="grid grid-cols-[minmax(0,1fr)_340px] gap-6">
      <div in:fly={reveal(2)}>
        <CompanyTransferForm />
      </div>
      <div class="flex flex-col gap-6" in:fly={reveal(3)}>
        <SupplierList />
        <CompanyTransferFeed operations={transfers.slice(0, FEED_COUNT)} />
      </div>
    </div>
  </div>

  <CompanyTransferConfirm />
{:else}
  <div class="sk-glass" in:fly={reveal(0)}>
    <EmptyState title={m.enterprise_empty_title()} hint={m.enterprise_empty_hint()} />
  </div>
{/if}
