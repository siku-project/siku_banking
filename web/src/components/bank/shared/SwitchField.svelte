<script lang="ts">
  import { Switch } from '$lib/components/ui/switch'

  let {
    checked = $bindable(false),
    label,
    hint,
  }: { checked?: boolean; label: string; hint?: string } = $props()

  const id = `switch-${Math.random().toString(36).slice(2, 8)}`
</script>

<div class="flex items-center justify-between gap-6">
  <div class="flex flex-col gap-0.5">
    <label for={id} class="text-sm font-medium text-sk">{label}</label>
    {#if hint}
      <span class="text-xs text-sk-faint">{hint}</span>
    {/if}
  </div>
  <Switch {id} bind:checked />
</div>
