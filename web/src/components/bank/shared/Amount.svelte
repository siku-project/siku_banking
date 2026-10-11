<script lang="ts">
  import { formatAmount } from '@/lib/format'
  import { locale } from '@/lib/locale.svelte'
  import { session } from '@/lib/session.svelte'
  import { cn } from '$lib/utils'

  let {
    value,
    signed = false,
    size = 'md',
    class: className,
  }: {
    value: number
    /** Shows the sign and colours credits with the accent; debits stay neutral. */
    signed?: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl'
    class?: string
  } = $props()

  const SIZES = {
    sm: 'text-[13px] font-medium',
    md: 'text-[15px] font-semibold',
    lg: 'text-2xl font-semibold tracking-tight',
    xl: 'text-[44px] font-semibold leading-none tracking-[-0.03em]',
  } as const

  const MASK = '•••••'

  const credit = $derived(signed && value > 0)
  const text = $derived(formatAmount(value, locale.current, signed))
  const discreet = $derived(session.customer.preferences.discreet)
</script>

<span
  class={cn(
    'amount sk-mono whitespace-nowrap',
    SIZES[size],
    credit ? 'text-sk-accent' : 'text-sk',
    className,
  )}
  class:is-discreet={discreet}
>
  {#if discreet}
    <span class="amount__mask" aria-hidden="true">{MASK}</span>
  {/if}
  <span class="amount__value">{text}</span>
</span>

<style>
  .amount {
    display: inline-grid;
  }

  .amount > span {
    grid-area: 1 / 1;
    transition: opacity 0.18s ease;
  }

  .amount__mask {
    letter-spacing: 0.12em;
    opacity: 0.7;
  }

  .is-discreet .amount__value {
    opacity: 0;
  }

  .is-discreet:hover .amount__value {
    opacity: 1;
  }

  .is-discreet:hover .amount__mask {
    opacity: 0;
  }
</style>
