<script lang="ts">
  import Amount from '@/components/bank/shared/Amount.svelte'
  import { bank, type Transaction } from '@/lib/bank.svelte'
  import { formatTime } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { inspector } from '@/lib/inspector.svelte'
  import { CATEGORY_ICONS, categoryLabel, dayLabel } from '@/lib/labels'
  import { locale } from '@/lib/locale.svelte'

  let {
    transaction,
    showAccount = false,
    compact = false,
    showDay = true,
  }: {
    transaction: Transaction
    showAccount?: boolean
    /** Two lines and the amount, for a narrow column. */
    compact?: boolean
    /** Whether the day shows on the row; a list grouped by day drops it. */
    showDay?: boolean
  } = $props()

  const Icon = $derived(CATEGORY_ICONS[transaction.category])
  const account = $derived(showAccount ? bank.account(transaction.accountId) : null)
  const time = $derived(formatTime(transaction.at, locale.current))
  const day = $derived(dayLabel(transaction.at, locale.current))
</script>

{#if compact}
  <button
    type="button"
    class="sk-focus flex w-full items-center gap-3 rounded-[var(--sk-radius-row)] px-3 py-2.5 text-left transition-colors hover:bg-sk-hover"
    onclick={() => inspector.show(transaction)}
  >
    <span class="sk-tile h-9 w-9 shrink-0 border border-sk-soft bg-sk-quiet text-sk-muted">
      <Icon class="h-4 w-4" />
    </span>

    <div class="flex min-w-0 flex-1 flex-col gap-0.5">
      <span class="truncate text-[13px] font-medium text-sk">{transaction.label}</span>
      <span class="truncate text-[11px] text-sk-soft">
        {showDay ? `${day} · ${time}` : time}
        {#if account}
          · {account.label}
        {/if}
      </span>
    </div>

    <Amount value={transaction.amount} size="sm" signed />
  </button>
{:else}
  <button
    type="button"
    class="sk-focus flex w-full items-center gap-4 rounded-[var(--sk-radius-row)] px-3 py-3 text-left transition-colors hover:bg-sk-hover"
    onclick={() => inspector.show(transaction)}
  >
    <span class="sk-tile h-10 w-10 shrink-0 border border-sk-soft bg-sk-quiet text-sk-muted">
      <Icon class="h-4 w-4" />
    </span>

    <div class="flex min-w-0 flex-1 flex-col gap-0.5">
      <span class="truncate text-sm font-medium text-sk">{transaction.label}</span>
      <span class="truncate text-xs text-sk-soft">
        {categoryLabel(transaction.category)}
        {#if account}
          · {account.label}
        {/if}
      </span>
    </div>

    <div class="flex w-[92px] shrink-0 flex-col items-end gap-0.5">
      {#if showDay}
        <span class="text-xs text-sk-muted">{day}</span>
      {/if}
      <span class="sk-mono text-[11px] text-sk-faint">{time}</span>
    </div>

    <div class="flex w-[150px] shrink-0 flex-col items-end gap-0.5">
      <Amount value={transaction.amount} signed />
      <span class="sk-mono text-[11px] text-sk-faint">
        {m.common_balance_after()} · <Amount
          value={transaction.balanceAfter}
          size="sm"
          class="text-sk-faint"
        />
      </span>
    </div>
  </button>
{/if}
