<script lang="ts">
  import { Snowflake } from '@lucide/svelte'
  import type { AccountState } from '@/lib/bank.svelte'
  import { m } from '@/lib/i18n.svelte'

  let { state }: { state: AccountState } = $props()
</script>

{#if state === 'frozen'}
  <span class="sk-badge">
    <Snowflake class="h-3 w-3" />
    {m.accounts_state_frozen()}
  </span>
{:else}
  <span class="sk-badge sk-badge--accent">
    <span class="h-1.5 w-1.5 rounded-full bg-sk-accent shadow-glow"></span>
    {m.accounts_state_active()}
  </span>
{/if}
