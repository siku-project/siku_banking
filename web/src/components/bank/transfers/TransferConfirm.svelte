<script lang="ts">
  import { Check, LoaderCircle } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import SummaryRow from '@/components/bank/shared/SummaryRow.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { formatAccountNumber, formatAmount } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'
  import { transfer } from '@/lib/transfer.svelte'

  const open = $derived(transfer.step !== 'form')
  const done = $derived(transfer.step === 'done')

  const money = (value: number): string => formatAmount(value, locale.current)

  const confirm = async (): Promise<void> => {
    const ok = await transfer.confirm()

    if (!ok) {
      toast.error(reasonMessage(transfer.error ?? undefined))
    }
  }

  const close = (): void => {
    if (done) {
      transfer.reset()
    } else {
      transfer.cancelReview()
    }
  }
</script>

<Modal
  {open}
  onClose={close}
  title={done ? m.transfers_done_title() : m.transfers_confirm_title()}
  description={done ? m.transfers_done_text() : m.transfers_confirm_text()}
>
  {#if done}
    <div class="flex flex-col items-center gap-4 py-2">
      <span class="mark">
        <Check class="h-6 w-6" strokeWidth={2.6} />
      </span>
      <span class="sk-mono text-[30px] font-semibold tracking-[-0.02em] text-sk">
        {money(transfer.quote.amount)}
      </span>
      <span class="text-[13px] text-sk-muted">
        {m.transfers_done_to({ holder: transfer.holder })}
      </span>
    </div>
  {:else}
    <div class="sk-glass flex flex-col divide-y divide-[var(--sk-rule)] px-5">
      <SummaryRow label={m.transfers_from()}>{transfer.fromAccount?.label ?? ''}</SummaryRow>
      <SummaryRow label={m.transfers_to()}>{transfer.holder}</SummaryRow>
      <SummaryRow label={m.transfers_number()} mono>
        {formatAccountNumber(transfer.number)}
      </SummaryRow>
      <SummaryRow label={m.transfers_label()}>{transfer.label.trim()}</SummaryRow>
      <SummaryRow label={m.transfers_amount()} mono>{money(transfer.quote.amount)}</SummaryRow>
      {#if transfer.quote.fee > 0}
        <SummaryRow label={m.transfers_fee()} mono>{money(transfer.quote.fee)}</SummaryRow>
        <SummaryRow label={m.transfers_total()} mono>{money(transfer.quote.total)}</SummaryRow>
      {/if}
    </div>
  {/if}

  {#snippet footer()}
    {#if done}
      <button type="button" class="sk-btn sk-btn--primary" onclick={close}>
        {m.common_close()}
      </button>
    {:else}
      <button type="button" class="sk-btn sk-btn--ghost" onclick={close}>
        {m.common_back()}
      </button>
      <button
        type="button"
        class="sk-btn sk-btn--primary"
        disabled={transfer.submitting}
        onclick={confirm}
      >
        {#if transfer.submitting}
          <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
        {/if}
        {m.transfers_confirm()}
      </button>
    {/if}
  {/snippet}
</Modal>

<style>
  .mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 9999px;
    border: 1px solid var(--sk-accent-border);
    background: var(--sk-accent-tint);
    color: var(--sk-accent);
    box-shadow:
      0 0 0 6px var(--sk-accent-ring),
      0 0 40px -10px var(--sk-accent-glow);
  }
</style>
