<script lang="ts">
  import { Check, LoaderCircle } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import SummaryRow from '@/components/bank/shared/SummaryRow.svelte'
  import { companyTransfer } from '@/lib/company-transfer.svelte'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { formatAccountNumber, formatAmount } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'
  import { session } from '@/lib/session.svelte'

  const open = $derived(companyTransfer.step !== 'form')
  const done = $derived(companyTransfer.step === 'done')

  const confirm = async (): Promise<void> => {
    const ok = await companyTransfer.confirm()

    if (!ok) {
      toast.error(reasonMessage(companyTransfer.error ?? undefined))
    }
  }

  const close = (): void => {
    if (done) {
      companyTransfer.reset()
    } else {
      companyTransfer.cancelReview()
    }
  }
</script>

<Modal
  {open}
  onClose={close}
  title={done ? m.transfers_done_title() : m.transfers_confirm_title()}
  description={done
    ? m.enterprise_transfer_done_text()
    : m.enterprise_transfer_confirm_text({ name: enterprise.company?.name ?? '' })}
>
  {#if done}
    <div class="flex flex-col items-center gap-4 py-2">
      <span class="mark">
        <Check class="h-6 w-6" strokeWidth={2.6} />
      </span>
      <span class="sk-mono text-[30px] font-semibold tracking-[-0.02em] text-sk">
        {formatAmount(companyTransfer.amount, locale.current)}
      </span>
      <span class="text-[13px] text-sk-muted">
        {m.transfers_done_to({ holder: companyTransfer.holder })}
      </span>
    </div>
  {:else}
    <div class="sk-glass flex flex-col divide-y divide-[var(--sk-rule)] px-5">
      <SummaryRow label={m.transfers_from()}>
        {companyTransfer.fromAccount?.label ?? ''}
      </SummaryRow>
      <SummaryRow label={m.transfers_to()}>{companyTransfer.holder}</SummaryRow>
      <SummaryRow label={m.transfers_number()} mono>
        {formatAccountNumber(companyTransfer.number)}
      </SummaryRow>
      <SummaryRow label={m.transfers_label()}>{companyTransfer.label.trim()}</SummaryRow>
      <SummaryRow label={m.transfers_amount()} mono>
        {formatAmount(companyTransfer.amount, locale.current)}
      </SummaryRow>
      <SummaryRow label={m.enterprise_transfer_signed()}>{session.fullName}</SummaryRow>
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
        disabled={companyTransfer.submitting}
        onclick={confirm}
      >
        {#if companyTransfer.submitting}
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
