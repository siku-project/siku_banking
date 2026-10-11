<script lang="ts">
  import type { Snippet } from 'svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'

  let {
    label,
    hint,
    icon,
    children,
  }: { label: string; hint?: string; icon?: Snippet; children: Snippet } = $props()
</script>

<GlassCard padding="sm" class="flex items-center gap-4">
  {#if icon}
    <span class="sk-tile h-10 w-10 shrink-0 bg-sk-tint text-sk-accent">
      {@render icon()}
    </span>
  {/if}
  <div class="flex min-w-0 flex-col gap-0.5">
    <span class="sk-label">{label}</span>
    <span class="truncate">{@render children()}</span>
    {#if hint}
      <span class="text-xs text-sk-faint">{hint}</span>
    {/if}
  </div>
</GlassCard>
