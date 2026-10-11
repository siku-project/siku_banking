<script lang="ts">
  import EmptyState from '@/components/bank/shared/EmptyState.svelte'
  import TransactionRow from '@/components/bank/transactions/TransactionRow.svelte'
  import type { Transaction } from '@/lib/bank.svelte'

  let {
    transactions,
    showAccount = false,
    compact = false,
    emptyTitle,
    emptyHint,
  }: {
    transactions: Transaction[]
    showAccount?: boolean
    compact?: boolean
    emptyTitle?: string
    emptyHint?: string
  } = $props()
</script>

{#if transactions.length === 0}
  <EmptyState title={emptyTitle} hint={emptyHint} />
{:else}
  <div class="flex flex-col">
    {#each transactions as transaction, index (transaction.id)}
      {#if index > 0}
        <div class="sk-rule mx-3"></div>
      {/if}
      <TransactionRow {transaction} {showAccount} {compact} />
    {/each}
  </div>
{/if}
