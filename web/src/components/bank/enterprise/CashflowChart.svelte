<script lang="ts">
  import Amount from '@/components/bank/shared/Amount.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import type { CompanyPoint } from '@/lib/enterprise.svelte'
  import { formatDate } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'

  let { points }: { points: CompanyPoint[] } = $props()

  const HEIGHT = 220
  const TOP = 18
  const BOTTOM = 30
  const GRID_LINES = 4
  const LABELS = 4

  let width = $state(0)
  let hovered = $state<number | null>(null)

  const bounds = $derived.by(() => {
    const values = points.map((point) => point.balance)
    const low = Math.min(...values)
    const high = Math.max(...values)
    const margin = (high - low) * 0.12 || Math.max(1, Math.abs(high) * 0.1)

    return { low: low - margin, high: high + margin }
  })

  const x = (index: number): number =>
    points.length < 2 ? width / 2 : (index / (points.length - 1)) * width

  const y = (value: number): number => {
    const span = bounds.high - bounds.low || 1

    return TOP + (1 - (value - bounds.low) / span) * (HEIGHT - TOP - BOTTOM)
  }

  const line = $derived(
    points
      .map((point, index) => `${index === 0 ? 'M' : 'L'}${x(index)},${y(point.balance)}`)
      .join(' '),
  )

  const area = $derived(
    points.length > 0
      ? `${line} L${x(points.length - 1)},${HEIGHT - BOTTOM} L0,${HEIGHT - BOTTOM} Z`
      : '',
  )

  const labels = $derived(
    points.length === 0
      ? []
      : Array.from({ length: LABELS }, (_, step) =>
          Math.round((step / (LABELS - 1)) * (points.length - 1)),
        ),
  )

  const active = $derived(hovered === null ? null : (points[hovered] ?? null))

  const move = (event: PointerEvent): void => {
    const box = (event.currentTarget as SVGElement).getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width))

    hovered = Math.round(ratio * (points.length - 1))
  }

  const tooltipLeft = $derived(
    hovered === null ? 0 : Math.min(Math.max(x(hovered), 90), Math.max(90, width - 90)),
  )
</script>

<GlassCard padding="md" class="flex flex-col gap-4">
  <div class="flex items-start justify-between gap-6">
    <div class="flex flex-col gap-1">
      <span class="sk-title text-[15px]">{m.enterprise_chart_title()}</span>
      <span class="text-[12px] text-sk-soft">{m.enterprise_chart_hint()}</span>
    </div>
    {#if points.length > 0}
      <div class="flex flex-col items-end gap-0.5">
        <span class="sk-label">{m.enterprise_chart_today()}</span>
        <Amount value={points[points.length - 1]!.balance} size="md" />
      </div>
    {/if}
  </div>

  <div class="chart" bind:clientWidth={width} style:height="{HEIGHT}px">
    {#if width > 0 && points.length > 0}
      <svg
        {width}
        height={HEIGHT}
        role="img"
        aria-label={m.enterprise_chart_title()}
        onpointermove={move}
        onpointerleave={() => (hovered = null)}
      >
        <defs>
          <linearGradient id="cashflow-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--sk-accent)" stop-opacity="0.28" />
            <stop offset="100%" stop-color="var(--sk-accent)" stop-opacity="0" />
          </linearGradient>
        </defs>

        {#each Array.from({ length: GRID_LINES }, (_, step) => step) as step (step)}
          {@const lineY = TOP + (step / (GRID_LINES - 1)) * (HEIGHT - TOP - BOTTOM)}
          <line x1="0" x2={width} y1={lineY} y2={lineY} class="grid" />
        {/each}

        <path d={area} fill="url(#cashflow-fill)" />
        <path d={line} class="curve" />

        {#if active && hovered !== null}
          <line x1={x(hovered)} x2={x(hovered)} y1={TOP} y2={HEIGHT - BOTTOM} class="cursor" />
          <circle cx={x(hovered)} cy={y(active.balance)} r="4.5" class="dot" />
        {/if}

        {#each labels as index (index)}
          <text
            x={x(index)}
            y={HEIGHT - 8}
            class="axis"
            text-anchor={index === 0 ? 'start' : index === points.length - 1 ? 'end' : 'middle'}
          >
            {formatDate(points[index]!.day, locale.current)}
          </text>
        {/each}
      </svg>

      {#if active}
        <div class="tip" style:left="{tooltipLeft}px">
          <span class="text-[11px] text-sk-soft"
            >{formatDate(active.day, locale.current, true)}</span
          >
          <Amount value={active.balance} size="sm" />
          <div class="flex gap-3 text-[11px]">
            <span class="text-sk-accent">+{active.credits.toLocaleString(locale.current)}</span>
            <span class="text-sk-muted">−{active.debits.toLocaleString(locale.current)}</span>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</GlassCard>

<style>
  .chart {
    position: relative;
    width: 100%;
  }

  svg {
    display: block;
    overflow: visible;
    cursor: crosshair;
  }

  .grid {
    stroke: var(--sk-rule);
    stroke-dasharray: 2 6;
  }

  .curve {
    fill: none;
    stroke: var(--sk-accent);
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
    filter: drop-shadow(0 4px 10px var(--sk-accent-haze));
  }

  .cursor {
    stroke: var(--sk-border-hover);
    stroke-dasharray: 3 4;
  }

  .dot {
    fill: var(--sk-panel);
    stroke: var(--sk-accent);
    stroke-width: 2;
  }

  .axis {
    fill: var(--sk-text-faint);
    font-size: 10.5px;
    font-family: inherit;
  }

  .tip {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 150px;
    padding: 9px 12px;
    border-radius: var(--sk-radius-control);
    border: 1px solid var(--sk-border);
    background: var(--sk-panel-modal);
    box-shadow: var(--sk-shadow-glass);
    transform: translateX(-50%);
    pointer-events: none;
  }
</style>
