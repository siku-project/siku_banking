<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import PinField from '@/components/bank/shared/PinField.svelte'
  import { api, isPin, PIN_LENGTH } from '@/lib/api'
  import type { Card } from '@/lib/bank.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { formatCardNumber } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'

  let { card = $bindable(null) }: { card?: Card | null } = $props()

  let current = $state('')
  let pin = $state('')
  let confirm = $state('')
  let busy = $state(false)

  const open = $derived(card !== null)
  const mismatch = $derived(confirm.length === PIN_LENGTH && pin !== confirm)
  const valid = $derived(isPin(current) && isPin(pin) && pin === confirm && current !== pin)

  $effect(() => {
    if (card) {
      current = ''
      pin = ''
      confirm = ''
    }
  })

  const close = (): void => {
    card = null
  }

  const submit = async (): Promise<void> => {
    if (!card || !valid || busy) {
      return
    }

    busy = true

    const outcome = await api.changePin({ cardId: card.id, currentPin: current, pin })

    busy = false

    if (!outcome.ok) {
      toast.error(reasonMessage(outcome.reason))
      current = ''
      return
    }

    toast.success(m.cards_pin_changed_toast())
    close()
  }
</script>

<Modal
  {open}
  onClose={close}
  title={m.cards_change_pin()}
  description={card ? m.cards_change_pin_text({ number: formatCardNumber(card.last4) }) : ''}
>
  <PinField bind:value={current} label={m.cards_pin_current()} autofocus />
  <div class="sk-rule"></div>
  <PinField bind:value={pin} label={m.cards_pin_new()} hint={m.cards_pin_hint()} />
  <PinField
    bind:value={confirm}
    label={m.cards_pin_confirm()}
    hint={mismatch ? m.cards_pin_mismatch() : undefined}
    invalid={mismatch}
  />

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={close}>
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
