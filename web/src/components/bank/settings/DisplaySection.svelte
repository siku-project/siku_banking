<script lang="ts">
  import { Moon, MonitorSmartphone, Sun } from '@lucide/svelte'
  import SettingRow from '@/components/bank/settings/SettingRow.svelte'
  import SettingsSection from '@/components/bank/settings/SettingsSection.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { preferences } from '@/lib/preferences.svelte'
  import type { Theme } from '@/lib/theme.svelte'
  import { Switch } from '$lib/components/ui/switch'

  const themes: { key: Theme; label: () => string; icon: typeof Sun }[] = [
    { key: 'dark', label: () => m.settings_theme_dark(), icon: Moon },
    { key: 'light', label: () => m.settings_theme_light(), icon: Sun },
  ]
</script>

<SettingsSection
  title={m.settings_display_title()}
  description={m.settings_display_text()}
  icon={MonitorSmartphone}
>
  <SettingRow label={m.settings_theme()} hint={m.settings_theme_hint()}>
    {#each themes as entry (entry.key)}
      <button
        type="button"
        class="sk-chip px-3 py-1.5 text-xs"
        class:sk-chip--active={preferences.value.theme === entry.key}
        onclick={() => preferences.save({ theme: entry.key })}
      >
        <entry.icon class="h-3.5 w-3.5" />
        {entry.label()}
      </button>
    {/each}
  </SettingRow>

  <SettingRow label={m.settings_intro()} hint={m.settings_intro_hint()}>
    <Switch
      checked={preferences.value.intro}
      aria-label={m.settings_intro()}
      onCheckedChange={(value) => preferences.save({ intro: value })}
    />
  </SettingRow>

  <SettingRow label={m.settings_discreet()} hint={m.settings_discreet_hint()}>
    <Switch
      checked={preferences.value.discreet}
      aria-label={m.settings_discreet()}
      onCheckedChange={(value) => preferences.save({ discreet: value })}
    />
  </SettingRow>
</SettingsSection>
