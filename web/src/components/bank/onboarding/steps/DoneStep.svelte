<script lang="ts">
  import { ArrowRight, Check } from '@lucide/svelte'
  import BankCard from '@/components/bank/accounts/BankCard.svelte'
  import SummaryRow from '@/components/bank/shared/SummaryRow.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { formatAccountNumber } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { onboarding } from '@/lib/onboarding.svelte'

  const account = $derived(bank.mainAccount)
  const card = $derived(account ? (bank.cardsOf(account.id)[0] ?? null) : null)
</script>

<div class="flex flex-col items-center gap-5 pt-6 text-center">
  <span class="mark">
    <Check class="h-7 w-7" strokeWidth={2.6} />
  </span>
  <div class="flex flex-col gap-2">
    <h1 class="text-[30px] font-semibold leading-tight tracking-[-0.02em] text-sk">
      {m.onboarding_done_title()}
    </h1>
    <p class="text-[14px] leading-relaxed text-sk-muted">{m.onboarding_done_text()}</p>
  </div>
</div>

{#if account}
  <div class="sk-glass flex flex-col divide-y divide-[var(--sk-rule)] px-5">
    <SummaryRow label={m.accounts_label()}>{account.label}</SummaryRow>
    <SummaryRow label={m.accounts_number()} mono>{formatAccountNumber(account.number)}</SummaryRow>
  </div>
{/if}

{#if card}
  <div class="mx-auto w-[360px]">
    <BankCard {card} />
  </div>
{/if}

<div class="flex justify-center pt-2">
  <button type="button" class="sk-btn sk-btn--primary" onclick={() => onboarding.finish()}>
    {m.onboarding_done_cta()}
    <ArrowRight class="h-3.5 w-3.5" />
  </button>
</div>

<style>
  .mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 9999px;
    border: 1px solid var(--sk-accent-border);
    background: var(--sk-accent-tint);
    color: var(--sk-accent);
    box-shadow:
      0 0 0 6px var(--sk-accent-ring),
      0 0 40px -10px var(--sk-accent-glow);
  }
</style>
