<script lang="ts">
  import { Search, X } from '@lucide/svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import { companyHistory } from '@/lib/company-history.svelte'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { HISTORY_PERIODS, type HistoryDirection, type HistoryPeriod } from '@/lib/history.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { CATEGORIES, CATEGORY_ICONS, categoryLabel } from '@/lib/labels'

  const directions: { key: HistoryDirection; label: () => string }[] = [
    { key: 'all', label: () => m.history_direction_all() },
    { key: 'in', label: () => m.history_direction_in() },
    { key: 'out', label: () => m.history_direction_out() },
  ]

  const periodLabel = (period: HistoryPeriod): string =>
    period === 'all' ? m.history_period_all() : m.history_period_days({ days: period })

  const accounts = $derived(enterprise.company?.accounts ?? [])
</script>

<GlassCard padding="md" class="flex flex-col gap-5">
  <div class="flex items-center gap-3">
    <label class="search sk-field flex flex-1 items-center gap-3">
      <Search class="h-4 w-4 shrink-0 text-sk-soft" />
      <input
        class="min-w-0 flex-1 bg-transparent text-[13.2px] text-sk outline-none placeholder:text-sk-faint"
        type="text"
        autocomplete="off"
        spellcheck="false"
        placeholder={m.history_search_placeholder()}
        value={companyHistory.query}
        oninput={(event) => companyHistory.setQuery(event.currentTarget.value)}
      />
    </label>

    <div class="flex gap-1.5">
      {#each HISTORY_PERIODS as period (period)}
        <button
          type="button"
          class="sk-chip px-3 py-2 text-xs"
          class:sk-chip--active={companyHistory.period === period}
          onclick={() => companyHistory.setPeriod(period)}
        >
          {periodLabel(period)}
        </button>
      {/each}
    </div>
  </div>

  <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
    <div class="flex items-center gap-2">
      <span class="sk-label">{m.history_filter_account()}</span>
      <div class="flex gap-1.5">
        <button
          type="button"
          class="sk-chip px-3 py-1.5 text-xs"
          class:sk-chip--active={companyHistory.accountId === null}
          onclick={() => companyHistory.setAccount(null)}
        >
          {m.history_all_accounts()}
        </button>
        {#each accounts as account (account.id)}
          <button
            type="button"
            class="sk-chip px-3 py-1.5 text-xs"
            class:sk-chip--active={companyHistory.accountId === account.id}
            onclick={() => companyHistory.setAccount(account.id)}
          >
            {account.label}
          </button>
        {/each}
      </div>
    </div>

    <div class="flex items-center gap-2">
      <span class="sk-label">{m.history_filter_direction()}</span>
      <div class="flex gap-1.5">
        {#each directions as entry (entry.key)}
          <button
            type="button"
            class="sk-chip px-3 py-1.5 text-xs"
            class:sk-chip--active={companyHistory.direction === entry.key}
            onclick={() => companyHistory.setDirection(entry.key)}
          >
            {entry.label()}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="flex flex-wrap items-center gap-2">
    <span class="sk-label mr-1">{m.enterprise_history_author()}</span>
    <button
      type="button"
      class="sk-chip px-3 py-1.5 text-xs"
      class:sk-chip--active={companyHistory.author === null}
      onclick={() => companyHistory.setAuthor(null)}
    >
      {m.enterprise_history_all_authors()}
    </button>
    {#each companyHistory.authors as name (name)}
      <button
        type="button"
        class="sk-chip px-3 py-1.5 text-xs"
        class:sk-chip--active={companyHistory.author === name}
        onclick={() => companyHistory.setAuthor(name)}
      >
        {name}
      </button>
    {/each}
  </div>

  <div class="flex flex-wrap items-center gap-1.5">
    {#each CATEGORIES as category (category)}
      {@const Icon = CATEGORY_ICONS[category]}
      <button
        type="button"
        class="sk-chip px-3 py-1.5 text-xs"
        class:sk-chip--active={companyHistory.categories.has(category)}
        onclick={() => companyHistory.toggleCategory(category)}
      >
        <Icon class="h-3.5 w-3.5" />
        {categoryLabel(category)}
      </button>
    {/each}

    {#if companyHistory.filtered}
      <button
        type="button"
        class="ml-auto flex items-center gap-1.5 text-xs text-sk-muted transition-colors hover:text-sk"
        onclick={() => companyHistory.clear()}
      >
        <X class="h-3.5 w-3.5" />
        {m.history_clear()}
      </button>
    {/if}
  </div>
</GlassCard>

<style>
  .search:focus-within {
    border-color: var(--sk-accent-strong);
    background: var(--sk-field-focus);
    box-shadow: 0 0 0 3px var(--sk-accent-ring);
  }
</style>
