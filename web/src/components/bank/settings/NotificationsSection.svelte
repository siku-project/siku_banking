<script lang="ts">
  import { BellRing } from '@lucide/svelte'
  import SettingRow from '@/components/bank/settings/SettingRow.svelte'
  import SettingsSection from '@/components/bank/settings/SettingsSection.svelte'
  import { formatAmount } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'
  import { preferences } from '@/lib/preferences.svelte'
  import { Switch } from '$lib/components/ui/switch'

  let draft = $state(String(preferences.value.lowBalance || ''))

  const enabled = $derived(preferences.value.lowBalance > 0)
  const parsed = $derived(Number.parseInt(draft, 10) || 0)
  const changed = $derived(parsed !== preferences.value.lowBalance)

  const onInput = (value: string): void => {
    draft = value.replace(/\D/g, '').slice(0, 9)
  }

  const commit = (): void => {
    if (changed) {
      void preferences.save({ lowBalance: parsed })
    }
  }

  const onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      commit()
    }
  }
</script>

<SettingsSection
  title={m.settings_notifications_title()}
  description={m.settings_notifications_text()}
  icon={BellRing}
>
  <SettingRow label={m.settings_notify_incoming()} hint={m.settings_notify_incoming_hint()}>
    <Switch
      checked={preferences.value.notifyIncoming}
      aria-label={m.settings_notify_incoming()}
      onCheckedChange={(value) => preferences.save({ notifyIncoming: value })}
    />
  </SettingRow>

  <SettingRow label={m.settings_notify_outgoing()} hint={m.settings_notify_outgoing_hint()}>
    <Switch
      checked={preferences.value.notifyOutgoing}
      aria-label={m.settings_notify_outgoing()}
      onCheckedChange={(value) => preferences.save({ notifyOutgoing: value })}
    />
  </SettingRow>

  <SettingRow
    label={m.settings_low_balance()}
    hint={enabled
      ? m.settings_low_balance_on({
          amount: formatAmount(preferences.value.lowBalance, locale.current),
        })
      : m.settings_low_balance_off()}
  >
    <label class="threshold sk-field flex w-[150px] items-center gap-2">
      <span class="sk-mono text-sk-soft">$</span>
      <input
        class="sk-mono min-w-0 flex-1 bg-transparent text-right text-sk outline-none placeholder:text-sk-faint"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        placeholder="0"
        aria-label={m.settings_low_balance()}
        value={draft}
        oninput={(event) => onInput(event.currentTarget.value)}
        onkeydown={onKeydown}
        onblur={commit}
      />
    </label>
  </SettingRow>
</SettingsSection>

<style>
  .threshold {
    padding: 8px 12px;
  }

  .threshold:focus-within {
    border-color: var(--sk-accent-strong);
    background: var(--sk-field-focus);
    box-shadow: 0 0 0 3px var(--sk-accent-ring);
  }
</style>
