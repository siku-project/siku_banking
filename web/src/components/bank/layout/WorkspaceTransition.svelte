<script lang="ts">
  import { Building2, UserRound } from '@lucide/svelte'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { duration } from '@/lib/motion'
  import { session } from '@/lib/session.svelte'
  import { SWITCH_TIMINGS, workspace } from '@/lib/workspace.svelte'

  const toEnterprise = $derived(workspace.target === 'enterprise')
  const title = $derived(toEnterprise ? m.switch_enterprise_title() : m.switch_personal_title())
  const subtitle = $derived(toEnterprise ? (enterprise.company?.name ?? '') : session.fullName)
</script>

<div
  class="veil"
  data-phase={workspace.phase}
  style:--cover-ms="{duration(SWITCH_TIMINGS.cover)}ms"
  style:--hold-ms="{duration(SWITCH_TIMINGS.hold)}ms"
  style:--reveal-ms="{duration(SWITCH_TIMINGS.reveal)}ms"
  aria-hidden={!workspace.switching}
>
  <div class="veil__sheen"></div>
  <div class="veil__halo"></div>

  {#if workspace.switching}
    <div class="stage">
      <span class="stage__mark">
        {#if toEnterprise}
          <Building2 class="h-7 w-7" strokeWidth={1.6} />
        {:else}
          <UserRound class="h-7 w-7" strokeWidth={1.6} />
        {/if}
      </span>

      <div class="stage__text">
        <span class="sk-label">{m.switch_label()}</span>
        <span class="stage__title">{title}</span>
        {#if subtitle}
          <span class="stage__subtitle">{subtitle}</span>
        {/if}
      </div>

      <span class="stage__progress">
        <span class="stage__fill"></span>
      </span>
    </div>
  {/if}
</div>

<style>
  .veil {
    position: absolute;
    inset: 0;
    z-index: 40;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: inherit;
    background: var(--sk-panel);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--cover-ms) cubic-bezier(0.4, 0, 0.2, 1);
  }

  .veil[data-phase='cover'],
  .veil[data-phase='hold'] {
    opacity: 1;
    pointer-events: auto;
  }

  .veil[data-phase='reveal'] {
    opacity: 0;
    transition-duration: var(--reveal-ms);
  }

  .veil__halo {
    position: absolute;
    width: 620px;
    height: 620px;
    border-radius: 9999px;
    background: radial-gradient(circle, var(--sk-accent-haze) 0%, transparent 62%);
    opacity: 0;
    transform: scale(0.7);
    transition:
      opacity var(--hold-ms) ease,
      transform var(--hold-ms) cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .veil[data-phase='hold'] .veil__halo {
    opacity: 1;
    transform: scale(1);
  }

  .veil__sheen {
    position: absolute;
    inset: -20%;
    background: linear-gradient(
      105deg,
      transparent 38%,
      rgba(255, 255, 255, 0.05) 48%,
      transparent 58%
    );
    transform: translateX(-60%);
  }

  .veil[data-phase='hold'] .veil__sheen {
    animation: sweep var(--hold-ms) cubic-bezier(0.45, 0, 0.2, 1) forwards;
  }

  .stage {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
    text-align: center;
  }

  .stage__mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 76px;
    height: 76px;
    border-radius: 22px;
    border: 1px solid var(--sk-accent-border);
    background: var(--sk-glass-strong);
    color: var(--sk-accent);
    box-shadow:
      inset 0 1px 0 var(--sk-glass-highlight),
      0 0 0 8px var(--sk-accent-ring),
      0 24px 60px -24px var(--sk-accent-glow);
    opacity: 0;
    transform: translateY(8px) scale(0.92);
  }

  .stage__text {
    display: flex;
    flex-direction: column;
    gap: 8px;
    opacity: 0;
    transform: translateY(8px);
  }

  .veil[data-phase='hold'] .stage__mark,
  .veil[data-phase='hold'] .stage__text {
    animation: rise 520ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  .veil[data-phase='hold'] .stage__text {
    animation-delay: 90ms;
  }

  .veil[data-phase='reveal'] .stage__mark,
  .veil[data-phase='reveal'] .stage__text {
    opacity: 1;
    transform: none;
  }

  .stage__title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--sk-text);
  }

  .stage__subtitle {
    font-size: 14px;
    color: var(--sk-text-muted);
  }

  .stage__progress {
    display: block;
    width: 180px;
    height: 2px;
    overflow: hidden;
    border-radius: 9999px;
    background: var(--sk-rule);
  }

  .stage__fill {
    display: block;
    width: 0;
    height: 100%;
    border-radius: inherit;
    background: var(--sk-accent);
    box-shadow: 0 0 10px var(--sk-accent-glow);
  }

  .veil[data-phase='hold'] .stage__fill {
    animation: fill var(--hold-ms) cubic-bezier(0.65, 0, 0.35, 1) forwards;
  }

  .veil[data-phase='reveal'] .stage__fill {
    width: 100%;
  }

  @keyframes rise {
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes fill {
    to {
      width: 100%;
    }
  }

  @keyframes sweep {
    to {
      transform: translateX(60%);
    }
  }
</style>
