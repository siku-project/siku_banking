<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import BankCard from '@/components/bank/accounts/BankCard.svelte'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import { api } from '@/lib/api'
  import type { Card } from '@/lib/bank.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { m } from '@/lib/i18n.svelte'

  let { card = $bindable(null) }: { card?: Card | null } = $props()

  let busy = $state(false)

  const open = $derived(card !== null)

  const close = (): void => {
    card = null
  }

  const submit = async (): Promise<void> => {
    if (!card || busy) {
      return
    }

    busy = true

    const outcome = await api.cancelCard({ cardId: card.id })

    busy = false

    if (!outcome.ok) {
      toast.error(reasonMessage(outcome.reason))
      return
    }

    toast.success(m.cards_cancelled_toast())
    close()
  }
</script>

<Modal {open} onClose={close} title={m.cards_cancel()} description={m.cards_cancel_text()}>
  {#if card}
    <div class="mx-auto w-[320px]">
      <BankCard {card} compact />
    </div>
  {/if}

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={close}>
      {m.common_keep()}
    </button>
    <button type="button" class="sk-btn sk-btn--primary" disabled={busy} onclick={submit}>
      {#if busy}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {/if}
      {m.cards_cancel_confirm()}
    </button>
  {/snippet}
</Modal>
