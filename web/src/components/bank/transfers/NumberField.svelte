<script lang="ts">
  import { LoaderCircle, Search, UserCheck } from '@lucide/svelte'
  import { isAccountNumber } from '@/lib/api'
  import { formatAccountNumber } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'

  let {
    value,
    holder,
    verifying = false,
    error,
    onInput,
    onVerify,
  }: {
    /** The digits typed so far. */
    value: string
    /** The holder the bank confirmed for these digits, empty until then. */
    holder: string
    verifying?: boolean
    error?: string
    onInput: (value: string) => void
    onVerify: () => void
  } = $props()

  const id = `number-${Math.random().toString(36).slice(2, 8)}`

  const complete = $derived(isAccountNumber(value))
  const verified = $derived(complete && holder !== '')

  const onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' && complete && !verified) {
      event.preventDefault()
      onVerify()
    }
  }
</script>

<div class="flex flex-col gap-2">
  <label for={id} class="sk-label">{m.transfers_number()}</label>

  <div class="flex gap-2">
    <input
      {id}
      class="sk-field sk-mono tracking-[0.18em]"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      spellcheck="false"
      placeholder="0000 0000 0000"
      value={formatAccountNumber(value)}
      oninput={(event) => onInput(event.currentTarget.value)}
      onkeydown={onKeydown}
    />
    <button
      type="button"
      class="sk-btn sk-btn--ghost shrink-0 !px-4"
      disabled={!complete || verified || verifying}
      onclick={onVerify}
    >
      {#if verifying}
        <LoaderCircle class="h-3.5 w-3.5 animate-spin" />
      {:else}
        <Search class="h-3.5 w-3.5" />
      {/if}
      {m.transfers_verify()}
    </button>
  </div>

  {#if verified}
    <span class="flex items-center gap-2 text-[12.5px] text-sk-accent">
      <UserCheck class="h-3.5 w-3.5" />
      {m.transfers_verified({ holder })}
    </span>
  {:else if error}
    <span class="text-xs text-sk-muted">{error}</span>
  {:else}
    <span class="text-xs text-sk-faint">{m.transfers_number_hint()}</span>
  {/if}
</div>
