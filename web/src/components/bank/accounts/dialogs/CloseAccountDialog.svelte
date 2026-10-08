<script lang="ts">
  import { LoaderCircle, TriangleAlert } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import SummaryRow from '@/components/bank/shared/SummaryRow.svelte'
  import { api } from '@/lib/api'
  import { bank, type Account } from '@/lib/bank.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { formatAccountNumber, formatAmount } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'

  let { open = $bindable(false), account }: { open?: boolean; account: Account } = $props()

  let busy = $state(false)

  const blocked = $derived(account.balance !== 0)
  const cards = $derived(bank.cardsOf(account.id).length)

  const submit = async (): Promise<void> => {
    if (blocked || busy) {
      return
    }

    busy = true

    const outcome = await api.closeAccount({ accountId: account.id })

    busy = false

    if (!outcome.ok) {
      toast.error(reasonMessage(outcome.reason))
      return
    }

    toast.success(m.accounts_closed_toast({ label: account.label }))
    open = false
  }
</script>

<Modal bind:open title={m.accounts_close()} description={m.accounts_close_text()}>
  <div class="sk-glass flex flex-col divide-y divide-[var(--sk-rule)] px-5">
    <SummaryRow label={m.accounts_label()}>{account.label}</SummaryRow>
    <SummaryRow label={m.accounts_number()} mono>{formatAccountNumber(account.number)}</SummaryRow>
    <SummaryRow label={m.accounts_balance()} mono>
      {formatAmount(account.balance, locale.current)}
    </SummaryRow>
    {#if cards > 0}
      <SummaryRow label={m.cards_title()}>{m.accounts_close_cards({ count: cards })}</SummaryRow>
    {/if}
  </div>

  {#if blocked}
    <div
      class="flex items-start gap-3 rounded-[var(--sk-radius-control)] border border-sk-soft bg-sk-quiet p-3.5"
    >
      <TriangleAlert class="mt-0.5 h-4 w-4 shrink-0 text-sk-muted" />
      <span class="text-[12.5px] leading-relaxed text-sk-muted">{m.error_balance_not_zero()}</span>
    </div>
  {/if}

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={() => (open = false)}>
      {m.common_cancel()}
    </button>
    <button
      type="button"
      class="sk-btn sk-btn--primary"
      disabled={blocked || busy}
      onclick={submit}
    >
      {#if busy}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {/if}
      {m.accounts_close_confirm()}
    </button>
  {/snippet}
</Modal>
