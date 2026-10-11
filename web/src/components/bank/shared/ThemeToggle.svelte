<script lang="ts">
  import { Moon, Sun } from '@lucide/svelte'
  import IconButton from '@/components/bank/shared/IconButton.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { preferences } from '@/lib/preferences.svelte'
  import { session } from '@/lib/session.svelte'
  import { theme } from '@/lib/theme.svelte'

  /** A customer keeps the choice; before the first opening it only lasts the visit. */
  const toggle = (): void => {
    if (session.customer.onboarded) {
      void preferences.toggleTheme()
    } else {
      theme.toggle()
    }
  }
</script>

<IconButton label={m.common_theme_toggle()} onclick={toggle}>
  {#if theme.isDark}
    <Sun class="h-[17px] w-[17px]" />
  {:else}
    <Moon class="h-[17px] w-[17px]" />
  {/if}
</IconButton>
