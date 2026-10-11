<script lang="ts">
  import { Star, User } from '@lucide/svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import { bank, type Account } from '@/lib/bank.svelte'
  import { formatAccountNumber } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'

  let { account }: { account: Account } = $props()

  const active = $derived(bank.selectedAccountId === account.id)
</script>

<button
  type="button"
  class="sk-row sk-focus flex w-full items-center gap-3.5 px-4 py-3.5 text-left"
  class:sk-row--active={active}
  aria-pressed={active}
  onclick={() => bank.select(account.id)}
>
  <span
    class="sk-tile h-9 w-9 shrink-0 border border-sk-soft bg-sk-quiet"
    class:text-sk-accent={active}
    class:text-sk-muted={!active}
  >
    <User class="h-4 w-4" />
  </span>

  <div class="flex min-w-0 flex-1 flex-col gap-0.5">
    <span class="flex items-center gap-1.5">
      <span class="truncate text-[13.5px] font-medium text-sk">{account.label}</span>
      {#if account.main}
        <Star class="h-3 w-3 shrink-0 fill-current text-sk-accent" aria-label={m.accounts_main()} />
      {/if}
    </span>
    <span class="sk-mono truncate text-[11px] tracking-[0.1em] text-sk-soft">
      {formatAccountNumber(account.number)}
    </span>
  </div>

  <Amount
    value={account.balance}
    size="sm"
    class={account.state === 'frozen' ? 'text-sk-muted' : ''}
  />
</button>
