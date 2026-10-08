<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import EmptyState from '@/components/bank/shared/EmptyState.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import TransactionRow from '@/components/bank/transactions/TransactionRow.svelte'
  import { history } from '@/lib/history.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { dayLabel } from '@/lib/labels'
  import { locale } from '@/lib/locale.svelte'
</script>

{#if history.groups.length === 0}
  <GlassCard padding="none">
    <EmptyState title={m.history_empty_title()} hint={m.history_empty_hint()} />
  </GlassCard>
{:else}
  <div class="flex flex-col gap-4">
    {#each history.groups as group (group.day)}
      <GlassCard padding="sm" class="flex flex-col gap-1">
        <div class="flex items-center justify-between px-3 pb-1 pt-1.5">
          <span class="sk-label">{dayLabel(group.day, locale.current, true)}</span>
          <span class="flex items-center gap-2 text-[11px] text-sk-faint">
            {m.history_day_net()}
            <Amount value={group.net} size="sm" signed class="text-sk-muted" />
          </span>
        </div>

        <div class="flex flex-col">
          {#each group.items as transaction, index (transaction.id)}
            {#if index > 0}
              <div class="sk-rule mx-3"></div>
            {/if}
            <TransactionRow {transaction} showAccount showDay={false} />
          {/each}
        </div>
      </GlassCard>
    {/each}
  </div>
{/if}

<div class="flex justify-center pt-2">
  {#if history.canLoadMore}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={() => history.loadMore()}>
      {m.history_load_more()}
    </button>
  {:else if history.loading}
    <LoaderCircle class="h-4 w-4 animate-spin text-sk-soft" />
  {:else}
    <span class="text-xs text-sk-faint">{m.history_end()}</span>
  {/if}
</div>
