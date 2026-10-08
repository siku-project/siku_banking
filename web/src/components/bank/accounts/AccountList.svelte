<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import AccountListItem from '@/components/bank/accounts/AccountListItem.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { m } from '@/lib/i18n.svelte'

  let { onOpen }: { onOpen: () => void } = $props()
</script>

<div class="flex flex-col gap-6">
  <section class="flex flex-col gap-2.5">
    <div class="flex items-center justify-between px-1">
      <span class="sk-label">{m.accounts_section_mine()}</span>
      <span class="text-[11px] text-sk-faint">
        {m.accounts_limit({ count: bank.accounts.length, max: bank.limits.accounts })}
      </span>
    </div>

    {#each bank.accounts as account (account.id)}
      <AccountListItem {account} />
    {/each}

    <button
      type="button"
      class="sk-row sk-focus flex items-center gap-3.5 border-dashed px-4 py-3.5 text-left disabled:cursor-not-allowed disabled:opacity-50"
      disabled={!bank.canOpenAccount}
      onclick={onOpen}
    >
      <span class="sk-tile h-9 w-9 shrink-0 bg-sk-tint text-sk-accent">
        <Plus class="h-4 w-4" />
      </span>
      <span class="text-[13.5px] font-medium text-sk-body">{m.accounts_open()}</span>
    </button>
  </section>
</div>
