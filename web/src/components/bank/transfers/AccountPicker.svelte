<script lang="ts">
  import { Check, Wallet } from '@lucide/svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import type { Account } from '@/lib/bank.svelte'
  import { formatAccountNumber } from '@/lib/format'

  let {
    accounts,
    selected,
    onPick,
    disabledId = null,
  }: {
    accounts: Account[]
    selected: number | null
    onPick: (accountId: number) => void
    /** An account shown but not pickable, such as the sender among the targets. */
    disabledId?: number | null
  } = $props()
</script>

<div class="flex flex-col gap-2">
  {#each accounts as account (account.id)}
    {@const active = account.id === selected}
    {@const disabled = account.id === disabledId || account.state !== 'active'}
    <button
      type="button"
      class="sk-row sk-focus flex items-center gap-3.5 px-4 py-3 text-left disabled:cursor-not-allowed disabled:opacity-40"
      class:sk-row--active={active}
      aria-pressed={active}
      {disabled}
      onclick={() => onPick(account.id)}
    >
      <span
        class="sk-tile h-9 w-9 shrink-0 border border-sk-soft"
        class:bg-sk-tint={active}
        class:text-sk-accent={active}
        class:bg-sk-quiet={!active}
        class:text-sk-muted={!active}
      >
        {#if active}
          <Check class="h-4 w-4" strokeWidth={2.6} />
        {:else}
          <Wallet class="h-4 w-4" />
        {/if}
      </span>
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <span class="truncate text-[13px] font-medium text-sk">{account.label}</span>
        <span class="sk-mono text-[11px] tracking-[0.1em] text-sk-soft">
          {formatAccountNumber(account.number)}
        </span>
      </div>
      <Amount value={account.balance} size="sm" class="text-sk-muted" />
    </button>
  {/each}
</div>
