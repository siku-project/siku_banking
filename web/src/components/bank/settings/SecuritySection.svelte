<script lang="ts">
  import { ArrowRight, LoaderCircle, Lock, ShieldCheck } from '@lucide/svelte'
  import { push } from 'svelte-spa-router'
  import { toast } from 'svelte-sonner'
  import SettingRow from '@/components/bank/settings/SettingRow.svelte'
  import SettingsSection from '@/components/bank/settings/SettingsSection.svelte'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import { api } from '@/lib/api'
  import { bank } from '@/lib/bank.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { m } from '@/lib/i18n.svelte'
  import { PATHS } from '@/lib/routes'

  let confirming = $state(false)
  let busy = $state(false)

  const active = $derived(bank.cards.filter((card) => card.state === 'active').length)
  const blocked = $derived(bank.cards.filter((card) => card.state === 'blocked').length)

  const blockAll = async (): Promise<void> => {
    busy = true

    const outcome = await api.blockAllCards()

    busy = false
    confirming = false

    if (outcome.ok) {
      toast.success(m.settings_block_all_toast({ count: outcome.count ?? 0 }))
    } else {
      toast.error(reasonMessage(outcome.reason))
    }
  }
</script>

<SettingsSection
  title={m.settings_security_title()}
  description={m.settings_security_text()}
  icon={ShieldCheck}
>
  <SettingRow
    label={m.settings_cards_state()}
    hint={m.settings_cards_state_value({ active, blocked })}
  >
    <button type="button" class="sk-btn sk-btn--ghost !px-4" onclick={() => push(PATHS.accounts)}>
      {m.settings_manage_cards()}
      <ArrowRight class="h-3.5 w-3.5" />
    </button>
  </SettingRow>

  <SettingRow label={m.settings_block_all()} hint={m.settings_block_all_hint()}>
    <button
      type="button"
      class="sk-btn sk-btn--ghost !px-4"
      disabled={active === 0}
      onclick={() => (confirming = true)}
    >
      <Lock class="h-3.5 w-3.5" />
      {m.settings_block_all_action()}
    </button>
  </SettingRow>
</SettingsSection>

<Modal
  bind:open={confirming}
  title={m.settings_block_all()}
  description={m.settings_block_all_confirm_text({ count: active })}
>
  <p class="text-[12.5px] leading-relaxed text-sk-muted">{m.settings_block_all_after()}</p>

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={() => (confirming = false)}>
      {m.common_cancel()}
    </button>
    <button type="button" class="sk-btn sk-btn--primary" disabled={busy} onclick={blockAll}>
      {#if busy}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {/if}
      {m.settings_block_all_action()}
    </button>
  {/snippet}
</Modal>
