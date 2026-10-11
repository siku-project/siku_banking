<script lang="ts">
  import { LoaderCircle, Plus, Send, Trash2, Truck } from '@lucide/svelte'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import TextField from '@/components/bank/shared/TextField.svelte'
  import NumberField from '@/components/bank/transfers/NumberField.svelte'
  import { accountDigits, api, isAccountNumber, isLabel } from '@/lib/api'
  import { companyTransfer } from '@/lib/company-transfer.svelte'
  import { enterpriseApi } from '@/lib/enterprise-api'
  import { settleAction } from '@/lib/enterprise-actions'
  import { enterprise, type Supplier } from '@/lib/enterprise.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { formatAccountNumber } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'

  const LABEL_MAX = 24

  let adding = $state(false)
  let number = $state('')
  let holder = $state('')
  let label = $state('')
  let verifying = $state(false)
  let error = $state<string | undefined>(undefined)
  let busy = $state(false)

  const suppliers = $derived(enterprise.company?.suppliers ?? [])
  const valid = $derived(isAccountNumber(number) && holder !== '' && isLabel(label, LABEL_MAX))

  const openDialog = (): void => {
    number = ''
    holder = ''
    label = ''
    error = undefined
    adding = true
  }

  const verify = async (): Promise<void> => {
    verifying = true

    const outcome = await api.lookupRecipient({ number })

    verifying = false

    if (!outcome.ok || !outcome.recipient) {
      error = reasonMessage(outcome.reason)
      return
    }

    holder = outcome.recipient.holder
  }

  const save = async (): Promise<void> => {
    const company = enterprise.company

    if (!valid || busy || !company) {
      return
    }

    busy = true

    const done = await settleAction(
      enterpriseApi.addSupplier({ companyId: company.id, number, label: label.trim() }),
      m.beneficiaries_added_toast({ label: label.trim() }),
    )

    busy = false

    if (done) {
      adding = false
    }
  }

  const remove = (entry: Supplier): void => {
    const company = enterprise.company

    if (company) {
      void settleAction(
        enterpriseApi.removeSupplier({ companyId: company.id, supplierId: entry.id }),
        m.beneficiaries_removed_toast({ label: entry.label }),
      )
    }
  }
</script>

<GlassCard padding="sm" class="flex flex-col gap-3">
  <div class="flex items-center justify-between px-3 pt-1">
    <span class="sk-title text-[15px]">{m.enterprise_suppliers_title()}</span>
    <span class="text-[11px] text-sk-faint">{suppliers.length}</span>
  </div>

  <div class="flex flex-col gap-1.5">
    {#each suppliers as entry (entry.id)}
      <div
        class="group flex items-center gap-3 rounded-[var(--sk-radius-row)] px-3 py-2.5 transition-colors hover:bg-sk-hover"
      >
        <span class="sk-tile h-9 w-9 shrink-0 border border-sk-soft bg-sk-quiet text-sk-muted">
          <Truck class="h-4 w-4" />
        </span>
        <div class="flex min-w-0 flex-1 flex-col gap-0.5">
          <span class="truncate text-[13px] font-medium text-sk">{entry.label}</span>
          <span class="sk-mono truncate text-[11px] text-sk-soft">
            {formatAccountNumber(entry.number)}
          </span>
        </div>
        <div class="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            class="sk-tile sk-tile--interactive sk-focus h-8 w-8"
            aria-label={m.beneficiaries_send()}
            title={m.beneficiaries_send()}
            onclick={() => companyTransfer.pickSupplier(entry.id)}
          >
            <Send class="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            class="sk-tile sk-tile--interactive sk-focus h-8 w-8"
            aria-label={m.beneficiaries_remove()}
            title={m.beneficiaries_remove()}
            onclick={() => remove(entry)}
          >
            <Trash2 class="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    {:else}
      <p class="px-3 py-4 text-[12.5px] text-sk-faint">{m.enterprise_suppliers_empty()}</p>
    {/each}
  </div>

  <button type="button" class="sk-btn sk-btn--ghost mx-3 mb-2" onclick={openDialog}>
    <Plus class="h-3.5 w-3.5" />
    {m.enterprise_suppliers_add()}
  </button>
</GlassCard>

<Modal
  bind:open={adding}
  title={m.enterprise_suppliers_add()}
  description={m.enterprise_suppliers_add_text()}
>
  <NumberField
    value={number}
    {holder}
    {verifying}
    {error}
    onInput={(value) => {
      number = accountDigits(value).slice(0, 12)
      holder = ''
      error = undefined
    }}
    onVerify={verify}
  />
  <TextField
    bind:value={label}
    label={m.enterprise_suppliers_label()}
    maxlength={LABEL_MAX}
    disabled={holder === ''}
  />

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={() => (adding = false)}>
      {m.common_cancel()}
    </button>
    <button type="button" class="sk-btn sk-btn--primary" disabled={!valid || busy} onclick={save}>
      {#if busy}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {/if}
      {m.common_save()}
    </button>
  {/snippet}
</Modal>
