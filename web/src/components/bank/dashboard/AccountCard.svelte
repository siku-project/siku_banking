<script lang="ts">
  import { User } from '@lucide/svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import StateBadge from '@/components/bank/shared/StateBadge.svelte'
  import { bank, type Account } from '@/lib/bank.svelte'
  import { formatAccountNumber } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'

  let { account }: { account: Account } = $props()

  const active = $derived(bank.selectedAccountId === account.id)
</script>

<button
  type="button"
  class="sk-glass sk-glass--hover sk-focus flex flex-col gap-5 p-5 text-left"
  class:sk-glass--active={active}
  aria-pressed={active}
  onclick={() => bank.select(active ? null : account.id)}
>
  <div class="flex items-start justify-between gap-3">
    <div class="flex items-center gap-3">
      <span class="sk-tile h-9 w-9 border border-sk-soft bg-sk-quiet text-sk-muted">
        <User class="h-4 w-4" />
      </span>
      <div class="flex flex-col leading-tight">
        <span class="text-sm font-medium text-sk">{account.label}</span>
        <span class="text-[11px] text-sk-soft">{m.accounts_personal()}</span>
      </div>
    </div>
    <StateBadge state={account.state} />
  </div>

  <div class="flex flex-col gap-1">
    <span class="sk-mono text-xs tracking-[0.12em] text-sk-soft">
      {formatAccountNumber(account.number)}
    </span>
    <Amount value={account.balance} size="lg" />
  </div>
</button>
