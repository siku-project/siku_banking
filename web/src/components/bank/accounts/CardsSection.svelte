<script lang="ts">
  import { Ban, KeyRound, LockOpen, Lock, Plus } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import BankCard from '@/components/bank/accounts/BankCard.svelte'
  import CancelCardDialog from '@/components/bank/accounts/dialogs/CancelCardDialog.svelte'
  import ChangePinDialog from '@/components/bank/accounts/dialogs/ChangePinDialog.svelte'
  import OrderCardDialog from '@/components/bank/accounts/dialogs/OrderCardDialog.svelte'
  import { api } from '@/lib/api'
  import { bank, type Account, type Card } from '@/lib/bank.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { m } from '@/lib/i18n.svelte'

  let { account }: { account: Account } = $props()

  const cards = $derived(bank.cardsOf(account.id))
  const canOrder = $derived(account.state === 'active' && bank.canOrderCard(account.id))

  let ordering = $state(false)
  let pinTarget = $state<Card | null>(null)
  let cancelTarget = $state<Card | null>(null)
  let busyId = $state<number | null>(null)

  const toggle = async (card: Card): Promise<void> => {
    busyId = card.id

    const blocked = card.state === 'active'
    const outcome = await api.setCardState({
      cardId: card.id,
      state: blocked ? 'blocked' : 'active',
    })

    busyId = null

    if (outcome.ok) {
      toast.success(blocked ? m.cards_blocked_toast() : m.cards_unblocked_toast())
    } else {
      toast.error(reasonMessage(outcome.reason))
    }
  }
</script>

<section class="flex flex-col gap-3">
  <div class="flex items-center justify-between px-1">
    <span class="sk-label">{m.cards_title()}</span>
    <span class="text-[11px] text-sk-faint">
      {m.cards_limit({ count: cards.length, max: bank.limits.cardsPerAccount })}
    </span>
  </div>

  <div class="grid grid-cols-2 gap-4">
    {#each cards as card (card.id)}
      <div class="flex flex-col gap-3">
        <BankCard {card} />

        <div class="flex gap-2">
          <button
            type="button"
            class="action sk-focus"
            disabled={busyId === card.id}
            onclick={() => toggle(card)}
          >
            {#if card.state === 'active'}
              <Lock class="h-3.5 w-3.5" />
              {m.cards_block()}
            {:else}
              <LockOpen class="h-3.5 w-3.5" />
              {m.cards_unblock()}
            {/if}
          </button>
          <button type="button" class="action sk-focus" onclick={() => (pinTarget = card)}>
            <KeyRound class="h-3.5 w-3.5" />
            {m.cards_change_pin()}
          </button>
          <button
            type="button"
            class="action sk-focus"
            aria-label={m.cards_cancel()}
            title={m.cards_cancel()}
            onclick={() => (cancelTarget = card)}
          >
            <Ban class="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    {/each}

    {#if canOrder}
      <button
        type="button"
        class="order sk-focus flex flex-col items-center justify-center gap-3"
        onclick={() => (ordering = true)}
      >
        <span class="sk-tile h-11 w-11 bg-sk-tint text-sk-accent">
          <Plus class="h-4 w-4" />
        </span>
        <span class="text-[13px] font-medium text-sk-body">{m.cards_order()}</span>
        <span class="text-[11px] text-sk-faint">{m.cards_order_hint()}</span>
      </button>
    {:else if cards.length === 0}
      <div class="order flex flex-col items-center justify-center gap-2 opacity-60">
        <span class="text-[13px] text-sk-muted">{m.cards_none()}</span>
      </div>
    {/if}
  </div>
</section>

<OrderCardDialog bind:open={ordering} {account} />
<ChangePinDialog bind:card={pinTarget} />
<CancelCardDialog bind:card={cancelTarget} />

<style>
  .action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    flex: 1;
    padding: 8px 10px;
    border-radius: var(--sk-radius-control);
    border: 1px solid var(--sk-border-soft);
    background: var(--sk-quiet);
    font-size: 11.5px;
    font-weight: 500;
    color: var(--sk-text-muted);
    transition:
      border-color 0.16s ease,
      color 0.16s ease,
      background 0.16s ease;
  }

  .action:last-child {
    flex: 0 0 auto;
  }

  .action:hover:not(:disabled) {
    border-color: var(--sk-border-hover);
    background: var(--sk-hover);
    color: var(--sk-text);
  }

  .action:disabled {
    opacity: 0.5;
  }

  .order {
    aspect-ratio: 1.586;
    border-radius: 16px;
    border: 1px dashed var(--sk-border);
    background: var(--sk-quiet);
    transition:
      border-color 0.16s ease,
      background 0.16s ease;
  }

  button.order:hover {
    border-color: var(--sk-border-hover);
    background: var(--sk-hover);
  }
</style>
