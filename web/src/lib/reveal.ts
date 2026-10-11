import type { FlyParams } from 'svelte/transition'
import { duration, stagger } from '@/lib/motion'
import { SWITCH_TIMINGS, workspace } from '@/lib/workspace.svelte'

const REVEAL_MS = 440
const STEP_MS = 80
const RISE_PX = 14

/**
 * The staggered reveal of a page section. A page mounted under the
 * workspace veil waits for it to lift before showing itself.
 */
export const pageReveal = (): ((index: number) => FlyParams) => {
  const base = workspace.switching ? duration(SWITCH_TIMINGS.hold) : 0

  return (index: number): FlyParams => ({
    y: RISE_PX,
    duration: duration(REVEAL_MS),
    delay: stagger(index, STEP_MS, base),
  })
}
