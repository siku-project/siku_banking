import { mockCustomer } from '@/lib/mock'
import type { Theme } from '@/lib/theme.svelte'

export type IntroPhase = 'code' | 'loading' | 'greeting' | 'ready'

/** What the customer set in the settings, kept per character by the game. */
export interface Preferences {
  theme: Theme
  /** Whether the opening animation plays. */
  intro: boolean
  /** Whether amounts stay masked until hovered. */
  discreet: boolean
  notifyIncoming: boolean
  notifyOutgoing: boolean
  /** The balance under which the game warns, 0 for never. */
  lowBalance: number
}

export const DEFAULT_PREFERENCES: Preferences = {
  theme: 'dark',
  intro: true,
  discreet: false,
  notifyIncoming: true,
  notifyOutgoing: false,
  lowBalance: 0,
}

export interface Customer {
  firstName: string
  lastName: string
  /** ISO day, `1994-03-12`, as the character's identity carries it. */
  birthDate: string
  /** Whether the character already opened their first account at the bank. */
  onboarded: boolean
  /** Whether the character may switch to the enterprise side; the game decides from its config. */
  enterprise: boolean
  /** The customer number shown in the settings, `SK-000123`. */
  number: string
  /** Unix time in milliseconds of the first opening, 0 before it. */
  since: number
  preferences: Preferences
}

/** Every duration of the intro, in milliseconds. The dashboard reveals once the greeting is over. */
export const INTRO_TIMINGS = {
  digits: 6,
  digit: 140,
  verify: 460,
  loading: 1000,
  greeting: 1200,
  reveal: 420,
} as const

const CODE_DURATION = INTRO_TIMINGS.digits * INTRO_TIMINGS.digit + INTRO_TIMINGS.verify

const DEFAULT_CUSTOMER: Customer = {
  firstName: '',
  lastName: '',
  birthDate: '',
  onboarded: false,
  enterprise: false,
  number: '',
  since: 0,
  preferences: { ...DEFAULT_PREFERENCES },
}

/** In the browser, `?intro=0` opens straight on the dashboard. */
const introSkipped = (): boolean =>
  import.meta.env.DEV && new URLSearchParams(window.location.search).get('intro') === '0'

/** In the browser a mock customer is logged in; in the game the ready call says who. */
const initialCustomer = (): Customer =>
  import.meta.env.DEV ? { ...mockCustomer() } : { ...DEFAULT_CUSTOMER }

let customer = $state<Customer>(initialCustomer())
let phase = $state<IntroPhase>('code')
let timers: ReturnType<typeof setTimeout>[] = []

const cancel = (): void => {
  timers.forEach(clearTimeout)
  timers = []
}

/** Who is logged in and where the opening sequence stands. */
export const session = {
  get customer(): Customer {
    return customer
  },

  get fullName(): string {
    return `${customer.firstName} ${customer.lastName}`.trim()
  },

  get phase(): IntroPhase {
    return phase
  },

  get ready(): boolean {
    return phase === 'ready'
  },

  /** Whether the browser asked to skip the intro; the game never does. */
  get skipRequested(): boolean {
    return introSkipped()
  },

  setCustomer(value: Partial<Customer>): void {
    customer = {
      ...customer,
      ...value,
      preferences: { ...customer.preferences, ...value.preferences },
    }
  },

  /** Whether the opening animation should play for this customer. */
  get introWanted(): boolean {
    return customer.preferences.intro && !introSkipped()
  },

  /** Runs the intro from the code phase to the dashboard; a running one restarts. */
  start(): void {
    cancel()
    phase = 'code'

    const loadingAt = CODE_DURATION
    const greetingAt = loadingAt + INTRO_TIMINGS.loading
    const readyAt = greetingAt + INTRO_TIMINGS.greeting

    timers = [
      setTimeout(() => (phase = 'loading'), loadingAt),
      setTimeout(() => (phase = 'greeting'), greetingAt),
      setTimeout(() => (phase = 'ready'), readyAt),
    ]
  },

  skipIntro(): void {
    cancel()
    phase = 'ready'
  },

  /** Back to the first phase, stopped, so the next opening plays the intro again. */
  reset(): void {
    cancel()
    phase = 'code'
  },
}
