<script lang="ts">
  import { Building2, UserRound } from '@lucide/svelte'
  import { push, router } from 'svelte-spa-router'
  import { m } from '@/lib/i18n.svelte'
  import { enterpriseNavigation, isActivePath, navigation } from '@/lib/routes'
  import { session } from '@/lib/session.svelte'
  import { workspace } from '@/lib/workspace.svelte'

  const items = $derived(workspace.isEnterprise ? enterpriseNavigation : navigation)
</script>

<nav class="flex w-[220px] shrink-0 flex-col border-r border-sk-soft px-4 py-6">
  <span class="sk-label mb-3 px-3">{m.nav_section()}</span>

  <div class="flex flex-col gap-1.5">
    {#each items as item (item.key)}
      {@const active = isActivePath(item.path, router.location)}
      {@const soon = item.path === undefined}
      <button
        type="button"
        class="sk-row sk-focus flex items-center gap-3 px-4 py-3 text-left"
        class:sk-row--active={active}
        class:opacity-50={soon}
        aria-current={active ? 'page' : undefined}
        disabled={soon}
        onclick={() => item.path && push(item.path)}
      >
        <item.icon class="h-4 w-4 {active ? 'text-sk-accent' : 'text-sk-soft'}" />
        <span class="flex-1 text-[13.5px] font-medium {active ? 'text-sk-accent' : 'text-sk-body'}">
          {m[item.labelKey]()}
        </span>
        {#if soon}
          <span class="sk-badge px-2 py-0.5 text-[9.5px] uppercase tracking-[0.14em]"
            >{m.nav_soon()}</span
          >
        {/if}
      </button>
    {/each}
  </div>

  {#if session.customer.enterprise}
    <div class="mt-auto flex flex-col gap-2 pt-6">
      <span class="sk-label px-3">{m.nav_workspace()}</span>
      <button
        type="button"
        class="switch sk-focus flex items-center gap-3 px-4 py-3 text-left"
        disabled={workspace.switching}
        onclick={() => workspace.toggle()}
      >
        <span class="sk-tile h-8 w-8 shrink-0 bg-sk-tint text-sk-accent">
          {#if workspace.isEnterprise}
            <UserRound class="h-4 w-4" />
          {:else}
            <Building2 class="h-4 w-4" />
          {/if}
        </span>
        <span class="flex flex-col leading-tight">
          <span class="text-[13px] font-medium text-sk">
            {workspace.isEnterprise ? m.nav_personal() : m.nav_enterprise()}
          </span>
          <span class="text-[11px] text-sk-soft">
            {workspace.isEnterprise ? m.nav_personal_hint() : m.nav_enterprise_hint()}
          </span>
        </span>
      </button>
    </div>
  {/if}
</nav>

<style>
  .switch {
    border-radius: var(--sk-radius-row);
    border: 1px solid var(--sk-accent-border);
    background: var(--sk-glass-strong);
    box-shadow: inset 0 1px 0 var(--sk-glass-highlight);
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease;
  }

  .switch:hover:not(:disabled) {
    border-color: var(--sk-accent-strong);
    box-shadow:
      inset 0 1px 0 var(--sk-glass-highlight),
      0 0 24px -10px var(--sk-accent-glow);
  }
</style>
