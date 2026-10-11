<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils'

  let {
    class: className,
    hover = false,
    active = false,
    padding = 'md',
    children,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & {
    hover?: boolean
    active?: boolean
    padding?: 'none' | 'sm' | 'md' | 'lg'
    children: Snippet
  } = $props()

  const PADDING = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-7',
  } as const
</script>

<div
  class={cn(
    'sk-glass',
    hover && 'sk-glass--hover',
    active && 'sk-glass--active',
    PADDING[padding],
    className,
  )}
  {...restProps}
>
  {@render children()}
</div>
