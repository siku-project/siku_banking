<script lang="ts">
  import { m } from '@/lib/i18n.svelte'
</script>

<div class="flex flex-col items-center gap-7">
  <div class="mark">
    <span class="mark__ring"></span>
    <span class="mark__core">
      <span class="mark__text">SIKU</span>
    </span>
  </div>

  <div class="flex flex-col items-center gap-2">
    <span class="sk-brand">{m.common_bank_name()}</span>
    <span class="text-xs text-sk-muted">{m.intro_loading_status()}</span>
  </div>
</div>

<style>
  .mark {
    position: relative;
    width: 96px;
    height: 96px;
  }

  .mark__ring {
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    padding: 2px;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      var(--sk-accent-tint) 200deg,
      var(--sk-accent) 360deg
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    filter: drop-shadow(0 0 8px var(--sk-accent-glow));
    animation: spin 1.1s linear infinite;
  }

  .mark__core {
    position: absolute;
    inset: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid var(--sk-glass-border);
    background: var(--sk-glass);
    box-shadow: inset 0 1px 0 var(--sk-glass-highlight);
  }

  .mark__text {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.22em;
    padding-left: 0.22em;
    color: var(--sk-text);
    animation: shimmer 1.6s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes shimmer {
    0%,
    100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
</style>
