import type {
  AccountPayload,
  AddBeneficiaryPayload,
  BeneficiaryPayload,
  CardPayload,
  CardStatePayload,
  ChangePinPayload,
  LookupPayload,
  OnboardPayload,
  OpenAccountPayload,
  OrderCardPayload,
  Outcome,
  PreferencesPayload,
  Reason,
  RenameAccountPayload,
  TransferPayload,
} from '@/lib/api'
import { accountDigits, isAccountNumber, isLabel, isPin } from '@/lib/api'
import { bank, type Account, type Card } from '@/lib/bank.svelte'
import { MOCK_DIRECTORY } from '@/lib/mock'
import { session } from '@/lib/session.svelte'

const LATENCY_MS = 380
const CARD_YEARS = 3
const YEAR_MS = 365 * 86_400_000
const NUMBER_PREFIX = '4021'
const NUMBER_DIGITS = 12
const MAX_ATTEMPTS = 3

const pins = new Map<number, string>()
const attempts = new Map<number, number>()

const wait = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, LATENCY_MS))

const refuse = (reason: Reason): Outcome => ({ ok: false, reason })

const nextId = (rows: { id: number }[]): number =>
  rows.reduce((max, row) => Math.max(max, row.id), 0) + 1

const randomDigits = (count: number): string =>
  Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join('')

const accountNumber = (): string =>
  NUMBER_PREFIX + randomDigits(NUMBER_DIGITS - NUMBER_PREFIX.length)

const snapshot = (): Outcome => ({
  ok: true,
  bank: {
    accounts: bank.accounts.map((account) => ({ ...account })),
    cards: bank.cards.map((card) => ({ ...card })),
    transactions: bank.transactions.map((transaction) => ({ ...transaction })),
    beneficiaries: bank.beneficiaries.map((entry) => ({ ...entry })),
  },
})

/** Who holds a number: one of the customer's accounts, or someone of the directory. */
const recipientOf = (
  raw: string,
): { number: string; holder: string; own: Account | null } | null => {
  const number = accountDigits(raw)

  if (!isAccountNumber(number)) {
    return null
  }

  const own = bank.accountByNumber(number)

  if (own) {
    return { number, holder: session.fullName, own }
  }

  const holder = MOCK_DIRECTORY[number]

  return holder ? { number, holder, own: null } : null
}

const feeOf = (amount: number): number => {
  const { feeRate, feeFixed } = bank.limits.transfer

  return Math.max(0, Math.round(amount * feeRate + feeFixed))
}

const ownedAccount = (accountId: number): Account | Reason =>
  bank.account(accountId) ?? 'unknown_account'

const liveCard = (cardId: number): Card | Reason => {
  const card = bank.cards.find((entry) => entry.id === cardId)

  if (!card) {
    return 'unknown_card'
  }

  if (card.state === 'cancelled') {
    return 'closed'
  }

  const account = ownedAccount(card.accountId)

  return typeof account === 'string' ? account : card
}

const createAccount = (label: string, main: boolean): Account => ({
  id: nextId(bank.accounts),
  number: accountNumber(),
  label: label.trim(),
  state: 'active',
  balance: 0,
  main,
})

const createCard = (accountId: number, pin: string): Card => {
  const card: Card = {
    id: nextId(bank.cards),
    accountId,
    last4: randomDigits(4),
    holder: session.fullName.toUpperCase(),
    expiresAt: Date.now() + CARD_YEARS * YEAR_MS,
    state: 'active',
  }

  pins.set(card.id, pin)

  return card
}

const handlers: Record<string, (payload: never) => Outcome> = {
  onboard(payload: OnboardPayload): Outcome {
    if (session.customer.onboarded) {
      return refuse('already_onboarded')
    }

    if (!isLabel(payload.label, bank.limits.labelLength)) {
      return refuse('invalid_label')
    }

    if (payload.pin !== null && !isPin(payload.pin)) {
      return refuse('invalid_pin')
    }

    const account = createAccount(payload.label, true)
    const cards = payload.pin === null ? [] : [createCard(account.id, payload.pin)]

    bank.patch({ accounts: [account], cards, transactions: [] })

    return { ...snapshot(), customer: { onboarded: true } }
  },

  openAccount(payload: OpenAccountPayload): Outcome {
    if (!bank.canOpenAccount) {
      return refuse('account_limit')
    }

    if (!isLabel(payload.label, bank.limits.labelLength)) {
      return refuse('invalid_label')
    }

    const account = createAccount(payload.label, bank.accounts.length === 0)

    bank.patch({ accounts: [...bank.accounts, account] })

    return snapshot()
  },

  renameAccount(payload: RenameAccountPayload): Outcome {
    const account = ownedAccount(payload.accountId)

    if (typeof account === 'string') {
      return refuse(account)
    }

    if (!isLabel(payload.label, bank.limits.labelLength)) {
      return refuse('invalid_label')
    }

    account.label = payload.label.trim()

    return snapshot()
  },

  setMainAccount(payload: AccountPayload): Outcome {
    const account = ownedAccount(payload.accountId)

    if (typeof account === 'string') {
      return refuse(account)
    }

    if (account.state === 'frozen') {
      return refuse('frozen')
    }

    for (const entry of bank.accounts) {
      entry.main = entry.id === account.id
    }

    return snapshot()
  },

  closeAccount(payload: AccountPayload): Outcome {
    const account = ownedAccount(payload.accountId)

    if (typeof account === 'string') {
      return refuse(account)
    }

    if (account.main) {
      return refuse('main_account')
    }

    if (account.balance !== 0) {
      return refuse('balance_not_zero')
    }

    bank.patch({
      accounts: bank.accounts.filter((entry) => entry.id !== account.id),
      cards: bank.cards.filter((card) => card.accountId !== account.id),
    })

    return snapshot()
  },

  orderCard(payload: OrderCardPayload): Outcome {
    const account = ownedAccount(payload.accountId)

    if (typeof account === 'string') {
      return refuse(account)
    }

    if (account.state === 'frozen') {
      return refuse('frozen')
    }

    if (!bank.canOrderCard(account.id)) {
      return refuse('card_limit')
    }

    if (!isPin(payload.pin)) {
      return refuse('invalid_pin')
    }

    bank.patch({ cards: [...bank.cards, createCard(account.id, payload.pin)] })

    return snapshot()
  },

  setCardState(payload: CardStatePayload): Outcome {
    const card = liveCard(payload.cardId)

    if (typeof card === 'string') {
      return refuse(card)
    }

    if (card.state === payload.state) {
      return refuse('invalid_state')
    }

    card.state = payload.state

    return snapshot()
  },

  cancelCard(payload: CardPayload): Outcome {
    const card = liveCard(payload.cardId)

    if (typeof card === 'string') {
      return refuse(card)
    }

    card.state = 'cancelled'
    pins.delete(card.id)

    return snapshot()
  },

  lookupRecipient(payload: LookupPayload): Outcome {
    const recipient = recipientOf(payload.number)

    if (!recipient) {
      return refuse('unknown_recipient')
    }

    return { ok: true, recipient: { number: recipient.number, holder: recipient.holder } }
  },

  transfer(payload: TransferPayload): Outcome {
    const from = ownedAccount(payload.fromAccountId)

    if (typeof from === 'string') {
      return refuse(from)
    }

    if (from.state === 'frozen') {
      return refuse('frozen')
    }

    const recipient = recipientOf(payload.number)

    if (!recipient) {
      return refuse('unknown_recipient')
    }

    if (recipient.own?.id === from.id) {
      return refuse('same_account')
    }

    if (!isLabel(payload.label, bank.limits.transfer.labelLength)) {
      return refuse('invalid_label')
    }

    const amount = Math.round(payload.amount)
    const { min, max } = bank.limits.transfer

    if (!Number.isFinite(amount) || amount <= 0) {
      return refuse('invalid_amount')
    }

    if (amount < min || (max !== false && amount > max)) {
      return refuse('amount_limit')
    }

    const fee = feeOf(amount)

    if (from.balance < amount + fee) {
      return refuse('insufficient_balance')
    }

    const label = payload.label.trim()

    bank.move(from.id, -(amount + fee), label, 'transfer')

    if (recipient.own) {
      bank.move(recipient.own.id, amount, label, 'transfer')
    }

    return { ...snapshot(), fee }
  },

  addBeneficiary(payload: AddBeneficiaryPayload): Outcome {
    const recipient = recipientOf(payload.number)

    if (!recipient) {
      return refuse('unknown_recipient')
    }

    if (recipient.own) {
      return refuse('self_beneficiary')
    }

    if (!isLabel(payload.label, bank.limits.labelLength)) {
      return refuse('invalid_label')
    }

    if (bank.beneficiaries.some((entry) => entry.number === recipient.number)) {
      return refuse('duplicate_beneficiary')
    }

    if (!bank.canAddBeneficiary) {
      return refuse('beneficiary_limit')
    }

    bank.patch({
      beneficiaries: [
        ...bank.beneficiaries,
        {
          id: nextId(bank.beneficiaries),
          label: payload.label.trim(),
          number: recipient.number,
          holder: recipient.holder,
        },
      ],
    })

    return snapshot()
  },

  removeBeneficiary(payload: BeneficiaryPayload): Outcome {
    if (!bank.beneficiary(payload.beneficiaryId)) {
      return refuse('unknown_beneficiary')
    }

    bank.patch({
      beneficiaries: bank.beneficiaries.filter((entry) => entry.id !== payload.beneficiaryId),
    })

    return snapshot()
  },

  savePreferences(payload: PreferencesPayload): Outcome {
    if (!session.customer.onboarded) {
      return refuse('not_onboarded')
    }

    const { lowBalance } = payload.preferences

    if (lowBalance !== undefined && (!Number.isInteger(lowBalance) || lowBalance < 0)) {
      return refuse('invalid_preferences')
    }

    return {
      ok: true,
      customer: { preferences: { ...session.customer.preferences, ...payload.preferences } },
    }
  },

  blockAllCards(): Outcome {
    let count = 0

    for (const card of bank.cards) {
      if (card.state === 'active') {
        card.state = 'blocked'
        count += 1
      }
    }

    return { ...snapshot(), count }
  },

  loadHistory(): Outcome {
    return {
      ok: true,
      bank: { transactions: bank.transactions.map((transaction) => ({ ...transaction })) },
    }
  },

  changePin(payload: ChangePinPayload): Outcome {
    const card = liveCard(payload.cardId)

    if (typeof card === 'string') {
      return refuse(card)
    }

    if (!isPin(payload.pin)) {
      return refuse('invalid_pin')
    }

    const failed = attempts.get(card.id) ?? 0

    if (failed >= MAX_ATTEMPTS) {
      return refuse('pin_locked')
    }

    if (pins.get(card.id) !== payload.currentPin) {
      attempts.set(card.id, failed + 1)

      return refuse('wrong_pin')
    }

    attempts.delete(card.id)
    pins.set(card.id, payload.pin)

    return snapshot()
  },
}

/** Plays the game's part in the browser: same rules, same answers, a little latency. */
export const mockServer = {
  async handle<P>(event: string, payload: P): Promise<Outcome | null> {
    await wait()

    const handler = handlers[event]

    return handler ? handler(payload as never) : null
  },

  /** The PIN a mock card was given, so the dev panel can show it. */
  pinOf(cardId: number): string | undefined {
    return pins.get(cardId)
  },
}
