import {
  DEFAULT_LIMITS,
  type Account,
  type BankData,
  type Beneficiary,
  type Card,
  type Transaction,
  type TransactionCategory,
} from '@/lib/bank.svelte'
import type { Customer } from '@/lib/session.svelte'

/** `rich` is a long-time customer, `empty` just opened, `new` never came before. */
export type Scenario = 'rich' | 'empty' | 'new'

const HOUR_MS = 3_600_000
const DAY_MS = 86_400_000
const YEAR_MS = 365 * DAY_MS

export const SCENARIOS: readonly Scenario[] = ['rich', 'empty', 'new']

const CUSTOMER: Customer = {
  firstName: 'Élise',
  lastName: 'Marchand',
  birthDate: '1994-03-12',
  onboarded: true,
  enterprise: true,
  number: 'SK-000042',
  since: Date.now() - 214 * DAY_MS,
  preferences: {
    theme: 'dark',
    intro: true,
    discreet: false,
    notifyIncoming: true,
    notifyOutgoing: false,
    lowBalance: 500,
  },
}

interface Seed {
  accountId: number
  daysAgo: number
  hour: number
  label: string
  category: TransactionCategory
  amount: number
}

const ACCOUNTS: Account[] = [
  {
    id: 1,
    number: '402177301185',
    label: 'Compte courant',
    state: 'active',
    balance: 18_450,
    main: true,
  },
  {
    id: 2,
    number: '402177302264',
    label: 'Épargne',
    state: 'frozen',
    balance: 42_300,
    main: false,
  },
]

const CARDS: Card[] = [
  {
    id: 1,
    accountId: 1,
    last4: '4821',
    holder: 'ÉLISE MARCHAND',
    expiresAt: Date.now() + 3 * YEAR_MS,
    state: 'active',
  },
  {
    id: 2,
    accountId: 1,
    last4: '0377',
    holder: 'ÉLISE MARCHAND',
    expiresAt: Date.now() + YEAR_MS,
    state: 'blocked',
  },
]

/** Other customers of the mock bank, by account number. */
export const MOCK_DIRECTORY: Record<string, string> = {
  '402188420117': 'Tobias Okafor',
  '402190031562': 'Maud Delcourt',
  '402173350904': 'Ravi Anand',
}

const BENEFICIARIES: Beneficiary[] = [
  { id: 1, label: 'Tobias', number: '402188420117', holder: 'Tobias Okafor' },
  { id: 2, label: 'Loyer · Maud', number: '402190031562', holder: 'Maud Delcourt' },
]

const SEEDS: Seed[] = [
  { accountId: 1, daysAgo: 0, hour: 9, label: 'Café Ridgeway', category: 'food', amount: -14 },
  { accountId: 1, daysAgo: 0, hour: 8, label: 'Station Xero', category: 'transport', amount: -62 },
  { accountId: 1, daysAgo: 1, hour: 19, label: 'Épicerie 24/7', category: 'shopping', amount: -87 },
  { accountId: 1, daysAgo: 1, hour: 12, label: 'Salaire', category: 'salary', amount: 3_250 },
  { accountId: 1, daysAgo: 2, hour: 21, label: 'Cinéma Oriel', category: 'leisure', amount: -28 },
  {
    accountId: 1,
    daysAgo: 3,
    hour: 16,
    label: 'Retrait distributeur',
    category: 'withdrawal',
    amount: -300,
  },
  { accountId: 1, daysAgo: 4, hour: 9, label: 'Loyer', category: 'housing', amount: -1_450 },
  {
    accountId: 1,
    daysAgo: 5,
    hour: 18,
    label: 'Virement reçu · T. Okafor',
    category: 'transfer',
    amount: 420,
  },
  { accountId: 1, daysAgo: 7, hour: 13, label: 'Restaurant Lumen', category: 'food', amount: -96 },
  {
    accountId: 1,
    daysAgo: 8,
    hour: 10,
    label: 'Dépôt guichet',
    category: 'deposit',
    amount: 1_200,
  },
  {
    accountId: 2,
    daysAgo: 9,
    hour: 9,
    label: 'Épargne mensuelle',
    category: 'transfer',
    amount: 500,
  },
  { accountId: 1, daysAgo: 9, hour: 9, label: 'Vers Épargne', category: 'transfer', amount: -500 },
  {
    accountId: 1,
    daysAgo: 12,
    hour: 20,
    label: 'Boutique Halden',
    category: 'shopping',
    amount: -210,
  },
  { accountId: 1, daysAgo: 14, hour: 8, label: 'Station Xero', category: 'transport', amount: -58 },
  { accountId: 1, daysAgo: 15, hour: 12, label: 'Salaire', category: 'salary', amount: 3_250 },
  {
    accountId: 1,
    daysAgo: 18,
    hour: 17,
    label: 'Pharmacie Nord',
    category: 'shopping',
    amount: -43,
  },
  { accountId: 2, daysAgo: 20, hour: 9, label: 'Intérêts', category: 'other', amount: 62 },
  {
    accountId: 1,
    daysAgo: 22,
    hour: 22,
    label: 'Concert Aurora Hall',
    category: 'leisure',
    amount: -120,
  },
  {
    accountId: 1,
    daysAgo: 26,
    hour: 11,
    label: 'Retrait distributeur',
    category: 'withdrawal',
    amount: -200,
  },
  {
    accountId: 1,
    daysAgo: 28,
    hour: 9,
    label: 'Virement reçu · M. Delcourt',
    category: 'transfer',
    amount: 150,
  },
]

/** Walks each account backwards from its current balance so every row carries the balance it left. */
const buildTransactions = (accounts: Account[], seeds: Seed[], now: number): Transaction[] => {
  const running = new Map(accounts.map((account) => [account.id, account.balance]))

  return seeds.map((seed, index) => {
    const balanceAfter = running.get(seed.accountId) ?? 0

    running.set(seed.accountId, balanceAfter - seed.amount)

    return {
      id: index + 1,
      accountId: seed.accountId,
      label: seed.label,
      category: seed.category,
      amount: seed.amount,
      at: now - seed.daysAgo * DAY_MS - (new Date(now).getHours() - seed.hour) * HOUR_MS,
      balanceAfter,
    }
  })
}

/** In the browser, `?scenario=` picks a dataset; `rich` is the default. */
export const readScenario = (): Scenario => {
  const wanted = new URLSearchParams(window.location.search).get('scenario')

  return SCENARIOS.includes(wanted as Scenario) ? (wanted as Scenario) : 'rich'
}

/** The development customer for a scenario. */
export const mockCustomer = (scenario: Scenario = readScenario()): Customer => ({
  ...CUSTOMER,
  preferences: { ...CUSTOMER.preferences },
  onboarded: scenario !== 'new',
  since: scenario === 'new' ? 0 : CUSTOMER.since,
})

/** The development dataset for a scenario, built against the current clock. */
export const mockData = (scenario: Scenario = 'rich', now = Date.now()): BankData => {
  const limits = { ...DEFAULT_LIMITS, transfer: { ...DEFAULT_LIMITS.transfer } }

  if (scenario === 'new') {
    return { accounts: [], cards: [], transactions: [], beneficiaries: [], limits }
  }

  if (scenario === 'empty') {
    return {
      accounts: [{ ...ACCOUNTS[0]!, balance: 0 }],
      cards: [],
      transactions: [],
      beneficiaries: [],
      limits,
    }
  }

  const accounts = ACCOUNTS.map((account) => ({ ...account }))

  return {
    accounts,
    cards: CARDS.map((card) => ({ ...card })),
    transactions: buildTransactions(accounts, SEEDS, now),
    beneficiaries: BENEFICIARIES.map((entry) => ({ ...entry })),
    limits,
  }
}
