import { api, isLabel, isPin, type Reason } from '@/lib/api'
import { bank } from '@/lib/bank.svelte'
import { session } from '@/lib/session.svelte'

export type OnboardingStep = 'welcome' | 'identity' | 'account' | 'review' | 'done'

export const ONBOARDING_STEPS: readonly OnboardingStep[] = [
  'welcome',
  'identity',
  'account',
  'review',
  'done',
]

export interface OnboardingForm {
  label: string
  attested: boolean
  wantsCard: boolean
  pin: string
  pinConfirm: string
}

const emptyForm = (): OnboardingForm => ({
  label: '',
  attested: false,
  wantsCard: true,
  pin: '',
  pinConfirm: '',
})

let active = $state(false)
let step = $state<OnboardingStep>('welcome')
let form = $state<OnboardingForm>(emptyForm())
let submitting = $state(false)
let error = $state<Reason | null>(null)

const index = $derived(ONBOARDING_STEPS.indexOf(step))

const pinValid = $derived(!form.wantsCard || (isPin(form.pin) && form.pin === form.pinConfirm))

const canContinue = $derived.by(() => {
  switch (step) {
    case 'identity':
      return form.attested
    case 'account':
      return isLabel(form.label, bank.limits.labelLength) && pinValid
    default:
      return true
  }
})

/** The first visit at the bank: a few steps ending on the first account. */
export const onboarding = {
  get active(): boolean {
    return active
  },

  get step(): OnboardingStep {
    return step
  },

  get index(): number {
    return index
  },

  get form(): OnboardingForm {
    return form
  },

  get submitting(): boolean {
    return submitting
  },

  get error(): Reason | null {
    return error
  },

  get canContinue(): boolean {
    return canContinue
  },

  get pinValid(): boolean {
    return pinValid
  },

  /** Opens the flow when the customer never came before; a no-op otherwise. */
  begin(): void {
    if (session.customer.onboarded) {
      active = false
      return
    }

    active = true
    step = 'welcome'
    form = emptyForm()
    error = null
  },

  next(): void {
    if (!canContinue || step === 'done') {
      return
    }

    const following = ONBOARDING_STEPS[index + 1]

    if (following && following !== 'done') {
      step = following
      error = null
    }
  },

  back(): void {
    const previous = ONBOARDING_STEPS[index - 1]

    if (previous && step !== 'done') {
      step = previous
      error = null
    }
  },

  async submit(): Promise<boolean> {
    if (submitting || step !== 'review') {
      return false
    }

    submitting = true
    error = null

    const outcome = await api.onboard({
      label: form.label.trim(),
      pin: form.wantsCard ? form.pin : null,
    })

    submitting = false

    if (!outcome.ok) {
      error = outcome.reason ?? 'unreachable'
      return false
    }

    step = 'done'

    return true
  },

  /** Leaves the flow for the dashboard once the account is open. */
  finish(): void {
    active = false
  },

  reset(): void {
    active = false
    step = 'welcome'
    form = emptyForm()
    submitting = false
    error = null
  },
}
