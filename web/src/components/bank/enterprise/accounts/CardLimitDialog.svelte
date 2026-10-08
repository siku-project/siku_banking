<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import AmountField from '@/components/bank/transfers/AmountField.svelte'
  import { enterpriseApi } from '@/lib/enterprise-api'
  import { settleAction } from '@/lib/enterprise-actions'
  import { enterprise, type CompanyCard } from '@/lib/enterprise.svelte'
  import { formatAmount } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'

  let { card = $bindable(null), companyId }: { card?: CompanyCard | null; companyId: number } =
    $props()

  let limitText = $state('')
  let busy = $state(false)

  const open = $derived(card !== null)
  const limit = $derived(Number.parseInt(limitText, 10) || 0)
  const holder = $derived(card ? (enterprise.member(card.memberId)?.name ?? '') : '')

  $effect(() => {
    if (card) {
      limitText = String(card.limit)
    }
  })

  const close = (): void => {
    card = null
  }

  const submit = async (): Promise<void> => {
    if (!card || limit <= 0 || busy) {
      return
    }

    busy = true

    const done = await settleAction(
      enterpriseApi.setCardLimit({ companyId, cardId: card.id, limit }),
      m.enterprise_cards_limit_saved(),
    )

    busy = false

    if (done) {
      close()
    }
  }
</script>

<Modal
  {open}
  onClose={close}
  title={m.enterprise_cards_limit()}
  description={m.enterprise_cards_limit_text({ holder })}
>
  <AmountField
    value={limitText}
    available={formatAmount(card?.spent ?? 0, locale.current)}
    hint={m.enterprise_cards_limit_spent({
      amount: formatAmount(card?.spent ?? 0, locale.current),
    })}
    onInput={(value) => (limitText = value.replace(/\D/g, '').slice(0, 7))}
  />

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={close}>
      {m.common_cancel()}
    </button>
    <button
      type="button"
      class="sk-btn sk-btn--primary"
      disabled={limit <= 0 || busy}
      onclick={submit}
    >
      {#if busy}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {/if}
      {m.common_save()}
    </button>
  {/snippet}
</Modal>
