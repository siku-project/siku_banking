<script lang="ts">
  import { ArrowRight } from '@lucide/svelte'
  import { push } from 'svelte-spa-router'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import SummaryRow from '@/components/bank/shared/SummaryRow.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { formatAccountNumber, formatAmount, formatDate, formatTime } from '@/lib/format'
  import { history } from '@/lib/history.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { inspector } from '@/lib/inspector.svelte'
  import { CATEGORY_ICONS, categoryLabel } from '@/lib/labels'
  import { locale } from '@/lib/locale.svelte'
  import { PATHS } from '@/lib/routes'

  const transaction = $derived(inspector.transaction)
  const account = $derived(transaction ? bank.account(transaction.accountId) : null)
  const Icon = $derived(transaction ? CATEGORY_ICONS[transaction.category] : null)

  /** Opens the history on every operation of the same account. */
  const seeAccount = (): void => {
    if (!transaction) {
      return
    }

    history.clear()
    history.setAccount(transaction.accountId)
    inspector.close()
    push(PATHS.history)
  }
</script>

<Modal
  open={inspector.open}
  onClose={() => inspector.close()}
  title={m.history_detail_title()}
  description={transaction ? categoryLabel(transaction.category) : ''}
>
  {#if transaction && Icon}
    <div class="flex items-center gap-4">
      <span class="sk-tile h-12 w-12 shrink-0 border border-sk-soft bg-sk-quiet text-sk-muted">
        <Icon class="h-5 w-5" />
      </span>
      <div class="flex min-w-0 flex-1 flex-col gap-1">
        <span class="truncate text-[15px] font-medium text-sk">{transaction.label}</span>
        <span class="text-xs text-sk-soft">
          {formatDate(transaction.at, locale.current, true)} · {formatTime(
            transaction.at,
            locale.current,
          )}
        </span>
      </div>
      <Amount value={transaction.amount} size="lg" signed />
    </div>

    <div class="sk-glass flex flex-col divide-y divide-[var(--sk-rule)] px-5">
      {#if account}
        <SummaryRow label={m.history_detail_account()}>{account.label}</SummaryRow>
        <SummaryRow label={m.accounts_number()} mono>
          {formatAccountNumber(account.number)}
        </SummaryRow>
      {/if}
      <SummaryRow label={m.common_balance_after()} mono>
        {formatAmount(transaction.balanceAfter, locale.current)}
      </SummaryRow>
      <SummaryRow label={m.history_detail_reference()} mono>
        #{String(transaction.id).padStart(6, '0')}
      </SummaryRow>
    </div>
  {/if}

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={seeAccount}>
      {m.history_detail_see_account()}
      <ArrowRight class="h-3.5 w-3.5" />
    </button>
    <button type="button" class="sk-btn sk-btn--primary" onclick={() => inspector.close()}>
      {m.common_close()}
    </button>
  {/snippet}
</Modal>
