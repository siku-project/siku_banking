import { accountDigits, isAccountNumber, isLabel, type Outcome, type Reason } from '@/lib/api'
import type {
  CompanyAccessPayload,
  CompanyAccountPayload,
  CompanyCardLimitPayload,
  CompanyCardStatePayload,
  CompanyTransferPayload,
  IssueCardPayload,
  SupplierPayload,
} from '@/lib/enterprise-api'
import { enterprise, type Company, type CompanyAccount } from '@/lib/enterprise.svelte'
import { MOCK_DIRECTORY } from '@/lib/mock'
import { session } from '@/lib/session.svelte'

const LATENCY_MS = 360
const DAY_MS = 86_400_000
const CARD_YEARS = 3
const LABEL_MAX = 40
const NUMBER_PREFIX = '9100'
const NUMBER_DIGITS = 12

const wait = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, LATENCY_MS))

const refuse = (reason: Reason): Outcome => ({ ok: false, reason })

const nextId = (rows: { id: number }[]): number =>
  rows.reduce((max, row) => Math.max(max, row.id), 0) + 1

const randomDigits = (count: number): string =>
  Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join('')

/** The companies again, as the game would send them after an action. */
const snapshot = (): Outcome => ({
  ok: true,
  enterprise: enterprise.companies.map((company) => ({ ...company })),
})

const companyOf = (companyId: number): Company | null =>
  enterprise.companies.find((company) => company.id === companyId) ?? null

const accountOf = (company: Company, accountId: number): CompanyAccount | null =>
  company.accounts.find((account) => account.id === accountId) ?? null

/** Writes a movement on a company account, the way the core journal would. */
const move = (
  company: Company,
  account: CompanyAccount,
  amount: number,
  label: string,
  category: 'transfer',
): void => {
  account.balance += amount
  company.operations.push({
    id: nextId(company.operations),
    accountId: account.id,
    label,
    category,
    amount,
    at: Date.now(),
    author: session.fullName,
  })
}

type Handler = (company: Company, payload: never) => Outcome

const handlers: Record<string, Handler> = {
  openAccount(company, payload: { label: string }) {
    if (!isLabel(payload.label, LABEL_MAX)) {
      return refuse('invalid_label')
    }

    company.accounts.push({
      id: nextId(company.accounts) + company.id * 100,
      number: NUMBER_PREFIX + randomDigits(NUMBER_DIGITS - NUMBER_PREFIX.length),
      label: payload.label.trim(),
      state: 'active',
      balance: 0,
      main: false,
      access: [],
    })

    return snapshot()
  },

  renameAccount(company, payload: CompanyAccountPayload & { label: string }) {
    const account = accountOf(company, payload.accountId)

    if (!account) {
      return refuse('unknown_account')
    }

    if (!isLabel(payload.label, LABEL_MAX)) {
      return refuse('invalid_label')
    }

    account.label = payload.label.trim()

    return snapshot()
  },

  setAccess(company, payload: CompanyAccessPayload) {
    const account = accountOf(company, payload.accountId)

    if (!account) {
      return refuse('unknown_account')
    }

    account.access = account.access.filter((entry) => entry.memberId !== payload.memberId)

    if (payload.level) {
      account.access.push({ memberId: payload.memberId, level: payload.level })
    }

    return snapshot()
  },

  issueCard(company, payload: IssueCardPayload) {
    if (!accountOf(company, payload.accountId)) {
      return refuse('unknown_account')
    }

    if (company.cards.some((card) => card.memberId === payload.memberId)) {
      return refuse('card_limit')
    }

    if (!Number.isInteger(payload.limit) || payload.limit <= 0) {
      return refuse('invalid_amount')
    }

    company.cards.push({
      id: nextId(company.cards),
      accountId: payload.accountId,
      memberId: payload.memberId,
      last4: randomDigits(4),
      limit: payload.limit,
      spent: 0,
      expiresAt: Date.now() + CARD_YEARS * 365 * DAY_MS,
      state: 'active',
    })

    return snapshot()
  },

  setCardState(company, payload: CompanyCardStatePayload) {
    const card = company.cards.find((entry) => entry.id === payload.cardId)

    if (!card) {
      return refuse('unknown_card')
    }

    card.state = payload.state

    return snapshot()
  },

  setCardLimit(company, payload: CompanyCardLimitPayload) {
    const card = company.cards.find((entry) => entry.id === payload.cardId)

    if (!card) {
      return refuse('unknown_card')
    }

    if (!Number.isInteger(payload.limit) || payload.limit <= 0) {
      return refuse('invalid_amount')
    }

    card.limit = payload.limit

    return snapshot()
  },

  transfer(company, payload: CompanyTransferPayload) {
    const from = accountOf(company, payload.fromAccountId)
    const number = accountDigits(payload.number)
    const internal = company.accounts.find((account) => account.number === number) ?? null

    if (!from) {
      return refuse('unknown_account')
    }

    if (!isAccountNumber(number) || (!internal && !MOCK_DIRECTORY[number])) {
      return refuse('unknown_recipient')
    }

    if (internal?.id === from.id) {
      return refuse('same_account')
    }

    if (!Number.isInteger(payload.amount) || payload.amount <= 0) {
      return refuse('invalid_amount')
    }

    if (from.balance < payload.amount) {
      return refuse('insufficient_balance')
    }

    move(company, from, -payload.amount, payload.label.trim(), 'transfer')

    if (internal) {
      move(company, internal, payload.amount, payload.label.trim(), 'transfer')
    }

    return snapshot()
  },

  addSupplier(company, payload: SupplierPayload) {
    const number = accountDigits(payload.number)
    const holder = MOCK_DIRECTORY[number]

    if (!holder) {
      return refuse('unknown_recipient')
    }

    if (company.suppliers.some((entry) => entry.number === number)) {
      return refuse('duplicate_beneficiary')
    }

    company.suppliers.push({
      id: nextId(company.suppliers),
      label: payload.label.trim(),
      number,
      holder,
    })

    return snapshot()
  },

  removeSupplier(company, payload: { supplierId: number }) {
    company.suppliers = company.suppliers.filter((entry) => entry.id !== payload.supplierId)

    return snapshot()
  },
}

/** Plays the game's part for the enterprise side in the browser. */
export const mockEnterpriseServer = {
  async handle<P>(name: string, payload: P): Promise<Outcome | null> {
    await wait()

    const handler = handlers[name]
    const company = companyOf((payload as { companyId: number }).companyId)

    if (!handler) {
      return null
    }

    return company ? handler(company, payload as never) : refuse('unknown_account')
  },
}
