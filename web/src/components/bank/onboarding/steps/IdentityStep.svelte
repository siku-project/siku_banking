<script lang="ts">
  import CheckField from '@/components/bank/shared/CheckField.svelte'
  import SummaryRow from '@/components/bank/shared/SummaryRow.svelte'
  import { formatIsoDay } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'
  import { onboarding } from '@/lib/onboarding.svelte'
  import { session } from '@/lib/session.svelte'
</script>

<div class="flex flex-col gap-3">
  <span class="sk-label">{m.onboarding_step_identity()}</span>
  <h1 class="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-sk">
    {m.onboarding_identity_title()}
  </h1>
  <p class="text-[14px] leading-relaxed text-sk-muted">{m.onboarding_identity_text()}</p>
</div>

<div class="sk-glass flex flex-col divide-y divide-[var(--sk-rule)] px-5">
  <SummaryRow label={m.onboarding_identity_first_name()}>
    {session.customer.firstName}
  </SummaryRow>
  <SummaryRow label={m.onboarding_identity_last_name()}>
    {session.customer.lastName}
  </SummaryRow>
  <SummaryRow label={m.onboarding_identity_birth_date()}>
    {formatIsoDay(session.customer.birthDate, locale.current)}
  </SummaryRow>
</div>

<CheckField bind:checked={onboarding.form.attested} label={m.onboarding_identity_attest()} />
