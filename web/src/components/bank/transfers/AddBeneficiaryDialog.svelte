<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import TextField from '@/components/bank/shared/TextField.svelte'
  import NumberField from '@/components/bank/transfers/NumberField.svelte'
  import { accountDigits, api, isAccountNumber, isLabel } from '@/lib/api'
  import { bank } from '@/lib/bank.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { m } from '@/lib/i18n.svelte'

  let { open = $bindable(false) }: { open?: boolean } = $props()

  let number = $state('')
  let holder = $state('')
  let label = $state('')
  let verifying = $state(false)
  let error = $state<string | undefined>(undefined)
  let busy = $state(false)

  const valid = $derived(
    isAccountNumber(number) && holder !== '' && isLabel(label, bank.limits.labelLength),
  )

  $effect(() => {
    if (open) {
      number = ''
      holder = ''
      label = ''
      error = undefined
    }
  })

  const onInput = (value: string): void => {
    number = accountDigits(value).slice(0, 12)
    holder = ''
    error = undefined
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

    if (!label) {
      label = holder
    }
  }

  const submit = async (): Promise<void> => {
    if (!valid || busy) {
      return
    }

    busy = true

    const outcome = await api.addBeneficiary({ number, label: label.trim() })

    busy = false

    if (!outcome.ok) {
      toast.error(reasonMessage(outcome.reason))
      return
    }

    toast.success(m.beneficiaries_added_toast({ label: label.trim() }))
    open = false
  }
</script>

<Modal bind:open title={m.beneficiaries_add()} description={m.beneficiaries_add_text()}>
  <NumberField value={number} {holder} {verifying} {error} {onInput} onVerify={verify} />

  <TextField
    bind:value={label}
    label={m.beneficiaries_label()}
    hint={m.accounts_label_hint({ max: bank.limits.labelLength })}
    maxlength={bank.limits.labelLength}
    disabled={holder === ''}
  />

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={() => (open = false)}>
      {m.common_cancel()}
    </button>
    <button type="button" class="sk-btn sk-btn--primary" disabled={!valid || busy} onclick={submit}>
      {#if busy}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {/if}
      {m.common_save()}
    </button>
  {/snippet}
</Modal>
