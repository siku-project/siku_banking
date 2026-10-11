<script lang="ts">
  let { name, size = 44 }: { name: string; size?: number } = $props()

  const initials = $derived(
    name
      .split(/\s+/)
      .filter((word) => /^[A-Za-zÀ-ÿ]/.test(word))
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join(''),
  )
</script>

<span
  class="mark sk-mono"
  style:width="{size}px"
  style:height="{size}px"
  style:font-size="{Math.round(size * 0.32)}px"
  style:border-radius="{Math.round(size * 0.28)}px"
>
  {initials}
</span>

<style>
  .mark {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--sk-accent-ink);
    background: linear-gradient(150deg, var(--sk-accent-hover) 0%, var(--sk-accent) 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      0 0 0 4px var(--sk-accent-ring),
      0 14px 32px -18px var(--sk-accent-glow);
  }
</style>
