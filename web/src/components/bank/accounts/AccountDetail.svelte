<script lang="ts">
  import { Archive, Pencil, Star } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import CardsSection from '@/components/bank/accounts/CardsSection.svelte'
  import CloseAccountDialog from '@/components/bank/accounts/dialogs/CloseAccountDialog.svelte'
  import RenameAccountDialog from '@/components/bank/accounts/dialogs/RenameAccountDialog.svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import StateBadge from '@/components/bank/shared/StateBadge.svelte'
  import TransactionList from '@/components/bank/transactions/TransactionList.svelte'
  import { api } from '@/lib/api'
  import { bank, type Account } from '@/lib/bank.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { formatAccountNumber } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'

  let { account }: { account: Account } = $props()

  const transactions = $derived(bank.transactionsOf(account.id))

  let renaming = $state(false)
  let closing = $state(false)
  let settingMain = $state(false)

  const setMain = async (): Promise<void> => {
    settingMain = true

    const outcome = await api.setMainAccount({ accountId: account.id })

    settingMain = false

    if (outcome.ok) {
      toast.success(m.accounts_main_toast({ label: account.label }))
    } else {
      toast.error(reasonMessage(outcome.reason))
    }
  }
</script>

<div class="flex flex-col gap-6">
  <GlassCard padding="lg" class="relative overflow-hidden">
    <div class="glow"></div>

    <div class="relative flex flex-col gap-6">
      <div class="flex items-start justify-between gap-6">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2.5">
            <h2 class="text-[22px] font-semibold tracking-[-0.01em] text-sk">{account.label}</h2>
            {#if account.main}
              <span class="sk-badge sk-badge--accent">
                <Star class="h-3 w-3 fill-current" />
                {m.accounts_main()}
              </span>
            {/if}
          </div>
          <div class="flex items-center gap-3 text-[12px] text-sk-soft">
            <span>{m.accounts_personal()}</span>
            <span class="h-3 w-px bg-sk-rule"></span>
            <span class="sk-mono tracking-[0.14em]">{formatAccountNumber(account.number)}</span>
          </div>
        </div>
        <StateBadge state={account.state} />
      </div>

      <div class="flex items-end justify-between gap-6">
        <div class="flex flex-col gap-1.5">
          <span class="sk-label">{m.accounts_balance()}</span>
          <Amount value={account.balance} size="xl" />
        </div>

        <div class="flex gap-2">
          <button
            type="button"
            class="sk-btn sk-btn--ghost !px-4"
            onclick={() => (renaming = true)}
          >
            <Pencil class="h-3.5 w-3.5" />
            {m.accounts_rename()}
          </button>
          {#if !account.main}
            <button
              type="button"
              class="sk-btn sk-btn--ghost !px-4"
              disabled={settingMain || account.state !== 'active'}
              onclick={setMain}
            >
              <Star class="h-3.5 w-3.5" />
              {m.accounts_set_main()}
            </button>
            <button
              type="button"
              class="sk-btn sk-btn--ghost !px-4"
              aria-label={m.accounts_close()}
              title={m.accounts_close()}
              onclick={() => (closing = true)}
            >
              <Archive class="h-3.5 w-3.5" />
            </button>
          {/if}
        </div>
      </div>
    </div>
  </GlassCard>

  <CardsSection {account} />

  <section class="flex flex-col gap-3">
    <span class="sk-label px-1">{m.accounts_transactions()}</span>
    <GlassCard padding="sm">
      <TransactionList {transactions} />
    </GlassCard>
  </section>
</div>

<RenameAccountDialog bind:open={renaming} {account} />
<CloseAccountDialog bind:open={closing} {account} />

<style>
  .glow {
    position: absolute;
    right: -140px;
    top: -180px;
    width: 420px;
    height: 420px;
    border-radius: 9999px;
    background: radial-gradient(circle, var(--sk-accent-haze) 0%, transparent 60%);
    pointer-events: none;
  }
</style>
