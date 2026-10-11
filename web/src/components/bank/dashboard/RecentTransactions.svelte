<script lang="ts">
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import TransactionList from '@/components/bank/transactions/TransactionList.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { m } from '@/lib/i18n.svelte'

  const transactions = $derived(
    bank.selectedAccountId ? bank.transactionsOf(bank.selectedAccountId) : bank.recentTransactions,
  )
  const account = $derived(bank.selectedAccountId ? bank.account(bank.selectedAccountId) : null)
</script>

<GlassCard padding="sm" class="flex flex-col gap-2">
  <div class="flex items-center justify-between px-3 pt-1">
    <span class="sk-title text-[15px]">{m.dashboard_recent()}</span>
    {#if account}
      <span class="sk-badge sk-badge--accent">{account.label}</span>
    {/if}
  </div>

  <TransactionList {transactions} showAccount={!account} />
</GlassCard>
