import { bank, type BankData, type CardState } from '@/lib/bank.svelte'
import { enterprise, type Company } from '@/lib/enterprise.svelte'
import { inGame, sendNuiCallback } from '@/lib/nui'
import { session, type Customer, type Preferences } from '@/lib/session.svelte'

/** Why the game refused; the same words the Lua side answers. */
export type Reason =
  | 'unreachable'
  | 'not_ready'
  | 'already_onboarded'
  | 'not_onboarded'
  | 'unknown_account'
  | 'unknown_card'
  | 'not_owner'
  | 'account_limit'
  | 'card_limit'
  | 'invalid_label'
  | 'invalid_pin'
  | 'wrong_pin'
  | 'pin_locked'
  | 'balance_not_zero'
  | 'main_account'
  | 'last_account'
  | 'invalid_state'
  | 'frozen'
  | 'closed'
  | 'write_failed'
  | 'unknown_recipient'
  | 'same_account'
  | 'insufficient_balance'
  | 'invalid_amount'
  | 'amount_limit'
  | 'beneficiary_limit'
  | 'duplicate_beneficiary'
  | 'unknown_beneficiary'
  | 'self_beneficiary'
  | 'invalid_preferences'
  | 'too_far'
  | 'not_member'

/** Who stands behind an account number. */
export interface Recipient {
  number: string
  holder: string
}

/** What every action answers: whether it went through, why not, and what changed. */
export interface Outcome {
  ok: boolean
  reason?: Reason
  bank?: Partial<BankData>
  customer?: Partial<Customer>
  recipient?: Recipient
  /** The fee a transfer took, once it moved. */
  fee?: number
  /** How many items an action touched, such as the cards blocked at once. */
  count?: number
  /** The companies again, when an action moved one of them. */
  enterprise?: Company[]
}

export interface OnboardPayload {
  label: string
  /** Four digits when the customer wants a card with the account, null otherwise. */
  pin: string | null
}

export interface OpenAccountPayload {
  label: string
}

export interface AccountPayload {
  accountId: number
}

export interface RenameAccountPayload extends AccountPayload {
  label: string
}

export interface OrderCardPayload extends AccountPayload {
  pin: string
}

export interface CardPayload {
  cardId: number
}

export interface CardStatePayload extends CardPayload {
  state: Exclude<CardState, 'cancelled'>
}

export interface ChangePinPayload extends CardPayload {
  currentPin: string
  pin: string
}

export interface LookupPayload {
  number: string
}

export interface TransferPayload {
  fromAccountId: number
  number: string
  amount: number
  label: string
}

export interface AddBeneficiaryPayload {
  number: string
  label: string
}

export interface BeneficiaryPayload {
  beneficiaryId: number
}

export interface HistoryPayload {
  /** Lines wanted per account. */
  limit: number
}

export interface PreferencesPayload {
  preferences: Partial<Preferences>
}

const FAILED: Outcome = { ok: false, reason: 'unreachable' }

/** The events of the enterprise side, `enterprise:transfer`. */
export const ENTERPRISE_PREFIX = 'enterprise:'

/** Applies what the game sent back, then hands the outcome to the caller. */
const settle = (answer: Outcome | null): Outcome => {
  if (!answer) {
    return FAILED
  }

  if (answer.customer) {
    session.setCustomer(answer.customer)
  }

  if (answer.bank) {
    bank.patch(answer.bank)
  }

  if (answer.enterprise) {
    enterprise.patch(answer.enterprise)
  }

  return answer
}

/** In the game the resource answers; in the browser a mock server plays its part. */
export const call = async <P>(event: string, payload: P): Promise<Outcome> => {
  if (!inGame && import.meta.env.DEV && event.startsWith(ENTERPRISE_PREFIX)) {
    const { mockEnterpriseServer } = await import('@/lib/mock-enterprise-server')

    return settle(await mockEnterpriseServer.handle(event.slice(ENTERPRISE_PREFIX.length), payload))
  }

  if (!inGame && import.meta.env.DEV) {
    const { mockServer } = await import('@/lib/mock-server')

    return settle(await mockServer.handle(event, payload))
  }

  return settle(await sendNuiCallback<Outcome, P>(event, payload))
}

/** Every action the interface asks the game to perform. */
export const api = {
  onboard: (payload: OnboardPayload): Promise<Outcome> => call('onboard', payload),
  openAccount: (payload: OpenAccountPayload): Promise<Outcome> => call('openAccount', payload),
  renameAccount: (payload: RenameAccountPayload): Promise<Outcome> =>
    call('renameAccount', payload),
  setMainAccount: (payload: AccountPayload): Promise<Outcome> => call('setMainAccount', payload),
  closeAccount: (payload: AccountPayload): Promise<Outcome> => call('closeAccount', payload),
  orderCard: (payload: OrderCardPayload): Promise<Outcome> => call('orderCard', payload),
  setCardState: (payload: CardStatePayload): Promise<Outcome> => call('setCardState', payload),
  cancelCard: (payload: CardPayload): Promise<Outcome> => call('cancelCard', payload),
  changePin: (payload: ChangePinPayload): Promise<Outcome> => call('changePin', payload),
  lookupRecipient: (payload: LookupPayload): Promise<Outcome> => call('lookupRecipient', payload),
  transfer: (payload: TransferPayload): Promise<Outcome> => call('transfer', payload),
  addBeneficiary: (payload: AddBeneficiaryPayload): Promise<Outcome> =>
    call('addBeneficiary', payload),
  removeBeneficiary: (payload: BeneficiaryPayload): Promise<Outcome> =>
    call('removeBeneficiary', payload),
  loadHistory: (payload: HistoryPayload): Promise<Outcome> => call('loadHistory', payload),
  savePreferences: (payload: PreferencesPayload): Promise<Outcome> =>
    call('savePreferences', payload),
  blockAllCards: (): Promise<Outcome> => call('blockAllCards', {}),
}

export const PIN_LENGTH = 4
export const ACCOUNT_NUMBER_LENGTH = 12

export const isPin = (value: string): boolean => new RegExp(`^\\d{${PIN_LENGTH}}$`).test(value)

/** The digits of a typed account number, spaces dropped. */
export const accountDigits = (value: string): string => value.replace(/\D/g, '')

export const isAccountNumber = (value: string): boolean =>
  accountDigits(value).length === ACCOUNT_NUMBER_LENGTH

export const isLabel = (value: string, max: number): boolean => {
  const trimmed = value.trim()

  return trimmed.length >= 2 && trimmed.length <= max
}
