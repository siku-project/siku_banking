<script lang="ts">
  import { fly } from 'svelte/transition'
  import DisplaySection from '@/components/bank/settings/DisplaySection.svelte'
  import NotificationsSection from '@/components/bank/settings/NotificationsSection.svelte'
  import ProfileSection from '@/components/bank/settings/ProfileSection.svelte'
  import SecuritySection from '@/components/bank/settings/SecuritySection.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { duration, stagger } from '@/lib/motion'

  const REVEAL_MS = 420
  const STEP_MS = 90

  const reveal = (index: number) => ({
    y: 14,
    duration: duration(REVEAL_MS),
    delay: stagger(index, STEP_MS),
  })
</script>

<div class="flex flex-col gap-6">
  <header class="flex items-end justify-between px-1" in:fly={reveal(0)}>
    <div class="flex flex-col gap-1">
      <span class="sk-label">{m.nav_settings()}</span>
      <h1 class="text-[26px] font-semibold tracking-[-0.02em] text-sk">{m.settings_title()}</h1>
    </div>
  </header>

  <div class="grid grid-cols-2 items-start gap-6">
    <div class="flex flex-col gap-6">
      <div in:fly={reveal(1)}><ProfileSection /></div>
      <div in:fly={reveal(3)}><SecuritySection /></div>
    </div>
    <div class="flex flex-col gap-6">
      <div in:fly={reveal(2)}><DisplaySection /></div>
      <div in:fly={reveal(4)}><NotificationsSection /></div>
    </div>
  </div>
</div>
