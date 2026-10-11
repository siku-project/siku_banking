<script lang="ts">
  import { Gauge, Lock, LockOpen, Plus } from '@lucide/svelte'
  import BankCard from '@/components/bank/accounts/BankCard.svelte'
  import CardLimitDialog from '@/components/bank/enterprise/accounts/CardLimitDialog.svelte'
  import IssueCardDialog from '@/components/bank/enterprise/accounts/IssueCardDialog.svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import { enterpriseApi } from '@/lib/enterprise-api'
  import { settleAction } from '@/lib/enterprise-actions'
  import { enterprise, type CompanyAccount, type CompanyCard } from '@/lib/enterprise.svelte'
  import { formatPercent } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'

  let { account, companyId }: { account: CompanyAccount; companyId: number } = $props()

  let issuing = $state(false)
  let limitTarget = $state<CompanyCard | null>(null)
  let busyId = $state<number | null>(null)

  const cards = $derived(enterprise.cardsOf(account.id))

  const holderOf = (card: CompanyCard): string =>
    (enterprise.member(card.memberId)?.name ?? '').toUpperCase()

  const toggle = async (card: CompanyCard): Promise<void> => {
    busyId = card.id

    const blocking = card.state === 'active'

    await settleAction(
      enterpriseApi.setCardState({
        companyId,
        cardId: card.id,
        state: blocking ? 'blocked' : 'active',
      }),
      blocking ? m.cards_blocked_toast() : m.cards_unblocked_toast(),
    )

    busyId = null
  }
</script>

<section class="flex flex-col gap-3">
  <div class="flex items-center justify-between px-1">
    <div class="flex flex-col gap-0.5">
      <span class="sk-label">{m.enterprise_cards_title()}</span>
      <span class="text-[12px] text-sk-soft">{m.enterprise_cards_hint()}</span>
    </div>
    <button type="button" class="sk-btn sk-btn--ghost !px-3" onclick={() => (issuing = true)}>
      <Plus class="h-3.5 w-3.5" />
      {m.enterprise_cards_issue()}
    </button>
  </div>

  {#if cards.length === 0}
    <div class="empty">{m.enterprise_cards_empty()}</div>
  {:else}
    <div class="grid grid-cols-2 gap-4">
      {#each cards as card (card.id)}
        {@const ratio = card.limit > 0 ? Math.min(1, card.spent / card.limit) : 0}
        <div class="flex flex-col gap-3">
          <BankCard card={{ ...card, holder: holderOf(card) }} />

          <div class="flex flex-col gap-1.5 px-1">
            <div class="flex items-center justify-between text-[11.5px]">
              <span class="text-sk-muted">{m.enterprise_cards_spent()}</span>
              <span class="flex items-center gap-1.5">
                <Amount value={card.spent} size="sm" />
                <span class="text-sk-faint">/</span>
                <Amount value={card.limit} size="sm" class="text-sk-soft" />
              </span>
            </div>
            <span class="bar" class:is-full={ratio >= 0.9}>
              <span class="bar__fill" style:width="{ratio * 100}%"></span>
            </span>
            <span class="text-[11px] text-sk-faint">
              {m.enterprise_cards_used({ share: formatPercent(ratio, locale.current) })}
            </span>
          </div>

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
            <button type="button" class="action sk-focus" onclick={() => (limitTarget = card)}>
              <Gauge class="h-3.5 w-3.5" />
              {m.enterprise_cards_limit()}
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</section>

<IssueCardDialog bind:open={issuing} {account} {companyId} />
<CardLimitDialog bind:card={limitTarget} {companyId} />

<style>
  .empty {
    padding: 22px;
    border-radius: var(--sk-radius-tile);
    border: 1px dashed var(--sk-border);
    background: var(--sk-quiet);
    text-align: center;
    font-size: 12.5px;
    color: var(--sk-text-faint);
  }

  .bar {
    display: block;
    height: 4px;
    overflow: hidden;
    border-radius: 9999px;
    background: var(--sk-rule);
  }

  .bar__fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--sk-accent-strong);
  }

  .bar.is-full .bar__fill {
    background: var(--sk-accent);
    box-shadow: 0 0 10px var(--sk-accent-glow);
  }

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

  .action:hover:not(:disabled) {
    border-color: var(--sk-border-hover);
    background: var(--sk-hover);
    color: var(--sk-text);
  }

  .action:disabled {
    opacity: 0.5;
  }
</style>
