<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import Modal from '@/components/bank/shared/Modal.svelte'
  import TextField from '@/components/bank/shared/TextField.svelte'
  import { isLabel } from '@/lib/api'
  import { m } from '@/lib/i18n.svelte'

  const LABEL_MAX = 40

  let {
    open = $bindable(false),
    title,
    description,
    label,
    initial = '',
    confirm,
    onSubmit,
  }: {
    open?: boolean
    title: string
    description: string
    label: string
    initial?: string
    confirm: string
    /** Answers whether the name was taken. */
    onSubmit: (value: string) => Promise<boolean>
  } = $props()

  let value = $state('')
  let busy = $state(false)

  const valid = $derived(isLabel(value, LABEL_MAX) && value.trim() !== initial)

  $effect(() => {
    if (open) {
      value = initial
    }
  })

  const submit = async (): Promise<void> => {
    if (!valid || busy) {
      return
    }

    busy = true

    const done = await onSubmit(value.trim())

    busy = false

    if (done) {
      open = false
    }
  }
</script>

<Modal bind:open {title} {description}>
  <TextField bind:value {label} maxlength={LABEL_MAX} autofocus />

  {#snippet footer()}
    <button type="button" class="sk-btn sk-btn--ghost" onclick={() => (open = false)}>
      {m.common_cancel()}
    </button>
    <button type="button" class="sk-btn sk-btn--primary" disabled={!valid || busy} onclick={submit}>
      {#if busy}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {/if}
      {confirm}
    </button>
  {/snippet}
</Modal>
