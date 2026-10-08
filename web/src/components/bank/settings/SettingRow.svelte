<script lang="ts">
  import type { Snippet } from 'svelte'

  let { label, hint, children }: { label: string; hint?: string; children: Snippet } = $props()
</script>

<div class="flex items-center justify-between gap-8 py-4">
  <div class="flex min-w-0 flex-col gap-0.5">
    <span class="text-[13.5px] font-medium text-sk">{label}</span>
    {#if hint}
      <span class="text-[12px] leading-relaxed text-sk-soft">{hint}</span>
    {/if}
  </div>
  <div class="flex shrink-0 items-center gap-2">
    {@render children()}
  </div>
</div>
