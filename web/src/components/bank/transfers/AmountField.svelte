<script lang="ts">
  import { m } from '@/lib/i18n.svelte'

  let {
    value,
    available,
    hint,
    invalid = false,
    onInput,
  }: {
    /** The digits typed so far. */
    value: string
    /** What the sender may spend, shown under the field. */
    available: string
    hint?: string
    invalid?: boolean
    onInput: (value: string) => void
  } = $props()

  const id = `amount-${Math.random().toString(36).slice(2, 8)}`
</script>

<div class="flex flex-col gap-2">
  <label for={id} class="sk-label">{m.transfers_amount()}</label>

  <div class="amount sk-field flex items-center gap-3" class:is-invalid={invalid}>
    <span class="sk-mono text-[22px] font-semibold text-sk-soft">$</span>
    <input
      {id}
      class="sk-mono min-w-0 flex-1 bg-transparent text-[26px] font-semibold tracking-[-0.02em] text-sk outline-none placeholder:text-sk-faint"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      placeholder="0"
      {value}
      oninput={(event) => onInput(event.currentTarget.value)}
    />
  </div>

  <span class="text-xs" class:text-sk-faint={!invalid} class:text-sk-muted={invalid}>
    {hint ?? m.transfers_available({ amount: available })}
  </span>
</div>

<style>
  .amount {
    padding: 8px 16px;
  }

  .amount:focus-within {
    border-color: var(--sk-accent-strong);
    background: var(--sk-field-focus);
    box-shadow: 0 0 0 3px var(--sk-accent-ring);
  }

  .amount.is-invalid {
    border-color: var(--sk-border-hover);
  }
</style>
