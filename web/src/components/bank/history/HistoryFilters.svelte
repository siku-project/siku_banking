<script lang="ts">
  import { Search, X } from '@lucide/svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import { bank } from '@/lib/bank.svelte'
  import {
    history,
    HISTORY_PERIODS,
    type HistoryDirection,
    type HistoryPeriod,
  } from '@/lib/history.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { CATEGORIES, CATEGORY_ICONS, categoryLabel } from '@/lib/labels'

  const directions: { key: HistoryDirection; label: () => string }[] = [
    { key: 'all', label: () => m.history_direction_all() },
    { key: 'in', label: () => m.history_direction_in() },
    { key: 'out', label: () => m.history_direction_out() },
  ]

  const periodLabel = (period: HistoryPeriod): string =>
    period === 'all' ? m.history_period_all() : m.history_period_days({ days: period })
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
        value={history.query}
        oninput={(event) => history.setQuery(event.currentTarget.value)}
      />
      {#if history.query}
        <button
          type="button"
          class="sk-tile sk-tile--interactive h-6 w-6"
          aria-label={m.history_clear()}
          onclick={() => history.setQuery('')}
        >
          <X class="h-3.5 w-3.5" />
        </button>
      {/if}
    </label>

    <div class="flex gap-1.5">
      {#each HISTORY_PERIODS as period (period)}
        <button
          type="button"
          class="sk-chip px-3 py-2 text-xs"
          class:sk-chip--active={history.period === period}
          onclick={() => history.setPeriod(period)}
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
          class:sk-chip--active={history.accountId === null}
          onclick={() => history.setAccount(null)}
        >
          {m.history_all_accounts()}
        </button>
        {#each bank.accounts as account (account.id)}
          <button
            type="button"
            class="sk-chip px-3 py-1.5 text-xs"
            class:sk-chip--active={history.accountId === account.id}
            onclick={() => history.setAccount(account.id)}
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
            class:sk-chip--active={history.direction === entry.key}
            onclick={() => history.setDirection(entry.key)}
          >
            {entry.label()}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="flex flex-wrap items-center gap-1.5">
    {#each CATEGORIES as category (category)}
      {@const Icon = CATEGORY_ICONS[category]}
      <button
        type="button"
        class="sk-chip px-3 py-1.5 text-xs"
        class:sk-chip--active={history.categories.has(category)}
        onclick={() => history.toggleCategory(category)}
      >
        <Icon class="h-3.5 w-3.5" />
        {categoryLabel(category)}
      </button>
    {/each}

    {#if history.filtered}
      <button
        type="button"
        class="ml-auto flex items-center gap-1.5 text-xs text-sk-muted transition-colors hover:text-sk"
        onclick={() => history.clear()}
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
