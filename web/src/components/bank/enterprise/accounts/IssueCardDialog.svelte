<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import MemberPicker from '@/components/bank/enterprise/shared/MemberPicker.svelte'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import AmountField from '@/components/bank/transfers/AmountField.svelte'
  import { enterpriseApi } from '@/lib/enterprise-api'
  import { settleAction } from '@/lib/enterprise-actions'
  import { enterprise, type CompanyAccount } from '@/lib/enterprise.svelte'
  import { formatAmount } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'

  const DEFAULT_LIMIT = '1500'

  let {
    open = $bindable(false),
    account,
    companyId,
  }: { open?: boolean; account: CompanyAccount; companyId: number } = $props()

  let memberId = $state<number | null>(null)
  let limitText = $state(DEFAULT_LIMIT)
  let busy = $state(false)

  const limit = $derived(Number.parseInt(limitText, 10) || 0)
  const candidates = $derived(
    enterprise.members.filter((member) => enterprise.cardOf(member.id) === null),
  )

  $effect(() => {
    if (open) {
      memberId = null
      limitText = DEFAULT_LIMIT
    }
  })

  const submit = async (): Promise<void> => {
    if (memberId === null || limit <= 0 || busy) {
      return
    }

    busy = true

    const done = await settleAction(
      enterpriseApi.issueCard({ companyId, accountId: account.id, memberId, limit }),
      m.enterprise_cards_issued(),
    )

    busy = false

    if (done) {
      open = false
    }
  }
</script>

<Modal
  bind:open
  title={m.enterprise_cards_issue()}
  description={m.enterprise_cards_issue_text({ label: account.label })}
  width={480}
>
  <MemberPicker bind:selected={memberId} members={candidates} label={m.enterprise_member()} />
  <AmountField
    value={limitText}
    available={formatAmount(limit, locale.current)}
    hint={m.enterprise_cards_limit_hint()}
    onInput={(value) => (limitText = value.replace(/\D/g, '').slice(0, 7))}
  />

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={() => (open = false)}>
      {m.common_cancel()}
    </button>
    <button
      type="button"
      class="sk-btn sk-btn--primary"
      disabled={memberId === null || limit <= 0 || busy}
      onclick={submit}
    >
      {#if busy}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {/if}
      {m.enterprise_cards_issue_confirm()}
    </button>
  {/snippet}
</Modal>
