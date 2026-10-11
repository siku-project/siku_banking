import type { AccountState, CardState, TransactionCategory } from '@/lib/bank.svelte'
import { mockCompanies } from '@/lib/mock-enterprise'

/** What an employee may do on a company account. */
export type AccessLevel = 'view' | 'spend'

export interface AccountAccess {
  memberId: number
  level: AccessLevel
}

export interface CompanyAccount {
  id: number
  number: string
  label: string
  state: AccountState
  balance: number
  /** The account the company runs on. */
  main: boolean
  access: AccountAccess[]
}

export interface CompanyCard {
  id: number
  accountId: number
  /** The employee the card was issued to. */
  memberId: number
  last4: string
  /** What the card may spend per month. */
  limit: number
  /** What it spent this month. */
  spent: number
  expiresAt: number
  state: Exclude<CardState, 'cancelled'>
}

export interface CompanyOperation {
  id: number
  accountId: number
  label: string
  category: TransactionCategory
  /** Signed: credits above zero, debits below. */
  amount: number
  /** Unix time in milliseconds. */
  at: number
  /** Who made it: an employee, or the bank for automatic movements. */
  author: string
}

/**
 * An employee of the company, as the job side knows them. The bank only
 * reads this list, to give access to accounts and to issue cards.
 */
export interface Member {
  id: number
  name: string
  /** The grade label the job side gives them. */
  role: string
}

/** A saved recipient of the company: supplier, partner, landlord. */
export interface Supplier {
  id: number
  label: string
  number: string
  holder: string
}

export interface Company {
  id: number
  name: string
  /** The job behind the company, `logistics`. */
  job: string
  /** The grade label of the customer in it, `Directrice`. */
  role: string
  accounts: CompanyAccount[]
  operations: CompanyOperation[]
  members: Member[]
  cards: CompanyCard[]
  suppliers: Supplier[]
}

export interface CompanyPoint {
  /** The start of the day, in milliseconds. */
  day: number
  credits: number
  debits: number
  /** The treasury at the end of the day. */
  balance: number
}

export interface CompanySummary {
  treasury: number
  credits: number
  debits: number
  net: number
  /** How the net moved against the thirty days before, as a share, null without a base. */
  trend: number | null
}

export interface CategoryShare {
  category: TransactionCategory
  amount: number
  share: number
}

export interface CardsSummary {
  active: number
  blocked: number
  /** Spent this month across every card. */
  spent: number
  /** The monthly caps added up. */
  limit: number
}

const DAY_MS = 86_400_000
const PERIOD_DAYS = 30
const RECENT_COUNT = 7
const TOP_CATEGORIES = 5

const startOfDay = (at: number): number => {
  const date = new Date(at)

  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

const initialCompanies = (): Company[] => (import.meta.env.DEV ? mockCompanies() : [])

let companies = $state<Company[]>(initialCompanies())
let selectedId = $state<number | null>(null)

const company = $derived(companies.find((entry) => entry.id === selectedId) ?? companies[0] ?? null)

const operations = $derived(company ? [...company.operations].sort((a, b) => b.at - a.at) : [])

const treasury = $derived(
  company ? company.accounts.reduce((sum, account) => sum + account.balance, 0) : 0,
)

const totals = (from: number, to: number): { credits: number; debits: number } => {
  let credits = 0
  let debits = 0

  for (const operation of operations) {
    if (operation.at < from || operation.at >= to) {
      continue
    }

    if (operation.amount >= 0) {
      credits += operation.amount
    } else {
      debits -= operation.amount
    }
  }

  return { credits, debits }
}

const summary = $derived.by((): CompanySummary => {
  const now = Date.now()
  const current = totals(now - PERIOD_DAYS * DAY_MS, now + DAY_MS)
  const previous = totals(now - 2 * PERIOD_DAYS * DAY_MS, now - PERIOD_DAYS * DAY_MS)
  const net = current.credits - current.debits
  const before = previous.credits - previous.debits

  return {
    treasury,
    credits: current.credits,
    debits: current.debits,
    net,
    trend: before === 0 ? null : (net - before) / Math.abs(before),
  }
})

/** The treasury day by day over the period, walked back from today's balance. */
const series = $derived.by((): CompanyPoint[] => {
  const today = startOfDay(Date.now())
  const points: CompanyPoint[] = []
  let balance = treasury
  let cursor = 0

  for (let offset = 0; offset < PERIOD_DAYS; offset += 1) {
    const day = today - offset * DAY_MS
    let credits = 0
    let debits = 0

    while (cursor < operations.length && operations[cursor]!.at >= day) {
      const amount = operations[cursor]!.amount

      if (amount >= 0) {
        credits += amount
      } else {
        debits -= amount
      }

      cursor += 1
    }

    points.push({ day, credits, debits, balance })
    balance -= credits - debits
  }

  return points.reverse()
})

const spending = $derived.by((): CategoryShare[] => {
  const since = Date.now() - PERIOD_DAYS * DAY_MS
  const sums: Partial<Record<TransactionCategory, number>> = {}
  let total = 0

  for (const operation of operations) {
    if (operation.at < since || operation.amount >= 0) {
      continue
    }

    sums[operation.category] = (sums[operation.category] ?? 0) - operation.amount
    total -= operation.amount
  }

  return (Object.entries(sums) as [TransactionCategory, number][])
    .map(([category, amount]) => ({ category, amount, share: total === 0 ? 0 : amount / total }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, TOP_CATEGORIES)
})

const members = $derived(
  company ? [...company.members].sort((a, b) => a.name.localeCompare(b.name)) : [],
)

const cards = $derived.by((): CardsSummary => {
  const result: CardsSummary = { active: 0, blocked: 0, spent: 0, limit: 0 }

  for (const card of company?.cards ?? []) {
    result.active += card.state === 'active' ? 1 : 0
    result.blocked += card.state === 'blocked' ? 1 : 0
    result.spent += card.spent
    result.limit += card.limit
  }

  return result
})

/** The companies the customer runs, and the banking figures of the one on screen. */
export const enterprise = {
  get companies(): Company[] {
    return companies
  },

  get company(): Company | null {
    return company
  },

  get summary(): CompanySummary {
    return summary
  },

  get series(): CompanyPoint[] {
    return series
  },

  get spending(): CategoryShare[] {
    return spending
  },

  get recent(): CompanyOperation[] {
    return operations.slice(0, RECENT_COUNT)
  },

  get operations(): CompanyOperation[] {
    return operations
  },

  /** The employees, by name. */
  get members(): Member[] {
    return members
  },

  get cards(): CardsSummary {
    return cards
  },

  select(companyId: number): void {
    selectedId = companyId
  },

  account(accountId: number): CompanyAccount | null {
    return company?.accounts.find((account) => account.id === accountId) ?? null
  },

  member(memberId: number): Member | null {
    return company?.members.find((member) => member.id === memberId) ?? null
  },

  cardsOf(accountId: number): CompanyCard[] {
    return company?.cards.filter((card) => card.accountId === accountId) ?? []
  },

  cardOf(memberId: number): CompanyCard | null {
    return company?.cards.find((card) => card.memberId === memberId) ?? null
  },

  operationsOf(accountId: number): CompanyOperation[] {
    return operations.filter((operation) => operation.accountId === accountId)
  },

  /** What the game sends: the list given replaces the current one. */
  patch(list: Company[]): void {
    companies = list.map((entry) => ({ ...entry }))

    if (selectedId !== null && !companies.some((entry) => entry.id === selectedId)) {
      selectedId = null
    }
  },
}
