<script lang="ts">
  import { ArrowRight } from '@lucide/svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import TextField from '@/components/bank/shared/TextField.svelte'
  import AccountPicker from '@/components/bank/transfers/AccountPicker.svelte'
  import AmountField from '@/components/bank/transfers/AmountField.svelte'
  import TargetPicker from '@/components/bank/transfers/TargetPicker.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { formatAmount } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'
  import { transfer } from '@/lib/transfer.svelte'

  const available = $derived(formatAmount(transfer.fromAccount?.balance ?? 0, locale.current))

  const amountHint = $derived.by((): string | undefined => {
    if (transfer.amount === 0) {
      return undefined
    }

    if (!transfer.amountValid) {
      const { min, max } = bank.limits.transfer

      if (transfer.amount < min || (max !== false && transfer.amount > max)) {
        return m.transfers_amount_bounds({
          min: formatAmount(min, locale.current),
          max: max === false ? '∞' : formatAmount(max, locale.current),
        })
      }

      return m.error_insufficient_balance()
    }

    return undefined
  })

  const hasFee = $derived(transfer.quote.fee > 0)
</script>

<GlassCard padding="lg" class="flex flex-col gap-7">
  <div class="flex flex-col gap-1">
    <span class="sk-title">{m.transfers_new()}</span>
    <span class="text-[13px] text-sk-muted">{m.transfers_new_text()}</span>
  </div>

  <section class="flex flex-col gap-3">
    <span class="sk-label">{m.transfers_from()}</span>
    <AccountPicker
      accounts={bank.accounts}
      selected={transfer.fromAccountId}
      onPick={(id) => transfer.setFrom(id)}
    />
  </section>

  <div class="sk-rule"></div>

  <TargetPicker />

  <div class="sk-rule"></div>

  <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5">
    <AmountField
      value={transfer.amountText}
      {available}
      hint={amountHint}
      invalid={transfer.amount > 0 && !transfer.amountValid}
      onInput={(value) => transfer.setAmountText(value)}
    />
    <TextField
      value={transfer.label}
      label={m.transfers_label()}
      hint={m.transfers_label_hint({ max: bank.limits.transfer.labelLength })}
      placeholder={m.transfers_label_placeholder()}
      maxlength={bank.limits.transfer.labelLength}
      oninput={(event) => transfer.setLabel(event.currentTarget.value)}
    />
  </div>

  <div class="flex items-center justify-between gap-6 border-t border-sk-soft pt-6">
    <div class="flex flex-col gap-0.5 text-[12.5px] text-sk-muted">
      {#if hasFee}
        <span>
          {m.transfers_fee_line({ fee: formatAmount(transfer.quote.fee, locale.current) })}
        </span>
        <span class="sk-mono text-sk-body">
          {m.transfers_total_line({ total: formatAmount(transfer.quote.total, locale.current) })}
        </span>
      {:else}
        <span>{m.transfers_no_fee()}</span>
      {/if}
    </div>

    <button
      type="button"
      class="sk-btn sk-btn--primary"
      disabled={!transfer.valid}
      onclick={() => transfer.review()}
    >
      {m.common_continue()}
      <ArrowRight class="h-3.5 w-3.5" />
    </button>
  </div>
</GlassCard>
