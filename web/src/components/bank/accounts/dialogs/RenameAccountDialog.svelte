<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import TextField from '@/components/bank/shared/TextField.svelte'
  import { api, isLabel } from '@/lib/api'
  import { bank, type Account } from '@/lib/bank.svelte'
  import { reasonMessage } from '@/lib/errors'
  import { m } from '@/lib/i18n.svelte'

  let { open = $bindable(false), account }: { open?: boolean; account: Account } = $props()

  let label = $state('')
  let busy = $state(false)

  const valid = $derived(isLabel(label, bank.limits.labelLength) && label.trim() !== account.label)

  $effect(() => {
    if (open) {
      label = account.label
    }
  })

  const submit = async (): Promise<void> => {
    if (!valid || busy) {
      return
    }

    busy = true

    const outcome = await api.renameAccount({ accountId: account.id, label: label.trim() })

    busy = false

    if (!outcome.ok) {
      toast.error(reasonMessage(outcome.reason))
      return
    }

    toast.success(m.accounts_renamed_toast())
    open = false
  }
</script>

<Modal bind:open title={m.accounts_rename()} description={m.accounts_rename_text()}>
  <TextField
    bind:value={label}
    label={m.accounts_label()}
    hint={m.accounts_label_hint({ max: bank.limits.labelLength })}
    maxlength={bank.limits.labelLength}
    autofocus
  />

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={() => (open = false)}>
      {m.common_cancel()}
    </button>
    <button type="button" class="sk-btn sk-btn--primary" disabled={!valid || busy} onclick={submit}>
      {#if busy}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {/if}
      {m.common_save()}
    </button>
  {/snippet}
</Modal>
