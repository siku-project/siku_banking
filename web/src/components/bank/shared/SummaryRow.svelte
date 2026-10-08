<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    label,
    mono = false,
    children,
  }: { label: string; mono?: boolean; children: Snippet } = $props()
</script>

<div class="flex items-center justify-between gap-6 py-3">
  <span class="text-[13px] text-sk-muted">{label}</span>
  <span class="text-right text-[13px] font-medium text-sk" class:sk-mono={mono}>
    {@render children()}
  </span>
</div>
