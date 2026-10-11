<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import MemberPicker from '@/components/bank/enterprise/shared/MemberPicker.svelte'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import { enterpriseApi } from '@/lib/enterprise-api'
  import { settleAction } from '@/lib/enterprise-actions'
  import { enterprise, type AccessLevel, type CompanyAccount } from '@/lib/enterprise.svelte'
  import { m } from '@/lib/i18n.svelte'

  let {
    open = $bindable(false),
    account,
    companyId,
  }: { open?: boolean; account: CompanyAccount; companyId: number } = $props()

  let memberId = $state<number | null>(null)
  let level = $state<AccessLevel>('view')
  let busy = $state(false)

  const candidates = $derived(
    enterprise.members.filter(
      (member) => !account.access.some((entry) => entry.memberId === member.id),
    ),
  )

  $effect(() => {
    if (open) {
      memberId = null
      level = 'view'
    }
  })

  const submit = async (): Promise<void> => {
    if (memberId === null || busy) {
      return
    }

    busy = true

    const done = await settleAction(
      enterpriseApi.setAccess({ companyId, accountId: account.id, memberId, level }),
      m.enterprise_access_saved(),
    )

    busy = false

    if (done) {
      open = false
    }
  }
</script>

<Modal
  bind:open
  title={m.enterprise_access_grant()}
  description={m.enterprise_access_grant_text({ label: account.label })}
>
  <MemberPicker bind:selected={memberId} members={candidates} label={m.enterprise_member()} />

  <div class="flex flex-col gap-2">
    <span class="sk-label">{m.enterprise_access_level()}</span>
    <div class="grid grid-cols-2 gap-2">
      <button
        type="button"
        class="level sk-focus"
        class:is-active={level === 'view'}
        onclick={() => (level = 'view')}
      >
        <span class="text-[13px] font-medium text-sk">{m.enterprise_access_view()}</span>
        <span class="text-[11.5px] text-sk-soft">{m.enterprise_access_view_hint()}</span>
      </button>
      <button
        type="button"
        class="level sk-focus"
        class:is-active={level === 'spend'}
        onclick={() => (level = 'spend')}
      >
        <span class="text-[13px] font-medium text-sk">{m.enterprise_access_spend()}</span>
        <span class="text-[11.5px] text-sk-soft">{m.enterprise_access_spend_hint()}</span>
      </button>
    </div>
  </div>

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={() => (open = false)}>
      {m.common_cancel()}
    </button>
    <button
      type="button"
      class="sk-btn sk-btn--primary"
      disabled={memberId === null || busy}
      onclick={submit}
    >
      {#if busy}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {/if}
      {m.enterprise_access_grant_confirm()}
    </button>
  {/snippet}
</Modal>

<style>
  .level {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 14px;
    border-radius: var(--sk-radius-row);
    border: 1px solid var(--sk-border-soft);
    background: var(--sk-surface);
    text-align: left;
    transition:
      border-color 0.16s ease,
      background 0.16s ease;
  }

  .level:hover {
    border-color: var(--sk-border-hover);
  }

  .level.is-active {
    border-color: var(--sk-accent-border);
    background: var(--sk-surface-active);
  }
</style>
