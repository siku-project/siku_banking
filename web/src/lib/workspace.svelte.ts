import { push } from 'svelte-spa-router'
import { duration } from '@/lib/motion'
import { PATHS } from '@/lib/paths'

/** Which side of the bank the customer works in. */
export type Workspace = 'personal' | 'enterprise'

/**
 * Where a switch stands: `cover` while the veil rises over the old side,
 * `hold` while the new side mounts behind it, `reveal` while it lifts.
 */
export type SwitchPhase = 'idle' | 'cover' | 'hold' | 'reveal'

/** Every duration of the switch, in milliseconds. */
export const SWITCH_TIMINGS = {
  cover: 420,
  hold: 900,
  reveal: 520,
} as const

let current = $state<Workspace>('personal')
let target = $state<Workspace>('personal')
let phase = $state<SwitchPhase>('idle')
let timers: ReturnType<typeof setTimeout>[] = []

const cancel = (): void => {
  timers.forEach(clearTimeout)
  timers = []
}

const homeOf = (workspace: Workspace): string =>
  workspace === 'enterprise' ? PATHS.enterprise : PATHS.dashboard

/** The side the customer works in, and the veil that carries them from one to the other. */
export const workspace = {
  get current(): Workspace {
    return current
  },

  /** The side being reached during a switch, the current one otherwise. */
  get target(): Workspace {
    return target
  },

  get phase(): SwitchPhase {
    return phase
  },

  get switching(): boolean {
    return phase !== 'idle'
  },

  get isEnterprise(): boolean {
    return current === 'enterprise'
  },

  /** Crosses to the other side: the veil covers, the side changes behind it, the veil lifts. */
  switchTo(next: Workspace): void {
    if (next === current || phase !== 'idle') {
      return
    }

    cancel()
    target = next
    phase = 'cover'

    const coverMs = duration(SWITCH_TIMINGS.cover)
    const holdMs = duration(SWITCH_TIMINGS.hold)
    const revealMs = duration(SWITCH_TIMINGS.reveal)

    timers = [
      setTimeout(() => {
        current = next
        phase = 'hold'
        push(homeOf(next))
      }, coverMs),
      setTimeout(() => (phase = 'reveal'), coverMs + holdMs),
      setTimeout(() => (phase = 'idle'), coverMs + holdMs + revealMs),
    ]
  },

  toggle(): void {
    workspace.switchTo(current === 'enterprise' ? 'personal' : 'enterprise')
  },

  /** Back to the personal side at once, for the next opening of the bank. */
  reset(): void {
    cancel()
    current = 'personal'
    target = 'personal'
    phase = 'idle'
  },
}
