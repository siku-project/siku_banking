<script lang="ts">
  import { Building2, Eye, EyeOff, Landmark, X } from '@lucide/svelte'
  import IconButton from '@/components/bank/shared/IconButton.svelte'
  import ThemeToggle from '@/components/bank/shared/ThemeToggle.svelte'
  import { app } from '@/lib/app.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { preferences } from '@/lib/preferences.svelte'
  import { session } from '@/lib/session.svelte'
  import { workspace } from '@/lib/workspace.svelte'

  const initials = $derived(
    [session.customer.firstName, session.customer.lastName]
      .map((part) => part.charAt(0).toUpperCase())
      .join(''),
  )
</script>

<header class="topbar">
  <div class="brand">
    <span class="brand__mark">
      {#if workspace.isEnterprise}
        <Building2 class="h-[17px] w-[17px]" />
      {:else}
        <Landmark class="h-[17px] w-[17px]" />
      {/if}
    </span>
    <div class="brand__text">
      <span class="brand__name">{m.common_bank_name()}</span>
      <span class="brand__area">
        {workspace.isEnterprise ? m.common_enterprise_area() : m.common_customer_area()}
      </span>
    </div>
  </div>

  <div class="cluster">
    <div class="identity">
      <span class="identity__name">{session.fullName}</span>
      <span class="identity__avatar sk-mono">{initials}</span>
    </div>

    <span class="cluster__rule"></span>

    <IconButton
      label={preferences.value.discreet ? m.settings_discreet_off() : m.settings_discreet_on()}
      onclick={() => preferences.toggleDiscreet()}
    >
      {#if preferences.value.discreet}
        <EyeOff class="h-[17px] w-[17px]" />
      {:else}
        <Eye class="h-[17px] w-[17px]" />
      {/if}
    </IconButton>

    <ThemeToggle />

    <IconButton label={m.common_close()} onclick={() => app.close()}>
      <X class="h-[17px] w-[17px]" />
    </IconButton>
  </div>
</header>

<style>
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    height: 68px;
    padding: 0 22px 0 26px;
    border-bottom: 1px solid var(--sk-border-soft);
    background: linear-gradient(to bottom, var(--sk-quiet), transparent);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 13px;
  }

  .brand__mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid var(--sk-accent-border);
    background: var(--sk-glass-strong);
    box-shadow:
      inset 0 1px 0 var(--sk-glass-highlight),
      0 10px 24px -14px var(--sk-accent-glow);
    color: var(--sk-accent);
  }

  .brand__text {
    display: flex;
    flex-direction: column;
    gap: 3px;
    line-height: 1;
  }

  .brand__name {
    font-size: 14.5px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--sk-text);
  }

  .brand__area {
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--sk-text-faint);
  }

  .cluster {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .identity {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-right: 6px;
  }

  .identity__name {
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: -0.005em;
    color: var(--sk-text-body);
  }

  .identity__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--sk-accent-ink);
    background: linear-gradient(150deg, var(--sk-accent-hover) 0%, var(--sk-accent) 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      0 0 0 3px var(--sk-accent-ring);
  }

  .cluster__rule {
    width: 1px;
    height: 22px;
    margin: 0 10px;
    background: var(--sk-rule-strong);
  }
</style>
