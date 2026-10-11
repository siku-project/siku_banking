<script lang="ts">
  import { Check } from '@lucide/svelte'

  let { checked = $bindable(false), label }: { checked?: boolean; label: string } = $props()
</script>

<button
  type="button"
  class="check sk-focus flex items-start gap-3.5 text-left"
  class:is-checked={checked}
  role="checkbox"
  aria-checked={checked}
  onclick={() => (checked = !checked)}
>
  <span class="check__box">
    {#if checked}
      <Check class="h-3.5 w-3.5" strokeWidth={3} />
    {/if}
  </span>
  <span class="text-[13px] leading-relaxed text-sk-body">{label}</span>
</button>

<style>
  .check {
    border-radius: var(--sk-radius-control);
  }

  .check__box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 1px;
    border-radius: 6px;
    border: 1px solid var(--sk-border);
    background: var(--sk-field);
    color: var(--sk-accent-ink);
    transition:
      background 0.16s ease,
      border-color 0.16s ease;
  }

  .check:hover .check__box {
    border-color: var(--sk-border-hover);
  }

  .is-checked .check__box {
    border-color: var(--sk-accent-strong);
    background: var(--sk-accent);
    box-shadow: 0 0 14px -4px var(--sk-accent-glow);
  }
</style>
