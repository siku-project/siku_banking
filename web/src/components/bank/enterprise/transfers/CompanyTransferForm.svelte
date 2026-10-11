<script lang="ts">
  import { ArrowRight, Hash, Landmark, Truck, type LucideIcon } from '@lucide/svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import TextField from '@/components/bank/shared/TextField.svelte'
  import AccountPicker from '@/components/bank/transfers/AccountPicker.svelte'
  import AmountField from '@/components/bank/transfers/AmountField.svelte'
  import NumberField from '@/components/bank/transfers/NumberField.svelte'
  import { companyTransfer, type CompanyTarget } from '@/lib/company-transfer.svelte'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { formatAccountNumber, formatAmount } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'

  interface Tab {
    key: CompanyTarget
    label: () => string
    icon: LucideIcon
  }

  const tabs: Tab[] = [
    { key: 'supplier', label: () => m.enterprise_transfer_target_supplier(), icon: Truck },
    { key: 'internal', label: () => m.enterprise_transfer_target_internal(), icon: Landmark },
    { key: 'number', label: () => m.transfers_target_number(), icon: Hash },
  ]

  const accounts = $derived(enterprise.company?.accounts ?? [])
  const others = $derived(
    accounts.filter((account) => account.id !== companyTransfer.fromAccountId),
  )
  const suppliers = $derived(enterprise.company?.suppliers ?? [])
  const available = $derived(
    formatAmount(companyTransfer.fromAccount?.balance ?? 0, locale.current),
  )
</script>

<GlassCard padding="lg" class="flex flex-col gap-7">
  <div class="flex flex-col gap-1">
    <span class="sk-title">{m.enterprise_transfer_new()}</span>
    <span class="text-[13px] text-sk-muted">{m.enterprise_transfer_new_text()}</span>
  </div>

  <section class="flex flex-col gap-3">
    <span class="sk-label">{m.transfers_from()}</span>
    <AccountPicker
      {accounts}
      selected={companyTransfer.fromAccountId}
      onPick={(id) => companyTransfer.setFrom(id)}
    />
  </section>

  <div class="sk-rule"></div>

  <section class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <span class="sk-label">{m.transfers_to()}</span>
      <div class="flex gap-1.5">
        {#each tabs as tab (tab.key)}
          <button
            type="button"
            class="sk-chip px-3 py-1.5 text-xs"
            class:sk-chip--active={companyTransfer.target === tab.key}
            onclick={() => companyTransfer.setTarget(tab.key)}
          >
            <tab.icon class="h-3.5 w-3.5" />
            {tab.label()}
          </button>
        {/each}
      </div>
    </div>

    {#if companyTransfer.target === 'internal'}
      {#if others.length > 0}
        <AccountPicker
          accounts={others}
          selected={companyTransfer.toAccountId}
          onPick={(id) => companyTransfer.pickInternal(id)}
        />
      {:else}
        <p class="text-[13px] text-sk-muted">{m.enterprise_transfer_internal_empty()}</p>
      {/if}
    {:else if companyTransfer.target === 'supplier'}
      {#if suppliers.length > 0}
        <div class="flex flex-col gap-2">
          {#each suppliers as entry (entry.id)}
            {@const active = companyTransfer.supplierId === entry.id}
            <button
              type="button"
              class="sk-row sk-focus flex items-center gap-3.5 px-4 py-3 text-left"
              class:sk-row--active={active}
              aria-pressed={active}
              onclick={() => companyTransfer.pickSupplier(entry.id)}
            >
              <span
                class="sk-tile h-9 w-9 shrink-0 border border-sk-soft bg-sk-quiet"
                class:text-sk-accent={active}
                class:text-sk-muted={!active}
              >
                <Truck class="h-4 w-4" />
              </span>
              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <span class="truncate text-[13px] font-medium text-sk">{entry.label}</span>
                <span class="truncate text-[11.5px] text-sk-soft">{entry.holder}</span>
              </div>
              <span class="sk-mono text-[11px] tracking-[0.1em] text-sk-faint">
                {formatAccountNumber(entry.number)}
              </span>
            </button>
          {/each}
        </div>
      {:else}
        <p class="text-[13px] text-sk-muted">{m.enterprise_suppliers_empty()}</p>
      {/if}
    {:else}
      <NumberField
        value={companyTransfer.typedNumber}
        holder={companyTransfer.holder}
        verifying={companyTransfer.verifying}
        error={companyTransfer.error ? reasonMessage(companyTransfer.error) : undefined}
        onInput={(value) => companyTransfer.setTypedNumber(value)}
        onVerify={() => companyTransfer.verify()}
      />
    {/if}
  </section>

  <div class="sk-rule"></div>

  <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5">
    <AmountField
      value={companyTransfer.amountText}
      {available}
      invalid={companyTransfer.amount > 0 && !companyTransfer.amountValid}
      hint={companyTransfer.amount > 0 && !companyTransfer.amountValid
        ? m.error_insufficient_balance()
        : undefined}
      onInput={(value) => companyTransfer.setAmountText(value)}
    />
    <TextField
      value={companyTransfer.label}
      label={m.transfers_label()}
      hint={m.enterprise_transfer_label_hint()}
      placeholder={m.enterprise_transfer_label_placeholder()}
      maxlength={companyTransfer.labelMax}
      oninput={(event) => companyTransfer.setLabel(event.currentTarget.value)}
    />
  </div>

  <div class="flex items-center justify-between gap-6 border-t border-sk-soft pt-6">
    <span class="text-[12.5px] text-sk-muted">{m.enterprise_transfer_trace()}</span>
    <button
      type="button"
      class="sk-btn sk-btn--primary"
      disabled={!companyTransfer.valid}
      onclick={() => companyTransfer.review()}
    >
      {m.common_continue()}
      <ArrowRight class="h-3.5 w-3.5" />
    </button>
  </div>
</GlassCard>
