<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import AccountDetail from '@/components/bank/accounts/AccountDetail.svelte'
  import AccountList from '@/components/bank/accounts/AccountList.svelte'
  import OpenAccountDialog from '@/components/bank/accounts/dialogs/OpenAccountDialog.svelte'
  import EmptyState from '@/components/bank/shared/EmptyState.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { duration, stagger } from '@/lib/motion'

  const REVEAL_MS = 420
  const STEP_MS = 90

  let opening = $state(false)

  const reveal = (index: number) => ({
    y: 14,
    duration: duration(REVEAL_MS),
    delay: stagger(index, STEP_MS),
  })

  onMount(() => {
    if (bank.selectedAccountId === null && bank.mainAccount) {
      bank.select(bank.mainAccount.id)
    }
  })
</script>

<div class="flex flex-col gap-6">
  <header class="flex items-end justify-between px-1" in:fly={reveal(0)}>
    <div class="flex flex-col gap-1">
      <span class="sk-label">{m.nav_accounts()}</span>
      <h1 class="text-[26px] font-semibold tracking-[-0.02em] text-sk">{m.accounts_title()}</h1>
    </div>
    <span class="text-xs text-sk-soft">{m.accounts_count({ count: bank.accounts.length })}</span>
  </header>

  <div class="grid grid-cols-[300px_minmax(0,1fr)] gap-6">
    <aside in:fly={reveal(1)}>
      <AccountList onOpen={() => (opening = true)} />
    </aside>

    <div in:fly={reveal(2)}>
      {#if bank.selectedAccount}
        {#key bank.selectedAccount.id}
          <div in:fly={{ y: 10, duration: duration(280) }}>
            <AccountDetail account={bank.selectedAccount} />
          </div>
        {/key}
      {:else}
        <div class="sk-glass">
          <EmptyState title={m.accounts_select_title()} hint={m.accounts_select_hint()} />
        </div>
      {/if}
    </div>
  </div>
</div>

<OpenAccountDialog bind:open={opening} />
