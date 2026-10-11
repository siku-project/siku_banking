<script lang="ts">
  import { Users, WalletCards, Hash, type LucideIcon } from '@lucide/svelte'
  import AccountPicker from '@/components/bank/transfers/AccountPicker.svelte'
  import NumberField from '@/components/bank/transfers/NumberField.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { formatAccountNumber } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { transfer, type TransferTarget } from '@/lib/transfer.svelte'

  interface Tab {
    key: TransferTarget
    label: () => string
    icon: LucideIcon
  }

  const tabs: Tab[] = [
    { key: 'mine', label: () => m.transfers_target_mine(), icon: WalletCards },
    { key: 'beneficiary', label: () => m.transfers_target_beneficiary(), icon: Users },
    { key: 'number', label: () => m.transfers_target_number(), icon: Hash },
  ]

  const others = $derived(bank.accounts.filter((account) => account.id !== transfer.fromAccountId))
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <span class="sk-label">{m.transfers_to()}</span>
    <div class="flex gap-1.5">
      {#each tabs as tab (tab.key)}
        <button
          type="button"
          class="sk-chip px-3 py-1.5 text-xs"
          class:sk-chip--active={transfer.target === tab.key}
          onclick={() => transfer.setTarget(tab.key)}
        >
          <tab.icon class="h-3.5 w-3.5" />
          {tab.label()}
        </button>
      {/each}
    </div>
  </div>

  {#if transfer.target === 'mine'}
    {#if others.length > 0}
      <AccountPicker
        accounts={others}
        selected={transfer.toAccountId}
        onPick={(id) => transfer.pickMine(id)}
      />
    {:else}
      <p class="text-[13px] text-sk-muted">{m.transfers_mine_empty()}</p>
    {/if}
  {:else if transfer.target === 'beneficiary'}
    {#if bank.beneficiaries.length > 0}
      <div class="flex flex-col gap-2">
        {#each bank.beneficiaries as entry (entry.id)}
          {@const active = transfer.beneficiaryId === entry.id}
          <button
            type="button"
            class="sk-row sk-focus flex items-center gap-3.5 px-4 py-3 text-left"
            class:sk-row--active={active}
            aria-pressed={active}
            onclick={() => transfer.pickBeneficiary(entry.id)}
          >
            <span class="sk-tile h-9 w-9 shrink-0 border border-sk-soft bg-sk-quiet text-sk-muted">
              <Users class="h-4 w-4" />
            </span>
            <div class="flex min-w-0 flex-1 flex-col gap-0.5">
              <span class="truncate text-[13px] font-medium text-sk">{entry.label}</span>
              <span class="truncate text-[11.5px] text-sk-soft">{entry.holder}</span>
            </div>
            <span class="sk-mono text-[11px] tracking-[0.1em] text-sk-faint">
              {formatAccountNumber(entry.number)}
            </span>
          </button>
        {/each}
      </div>
    {:else}
      <p class="text-[13px] text-sk-muted">{m.transfers_beneficiary_empty()}</p>
    {/if}
  {:else}
    <NumberField
      value={transfer.typedNumber}
      holder={transfer.holder}
      verifying={transfer.verifying}
      error={transfer.error ? reasonMessage(transfer.error) : undefined}
      onInput={(value) => transfer.setTypedNumber(value)}
      onVerify={() => transfer.verify()}
    />
  {/if}
</div>
