<script lang="ts">
  import type { Snippet } from 'svelte'

  let { label, onclick, children }: { label: string; onclick: () => void; children: Snippet } =
    $props()
</script>

<button type="button" class="icon-button sk-focus" aria-label={label} title={label} {onclick}>
  {@render children()}
</button>

<style>
  .icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--sk-radius-control);
    border: 1px solid transparent;
    color: var(--sk-text-muted);
    transition:
      background 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease,
      transform 0.16s ease;
  }

  .icon-button:hover {
    background: var(--sk-hover);
    border-color: var(--sk-border-soft);
    color: var(--sk-text);
  }

  .icon-button:active {
    transform: scale(0.96);
  }
</style>
