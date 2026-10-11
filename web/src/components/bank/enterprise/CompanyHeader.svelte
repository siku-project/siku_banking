<script lang="ts">
  import { BriefcaseBusiness, Users } from '@lucide/svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import type { Company } from '@/lib/enterprise.svelte'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { m } from '@/lib/i18n.svelte'

  let { company }: { company: Company } = $props()

  const initials = $derived(
    company.name
      .split(/\s+/)
      .filter((word) => /^[A-Za-zÀ-ÿ]/.test(word))
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join(''),
  )
</script>

<GlassCard padding="lg" class="header relative overflow-hidden">
  <div class="header__glow"></div>

  <div class="relative flex items-center justify-between gap-8">
    <div class="flex items-center gap-5">
      <span class="mark sk-mono">{initials}</span>

      <div class="flex flex-col gap-2">
        <span class="sk-label">{m.enterprise_label()}</span>
        <h1 class="text-[26px] font-semibold leading-none tracking-[-0.02em] text-sk">
          {company.name}
        </h1>
        <div class="flex items-center gap-3 text-[12.5px] text-sk-soft">
          <span class="flex items-center gap-1.5">
            <BriefcaseBusiness class="h-3.5 w-3.5" />
            {company.role}
          </span>
          <span class="h-3 w-px bg-sk-rule"></span>
          <span class="flex items-center gap-1.5">
            <Users class="h-3.5 w-3.5" />
            {m.enterprise_employees({ count: enterprise.members.length })}
          </span>
        </div>
      </div>
    </div>

    {#if enterprise.companies.length > 1}
      <div class="flex flex-col items-end gap-2">
        <span class="sk-label">{m.enterprise_switch_company()}</span>
        <div class="flex gap-1.5">
          {#each enterprise.companies as entry (entry.id)}
            <button
              type="button"
              class="sk-chip px-3 py-1.5 text-xs"
              class:sk-chip--active={entry.id === company.id}
              onclick={() => enterprise.select(entry.id)}
            >
              {entry.name}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</GlassCard>

<style>
  .header__glow {
    position: absolute;
    left: -160px;
    top: -220px;
    width: 520px;
    height: 520px;
    border-radius: 9999px;
    background: radial-gradient(circle, var(--sk-accent-haze) 0%, transparent 62%);
    pointer-events: none;
  }

  .mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 18px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--sk-accent-ink);
    background: linear-gradient(150deg, var(--sk-accent-hover) 0%, var(--sk-accent) 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      0 0 0 5px var(--sk-accent-ring),
      0 18px 40px -20px var(--sk-accent-glow);
  }
</style>
