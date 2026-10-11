<script lang="ts">
  let { name, size = 30 }: { name: string; size?: number } = $props()

  const initials = $derived(
    name
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join(''),
  )
</script>

<span
  class="avatar sk-mono"
  style:width="{size}px"
  style:height="{size}px"
  style:font-size="{Math.round(size * 0.34)}px"
>
  {initials}
</span>

<style>
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 9999px;
    border: 1px solid var(--sk-border);
    background: var(--sk-quiet);
    font-weight: 600;
    color: var(--sk-text-body);
  }
</style>
