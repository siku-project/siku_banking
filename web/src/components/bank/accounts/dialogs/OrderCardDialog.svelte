<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import PinField from '@/components/bank/shared/PinField.svelte'
  import SummaryRow from '@/components/bank/shared/SummaryRow.svelte'
  import { api, isPin, PIN_LENGTH } from '@/lib/api'
  import type { Account } from '@/lib/bank.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { m } from '@/lib/i18n.svelte'
  import { session } from '@/lib/session.svelte'

  let { open = $bindable(false), account }: { open?: boolean; account: Account } = $props()

  let pin = $state('')
  let confirm = $state('')
  let busy = $state(false)

  const mismatch = $derived(confirm.length === PIN_LENGTH && pin !== confirm)
  const valid = $derived(isPin(pin) && pin === confirm)

  $effect(() => {
    if (open) {
      pin = ''
      confirm = ''
    }
  })

  const submit = async (): Promise<void> => {
    if (!valid || busy) {
      return
    }

    busy = true

    const outcome = await api.orderCard({ accountId: account.id, pin })

    busy = false

    if (!outcome.ok) {
      toast.error(reasonMessage(outcome.reason))
      return
    }

    toast.success(m.cards_ordered_toast())
    open = false
  }
</script>

<Modal bind:open title={m.cards_order()} description={m.cards_order_text()}>
  <div class="sk-glass flex flex-col divide-y divide-[var(--sk-rule)] px-5">
    <SummaryRow label={m.cards_holder()}>{session.fullName}</SummaryRow>
    <SummaryRow label={m.accounts_label()}>{account.label}</SummaryRow>
  </div>

  <PinField bind:value={pin} label={m.cards_pin()} hint={m.cards_pin_hint()} autofocus />
  <PinField
    bind:value={confirm}
    label={m.cards_pin_confirm()}
    hint={mismatch ? m.cards_pin_mismatch() : undefined}
    invalid={mismatch}
  />

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={() => (open = false)}>
      {m.common_cancel()}
    </button>
    <button type="button" class="sk-btn sk-btn--primary" disabled={!valid || busy} onclick={submit}>
      {#if busy}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {/if}
      {m.cards_order_confirm()}
    </button>
  {/snippet}
</Modal>
