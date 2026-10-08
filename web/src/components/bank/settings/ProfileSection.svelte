<script lang="ts">
  import { IdCard } from '@lucide/svelte'
  import SettingsSection from '@/components/bank/settings/SettingsSection.svelte'
  import SummaryRow from '@/components/bank/shared/SummaryRow.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { formatAccountNumber, formatDate, formatIsoDay } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'
  import { session } from '@/lib/session.svelte'

  const liveCards = $derived(bank.cards.filter((card) => card.state !== 'cancelled').length)
</script>

<SettingsSection
  title={m.settings_profile_title()}
  description={m.settings_profile_text()}
  icon={IdCard}
>
  <SummaryRow label={m.settings_profile_holder()}>{session.fullName}</SummaryRow>
  <SummaryRow label={m.onboarding_identity_birth_date()}>
    {formatIsoDay(session.customer.birthDate, locale.current)}
  </SummaryRow>
  <SummaryRow label={m.settings_profile_number()} mono>{session.customer.number}</SummaryRow>
  {#if session.customer.since > 0}
    <SummaryRow label={m.settings_profile_since()}>
      {formatDate(session.customer.since, locale.current, true)}
    </SummaryRow>
  {/if}
  {#if bank.mainAccount}
    <SummaryRow label={m.dashboard_main_account()} mono>
      {formatAccountNumber(bank.mainAccount.number)}
    </SummaryRow>
  {/if}
  <SummaryRow label={m.settings_profile_products()}>
    {m.settings_profile_products_value({ accounts: bank.accounts.length, cards: liveCards })}
  </SummaryRow>
</SettingsSection>
