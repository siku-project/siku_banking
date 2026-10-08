<script lang="ts">
  import { Plus, Send, Trash2, Users } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import AddBeneficiaryDialog from '@/components/bank/transfers/AddBeneficiaryDialog.svelte'
  import { api } from '@/lib/api'
  import { bank, type Beneficiary } from '@/lib/bank.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { formatAccountNumber } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { transfer } from '@/lib/transfer.svelte'

  let adding = $state(false)
  let busyId = $state<number | null>(null)

  const remove = async (entry: Beneficiary): Promise<void> => {
    busyId = entry.id

    const outcome = await api.removeBeneficiary({ beneficiaryId: entry.id })

    busyId = null

    if (outcome.ok) {
      toast.success(m.beneficiaries_removed_toast({ label: entry.label }))
    } else {
      toast.error(reasonMessage(outcome.reason))
    }
  }
</script>

<GlassCard padding="sm" class="flex flex-col gap-3">
  <div class="flex items-center justify-between px-3 pt-1">
    <span class="sk-title text-[15px]">{m.beneficiaries_title()}</span>
    <span class="text-[11px] text-sk-faint">
      {m.accounts_limit({ count: bank.beneficiaries.length, max: bank.limits.beneficiaries })}
    </span>
  </div>

  <div class="flex flex-col gap-1.5">
    {#each bank.beneficiaries as entry (entry.id)}
      <div
        class="group flex items-center gap-3 rounded-[var(--sk-radius-row)] px-3 py-2.5 transition-colors hover:bg-sk-hover"
      >
        <span class="sk-tile h-9 w-9 shrink-0 border border-sk-soft bg-sk-quiet text-sk-muted">
          <Users class="h-4 w-4" />
        </span>
        <div class="flex min-w-0 flex-1 flex-col gap-0.5">
          <span class="truncate text-[13px] font-medium text-sk">{entry.label}</span>
          <span class="truncate text-[11px] text-sk-soft">
            {entry.holder} · <span class="sk-mono">{formatAccountNumber(entry.number)}</span>
          </span>
        </div>
        <div class="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            class="sk-tile sk-tile--interactive sk-focus h-8 w-8"
            aria-label={m.beneficiaries_send()}
            title={m.beneficiaries_send()}
            onclick={() => transfer.pickBeneficiary(entry.id)}
          >
            <Send class="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            class="sk-tile sk-tile--interactive sk-focus h-8 w-8"
            aria-label={m.beneficiaries_remove()}
            title={m.beneficiaries_remove()}
            disabled={busyId === entry.id}
            onclick={() => remove(entry)}
          >
            <Trash2 class="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    {:else}
      <p class="px-3 py-4 text-[12.5px] text-sk-faint">{m.beneficiaries_empty()}</p>
    {/each}
  </div>

  <button
    type="button"
    class="sk-btn sk-btn--ghost mx-3 mb-2"
    disabled={!bank.canAddBeneficiary}
    onclick={() => (adding = true)}
  >
    <Plus class="h-3.5 w-3.5" />
    {m.beneficiaries_add()}
  </button>
</GlassCard>

<AddBeneficiaryDialog bind:open={adding} />
