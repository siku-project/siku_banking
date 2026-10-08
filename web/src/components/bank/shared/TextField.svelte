<script lang="ts">
  let {
    value = $bindable(''),
    label,
    hint,
    placeholder = '',
    maxlength,
    autofocus = false,
    disabled = false,
    oninput,
  }: {
    value?: string
    label: string
    hint?: string
    placeholder?: string
    maxlength?: number
    autofocus?: boolean
    disabled?: boolean
    oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void
  } = $props()

  const id = `field-${Math.random().toString(36).slice(2, 8)}`

  let input = $state<HTMLInputElement | null>(null)

  $effect(() => {
    if (autofocus) {
      input?.focus()
    }
  })
</script>

<div class="flex flex-col gap-2">
  <label for={id} class="sk-label">{label}</label>
  <input
    {id}
    bind:this={input}
    bind:value
    class="sk-field"
    type="text"
    autocomplete="off"
    spellcheck="false"
    {placeholder}
    {maxlength}
    {disabled}
    {oninput}
  />
  {#if hint}
    <span class="text-xs text-sk-faint">{hint}</span>
  {/if}
</div>
