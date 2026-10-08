<script lang="ts">
  import { Asterisk } from '@lucide/svelte'
  import { PIN_LENGTH } from '@/lib/api'

  let {
    value = $bindable(''),
    label,
    hint,
    invalid = false,
    autofocus = false,
  }: {
    value?: string
    label: string
    hint?: string
    invalid?: boolean
    autofocus?: boolean
  } = $props()

  const id = `pin-${Math.random().toString(36).slice(2, 8)}`
  const slots = Array.from({ length: PIN_LENGTH }, (_, index) => index)

  let input = $state<HTMLInputElement | null>(null)
  let focused = $state(false)

  const cursor = $derived(Math.min(value.length, PIN_LENGTH - 1))

  const onInput = (event: Event): void => {
    const target = event.currentTarget as HTMLInputElement

    value = target.value.replace(/\D/g, '').slice(0, PIN_LENGTH)
    target.value = value
  }

  $effect(() => {
    if (autofocus) {
      input?.focus()
    }
  })
</script>

<div class="flex flex-col gap-2.5">
  <label for={id} class="sk-label">{label}</label>

  <div class="relative flex gap-2.5" class:is-invalid={invalid}>
    {#each slots as index (index)}
      <span
        class="slot sk-mono"
        class:is-filled={index < value.length}
        class:is-cursor={focused && index === cursor && value.length < PIN_LENGTH}
      >
        {#if index < value.length}
          <Asterisk class="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden="true" />
        {/if}
      </span>
    {/each}

    <input
      {id}
      bind:this={input}
      class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      type="password"
      inputmode="numeric"
      autocomplete="off"
      maxlength={PIN_LENGTH}
      {value}
      oninput={onInput}
      onfocus={() => (focused = true)}
      onblur={() => (focused = false)}
    />
  </div>

  {#if hint}
    <span class="text-xs" class:text-sk-faint={!invalid} class:text-sk-muted={invalid}>{hint}</span>
  {/if}
</div>

<style>
  .slot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 56px;
    border-radius: var(--sk-radius-control);
    border: 1px solid var(--sk-border);
    background: var(--sk-field);
    color: var(--sk-text);
    transition:
      border-color 0.16s ease,
      box-shadow 0.16s ease,
      background 0.16s ease;
  }

  .slot.is-filled {
    border-color: var(--sk-accent-border);
  }

  .slot.is-cursor {
    border-color: var(--sk-accent-strong);
    background: var(--sk-field-focus);
    box-shadow: 0 0 0 3px var(--sk-accent-ring);
  }

  .is-invalid .slot {
    border-color: var(--sk-border-hover);
  }
</style>
