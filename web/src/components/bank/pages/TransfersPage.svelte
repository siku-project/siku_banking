<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import EmptyState from '@/components/bank/shared/EmptyState.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import TransactionList from '@/components/bank/transactions/TransactionList.svelte'
  import BeneficiaryList from '@/components/bank/transfers/BeneficiaryList.svelte'
  import TransferConfirm from '@/components/bank/transfers/TransferConfirm.svelte'
  import TransferForm from '@/components/bank/transfers/TransferForm.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { duration, stagger } from '@/lib/motion'
  import { transfer } from '@/lib/transfer.svelte'

  const REVEAL_MS = 420
  const STEP_MS = 90
  const RECENT_COUNT = 6

  const recent = $derived(
    bank.transactions
      .filter((transaction) => transaction.category === 'transfer')
      .slice(0, RECENT_COUNT),
  )

  const reveal = (index: number) => ({
    y: 14,
    duration: duration(REVEAL_MS),
    delay: stagger(index, STEP_MS),
  })

  onMount(() => transfer.prepare())
</script>

<div class="flex flex-col gap-6">
  <header class="flex items-end justify-between px-1" in:fly={reveal(0)}>
    <div class="flex flex-col gap-1">
      <span class="sk-label">{m.nav_transfers()}</span>
      <h1 class="text-[26px] font-semibold tracking-[-0.02em] text-sk">{m.transfers_title()}</h1>
    </div>
  </header>

  {#if bank.accounts.length === 0}
    <div class="sk-glass" in:fly={reveal(1)}>
      <EmptyState title={m.accounts_empty()} hint={m.transfers_no_account_hint()} />
    </div>
  {:else}
    <div class="grid grid-cols-[minmax(0,1fr)_340px] gap-6">
      <div in:fly={reveal(1)}>
        <TransferForm />
      </div>

      <div class="flex flex-col gap-6" in:fly={reveal(2)}>
        <BeneficiaryList />

        <GlassCard padding="sm" class="flex flex-col gap-2">
          <span class="sk-title px-3 pt-1 text-[15px]">{m.transfers_recent()}</span>
          <TransactionList
            transactions={recent}
            showAccount
            compact
            emptyTitle={m.transfers_recent_empty()}
            emptyHint={m.transfers_recent_hint()}
          />
        </GlassCard>
      </div>
    </div>
  {/if}
</div>

<TransferConfirm />
