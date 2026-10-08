<script lang="ts">
  import { Landmark } from '@lucide/svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import type { CompanyAccount } from '@/lib/enterprise.svelte'
  import { formatAccountNumber } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'

  let { accounts }: { accounts: CompanyAccount[] } = $props()
</script>

<GlassCard padding="sm" class="flex flex-col gap-2">
  <span class="sk-title px-3 pt-1 text-[15px]">{m.enterprise_accounts()}</span>

  <div class="flex flex-col">
    {#each accounts as account, index (account.id)}
      {#if index > 0}
        <div class="sk-rule mx-3"></div>
      {/if}
      <div class="flex items-center gap-3 px-3 py-3">
        <span class="sk-tile h-9 w-9 shrink-0 border border-sk-soft bg-sk-quiet text-sk-muted">
          <Landmark class="h-4 w-4" />
        </span>
        <div class="flex min-w-0 flex-1 flex-col gap-0.5">
          <span class="truncate text-[13px] font-medium text-sk">{account.label}</span>
          <span class="sk-mono truncate text-[11px] tracking-[0.1em] text-sk-soft">
            {formatAccountNumber(account.number)}
          </span>
        </div>
        <Amount value={account.balance} size="sm" />
      </div>
    {/each}
  </div>
</GlassCard>
