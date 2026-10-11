<script lang="ts">
  import type { Component, Snippet } from 'svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'

  let {
    title,
    description,
    icon: Icon,
    children,
  }: { title: string; description: string; icon: Component; children: Snippet } = $props()
</script>

<GlassCard padding="lg" class="flex flex-col gap-2">
  <div class="flex items-start gap-4 pb-2">
    <span class="sk-tile h-10 w-10 shrink-0 bg-sk-tint text-sk-accent">
      <Icon class="h-4 w-4" />
    </span>
    <div class="flex flex-col gap-1">
      <span class="sk-title text-[16px]">{title}</span>
      <span class="text-[12.5px] leading-relaxed text-sk-muted">{description}</span>
    </div>
  </div>

  <div class="flex flex-col divide-y divide-[var(--sk-rule)]">
    {@render children()}
  </div>
</GlassCard>
