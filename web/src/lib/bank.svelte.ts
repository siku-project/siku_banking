import { mockData, readScenario } from '@/lib/mock'

export type AccountState = 'active' | 'frozen'
export type CardState = 'active' | 'blocked' | 'cancelled'

export type TransactionCategory =
  | 'salary'
  | 'transfer'
  | 'shopping'
  | 'food'
  | 'housing'
  | 'transport'
  | 'deposit'
  | 'withdrawal'
  | 'leisure'
  | 'other'

export interface Account {
  id: number
  /** Twelve digits, shown in groups of four. */
  number: string
  label: string
  state: AccountState
  balance: number
  main: boolean
}

export interface Card {
  id: number
  accountId: number
  /** The last four digits; the rest never leaves the game. */
  last4: string
  holder: string
  /** Unix time in milliseconds of the end of validity. */
  expiresAt: number
  state: CardState
}

export interface Transaction {
  id: number
  accountId: number
  label: string
  category: TransactionCategory
  /** Signed: credits above zero, debits below. */
  amount: number
  /** Unix time in milliseconds. */
  at: number
  balanceAfter: number
}

export interface Beneficiary {
  id: number
  /** The name the customer gave the recipient. */
  label: string
  number: string
  /** The name of the account holder, as the bank knows it. */
  holder: string
}

export interface TransferLimits {
  min: number
  /** The largest transfer, or false for none. */
  max: number | false
  labelLength: number
  /** The share of the amount taken as a fee. */
  feeRate: number
  /** The flat fee taken on every transfer. */
  feeFixed: number
}

export interface Limits {
  /** How many personal accounts a character may hold. */
  accounts: number
  /** How many live cards an account may carry. */
  cardsPerAccount: number
  /** How long a label may be. */
  labelLength: number
  /** How many recipients a customer may save. */
  beneficiaries: number
  transfer: TransferLimits
}

export interface BankData {
  accounts: Account[]
  cards: Card[]
  transactions: Transaction[]
  beneficiaries: Beneficiary[]
  limits: Limits
}

export interface IncomingTransfer {
  accountId: number
  amount: number
  label: string
  category?: TransactionCategory
}

export const DEFAULT_LIMITS: Limits = {
  accounts: 3,
  cardsPerAccount: 2,
  labelLength: 24,
  beneficiaries: 20,
  transfer: { min: 1, max: false, labelLength: 40, feeRate: 0, feeFixed: 0 },
}

const RECENT_COUNT = 8
const MONTH_MS = 30 * 86_400_000

const emptyData = (): BankData => ({
  accounts: [],
  cards: [],
  transactions: [],
  beneficiaries: [],
  limits: { ...DEFAULT_LIMITS, transfer: { ...DEFAULT_LIMITS.transfer } },
})

const initialData = (): BankData => (import.meta.env.DEV ? mockData(readScenario()) : emptyData())

const seed = initialData()

let accounts = $state<Account[]>(seed.accounts)
let cards = $state<Card[]>(seed.cards)
let transactions = $state<Transaction[]>(seed.transactions)
let beneficiaries = $state<Beneficiary[]>(seed.beneficiaries)
let limits = $state<Limits>(seed.limits)
let selectedAccountId = $state<number | null>(null)
let nextId = seed.transactions.length + 1

const byDateDesc = (a: Transaction, b: Transaction): number => b.at - a.at

const totalBalance = $derived(accounts.reduce((sum, account) => sum + account.balance, 0))
const mainAccount = $derived(accounts.find((account) => account.main) ?? accounts[0] ?? null)
const sorted = $derived([...transactions].sort(byDateDesc))
const recentTransactions = $derived(sorted.slice(0, RECENT_COUNT))
const monthly = $derived.by(() => {
  const since = Date.now() - MONTH_MS
  let credits = 0
  let debits = 0

  for (const transaction of transactions) {
    if (transaction.at < since) {
      continue
    }

    if (transaction.amount >= 0) {
      credits += transaction.amount
    } else {
      debits -= transaction.amount
    }
  }

  return { credits, debits, net: credits - debits }
})

const record = (transaction: Omit<Transaction, 'id' | 'at' | 'balanceAfter'>): Transaction => {
  const account = accounts.find((entry) => entry.id === transaction.accountId)

  if (!account) {
    throw new Error(`unknown account ${transaction.accountId}`)
  }

  account.balance += transaction.amount

  const entry: Transaction = {
    ...transaction,
    id: nextId++,
    at: Date.now(),
    balanceAfter: account.balance,
  }

  transactions.push(entry)

  return entry
}

/** The personal accounts, their cards and their movements. Company accounts live on the enterprise side. The game patches them, the interface applies what it validated locally. */
export const bank = {
  get accounts(): Account[] {
    return accounts
  },

  get cards(): Card[] {
    return cards
  },

  get transactions(): Transaction[] {
    return sorted
  },

  get beneficiaries(): Beneficiary[] {
    return beneficiaries
  },

  get limits(): Limits {
    return limits
  },

  /** Whether the customer may save one more recipient. */
  get canAddBeneficiary(): boolean {
    return beneficiaries.length < limits.beneficiaries
  },

  get selectedAccountId(): number | null {
    return selectedAccountId
  },

  get selectedAccount(): Account | null {
    return selectedAccountId === null ? null : this.account(selectedAccountId)
  },

  get totalBalance(): number {
    return totalBalance
  },

  get mainAccount(): Account | null {
    return mainAccount
  },

  get recentTransactions(): Transaction[] {
    return recentTransactions
  },

  /** Credits, debits and their difference over the last thirty days, every account included. */
  get monthly(): { credits: number; debits: number; net: number } {
    return monthly
  },

  /** Whether the character may open one more personal account. */
  get canOpenAccount(): boolean {
    return accounts.length < limits.accounts
  },

  select(accountId: number | null): void {
    selectedAccountId = accountId
  },

  account(accountId: number): Account | null {
    return accounts.find((account) => account.id === accountId) ?? null
  },

  transactionsOf(accountId: number): Transaction[] {
    return sorted.filter((transaction) => transaction.accountId === accountId)
  },

  /** The cards of an account that still exist, cancelled ones excluded. */
  cardsOf(accountId: number): Card[] {
    return cards.filter((card) => card.accountId === accountId && card.state !== 'cancelled')
  },

  canOrderCard(accountId: number): boolean {
    return this.cardsOf(accountId).length < limits.cardsPerAccount
  },

  /** The account of the customer that carries a number, if any. */
  accountByNumber(number: string): Account | null {
    return accounts.find((account) => account.number === number) ?? null
  },

  beneficiary(beneficiaryId: number): Beneficiary | null {
    return beneficiaries.find((entry) => entry.id === beneficiaryId) ?? null
  },

  /** A credit that reached one of the accounts, from another player or the game. */
  receive({
    accountId,
    amount,
    label,
    category = 'transfer',
  }: IncomingTransfer): Transaction | null {
    const value = Math.round(amount)

    if (
      !Number.isFinite(value) ||
      value <= 0 ||
      !accounts.some((account) => account.id === accountId)
    ) {
      return null
    }

    return record({ accountId, label, category, amount: value })
  },

  /** A movement of either sign on one of the accounts, for the browser's mock bank only. */
  move(accountId: number, amount: number, label: string, category: TransactionCategory): void {
    const value = Math.round(amount)

    if (value !== 0 && accounts.some((account) => account.id === accountId)) {
      record({ accountId, label, category, amount: value })
    }
  },

  /** What the game sends: any list given replaces the current one. */
  patch(data: Partial<BankData>): void {
    if (data.accounts) {
      accounts = data.accounts.map((account) => ({ ...account }))
    }

    if (data.cards) {
      cards = data.cards.map((card) => ({ ...card }))
    }

    if (data.transactions) {
      transactions = data.transactions.map((transaction) => ({ ...transaction }))
      nextId = transactions.reduce((max, entry) => Math.max(max, entry.id), 0) + 1
    }

    if (data.beneficiaries) {
      beneficiaries = data.beneficiaries.map((entry) => ({ ...entry }))
    }

    if (data.limits) {
      limits = {
        ...limits,
        ...data.limits,
        transfer: { ...limits.transfer, ...data.limits.transfer },
      }
    }

    if (
      selectedAccountId !== null &&
      !accounts.some((account) => account.id === selectedAccountId)
    ) {
      selectedAccountId = null
    }
  },
}
