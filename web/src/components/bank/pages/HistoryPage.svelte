<script lang="ts">
  import { fly } from 'svelte/transition'
  import HistoryFilters from '@/components/bank/history/HistoryFilters.svelte'
  import HistoryGroups from '@/components/bank/history/HistoryGroups.svelte'
  import HistorySummary from '@/components/bank/history/HistorySummary.svelte'
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
      <span class="sk-label">{m.nav_history()}</span>
      <h1 class="text-[26px] font-semibold tracking-[-0.02em] text-sk">{m.history_title()}</h1>
    </div>
  </header>

  <div in:fly={reveal(1)}>
    <HistoryFilters />
  </div>

  <div in:fly={reveal(2)}>
    <HistorySummary />
  </div>

  <div in:fly={reveal(3)}>
    <HistoryGroups />
  </div>
</div>
