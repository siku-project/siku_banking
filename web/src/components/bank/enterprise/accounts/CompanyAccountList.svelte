<script lang="ts">
  import { Landmark, Plus, Star } from '@lucide/svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import type { CompanyAccount } from '@/lib/enterprise.svelte'
  import { formatAccountNumber } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'

  let {
    accounts,
    selected,
    onSelect,
    onOpen,
  }: {
    accounts: CompanyAccount[]
    selected: number | null
    onSelect: (accountId: number) => void
    onOpen: () => void
  } = $props()
</script>

<div class="flex flex-col gap-2.5">
  <span class="sk-label px-1">{m.enterprise_accounts()}</span>

  {#each accounts as account (account.id)}
    {@const active = account.id === selected}
    <button
      type="button"
      class="sk-row sk-focus flex items-center gap-3.5 px-4 py-3.5 text-left"
      class:sk-row--active={active}
      aria-pressed={active}
      onclick={() => onSelect(account.id)}
    >
      <span
        class="sk-tile h-9 w-9 shrink-0 border border-sk-soft bg-sk-quiet"
        class:text-sk-accent={active}
        class:text-sk-muted={!active}
      >
        <Landmark class="h-4 w-4" />
      </span>
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <span class="flex items-center gap-1.5">
          <span class="truncate text-[13.5px] font-medium text-sk">{account.label}</span>
          {#if account.main}
            <Star class="h-3 w-3 shrink-0 fill-current text-sk-accent" />
          {/if}
        </span>
        <span class="sk-mono truncate text-[11px] tracking-[0.1em] text-sk-soft">
          {formatAccountNumber(account.number)}
        </span>
      </div>
      <Amount value={account.balance} size="sm" />
    </button>
  {/each}

  <button
    type="button"
    class="sk-row sk-focus flex items-center gap-3.5 border-dashed px-4 py-3.5 text-left"
    onclick={onOpen}
  >
    <span class="sk-tile h-9 w-9 shrink-0 bg-sk-tint text-sk-accent">
      <Plus class="h-4 w-4" />
    </span>
    <span class="text-[13.5px] font-medium text-sk-body">{m.enterprise_account_open()}</span>
  </button>
</div>
