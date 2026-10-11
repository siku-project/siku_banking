<script lang="ts">
  import { fly } from 'svelte/transition'
  import AccountCard from '@/components/bank/dashboard/AccountCard.svelte'
  import BalanceHero from '@/components/bank/dashboard/BalanceHero.svelte'
  import QuickActions from '@/components/bank/dashboard/QuickActions.svelte'
  import RecentTransactions from '@/components/bank/dashboard/RecentTransactions.svelte'
  import EmptyState from '@/components/bank/shared/EmptyState.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { duration, stagger } from '@/lib/motion'

  const REVEAL_MS = 420
  const STEP_MS = 90

  const reveal = (index: number) => ({
    y: 14,
    duration: duration(REVEAL_MS),
    delay: stagger(index, STEP_MS),
  })
</script>

<div class="flex flex-col gap-6">
  <section in:fly={reveal(0)}>
    <BalanceHero />
  </section>

  <section class="flex flex-col gap-3" in:fly={reveal(1)}>
    <span class="sk-label px-1">{m.dashboard_quick_actions()}</span>
    <QuickActions />
  </section>

  <section class="flex flex-col gap-3" in:fly={reveal(2)}>
    <div class="flex items-center justify-between px-1">
      <span class="sk-label">{m.dashboard_accounts()}</span>
      <span class="text-xs text-sk-soft">{m.accounts_count({ count: bank.accounts.length })}</span>
    </div>

    {#if bank.accounts.length > 0}
      <div class="grid grid-cols-3 gap-3">
        {#each bank.accounts as account (account.id)}
          <AccountCard {account} />
        {/each}
      </div>
    {:else}
      <EmptyState title={m.accounts_empty()} hint={m.common_empty_hint()} />
    {/if}
  </section>

  <section in:fly={reveal(3)}>
    <RecentTransactions />
  </section>
</div>
