<script lang="ts">
  import { FileSignature } from '@lucide/svelte'
  import SummaryRow from '@/components/bank/shared/SummaryRow.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { onboarding } from '@/lib/onboarding.svelte'
  import { session } from '@/lib/session.svelte'
</script>

<div class="flex flex-col gap-3">
  <span class="sk-label">{m.onboarding_step_review()}</span>
  <h1 class="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-sk">
    {m.onboarding_review_title()}
  </h1>
  <p class="text-[14px] leading-relaxed text-sk-muted">{m.onboarding_review_text()}</p>
</div>

<div class="sk-glass flex flex-col divide-y divide-[var(--sk-rule)] px-5">
  <SummaryRow label={m.onboarding_review_holder()}>{session.fullName}</SummaryRow>
  <SummaryRow label={m.accounts_label()}>{onboarding.form.label.trim()}</SummaryRow>
  <SummaryRow label={m.accounts_kind()}>{m.accounts_personal()}</SummaryRow>
  <SummaryRow label={m.onboarding_review_card()}>
    {onboarding.form.wantsCard ? m.common_yes() : m.common_no()}
  </SummaryRow>
  <SummaryRow label={m.onboarding_review_opening_balance()} mono>0 $</SummaryRow>
</div>

<div
  class="flex items-start gap-3.5 rounded-[var(--sk-radius-tile)] border border-sk-soft bg-sk-quiet p-4"
>
  <FileSignature class="mt-0.5 h-4 w-4 shrink-0 text-sk-accent" />
  <p class="text-[12.5px] leading-relaxed text-sk-muted">{m.onboarding_review_terms()}</p>
</div>
