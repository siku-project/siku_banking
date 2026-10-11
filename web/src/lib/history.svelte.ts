import { SvelteSet } from 'svelte/reactivity'
import { api } from '@/lib/api'
import { bank, type Transaction, type TransactionCategory } from '@/lib/bank.svelte'

export type HistoryDirection = 'all' | 'in' | 'out'
export type HistoryPeriod = '7' | '30' | '90' | 'all'

export interface HistorySummary {
  count: number
  credits: number
  debits: number
  net: number
}

export interface HistoryGroup {
  /** The start of the day, in milliseconds. */
  day: number
  net: number
  items: Transaction[]
}

export const HISTORY_PERIODS: readonly HistoryPeriod[] = ['7', '30', '90', 'all']

const DAY_MS = 86_400_000
const PAGE = 40

let query = $state('')
let accountId = $state<number | null>(null)
let direction = $state<HistoryDirection>('all')
let period = $state<HistoryPeriod>('30')
const categories = new SvelteSet<TransactionCategory>()
let loading = $state(false)
let depth = $state(PAGE)
let exhausted = $state(false)

const startOfDay = (at: number): number => {
  const date = new Date(at)

  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

const normalize = (value: string): string =>
  value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

const results = $derived.by((): Transaction[] => {
  const needle = normalize(query)
  const since = period === 'all' ? 0 : Date.now() - Number(period) * DAY_MS

  return bank.transactions.filter((transaction) => {
    if (transaction.at < since) {
      return false
    }

    if (accountId !== null && transaction.accountId !== accountId) {
      return false
    }

    if (direction === 'in' && transaction.amount < 0) {
      return false
    }

    if (direction === 'out' && transaction.amount >= 0) {
      return false
    }

    if (categories.size > 0 && !categories.has(transaction.category)) {
      return false
    }

    return needle === '' || normalize(transaction.label).includes(needle)
  })
})

const summary = $derived.by((): HistorySummary => {
  let credits = 0
  let debits = 0

  for (const transaction of results) {
    if (transaction.amount >= 0) {
      credits += transaction.amount
    } else {
      debits -= transaction.amount
    }
  }

  return { count: results.length, credits, debits, net: credits - debits }
})

const groups = $derived.by((): HistoryGroup[] => {
  const list: HistoryGroup[] = []
  let current: HistoryGroup | null = null

  for (const transaction of results) {
    const day = startOfDay(transaction.at)

    if (!current || current.day !== day) {
      current = { day, net: 0, items: [] }
      list.push(current)
    }

    current.net += transaction.amount
    current.items.push(transaction)
  }

  return list
})

const filtered = $derived(
  query !== '' || accountId !== null || direction !== 'all' || categories.size > 0,
)

/** The whole history, searched and filtered, read by day. */
export const history = {
  get query(): string {
    return query
  },

  get accountId(): number | null {
    return accountId
  },

  get direction(): HistoryDirection {
    return direction
  },

  get period(): HistoryPeriod {
    return period
  },

  get categories(): SvelteSet<TransactionCategory> {
    return categories
  },

  get results(): Transaction[] {
    return results
  },

  get summary(): HistorySummary {
    return summary
  },

  get groups(): HistoryGroup[] {
    return groups
  },

  /** Whether anything narrows the list beyond the period. */
  get filtered(): boolean {
    return filtered
  },

  get loading(): boolean {
    return loading
  },

  /** Whether the bank may still hold older lines than what is loaded. */
  get canLoadMore(): boolean {
    return !exhausted && !loading
  },

  setQuery(value: string): void {
    query = value
  },

  setAccount(value: number | null): void {
    accountId = value
  },

  setDirection(value: HistoryDirection): void {
    direction = value
  },

  setPeriod(value: HistoryPeriod): void {
    period = value
  },

  toggleCategory(category: TransactionCategory): void {
    if (categories.has(category)) {
      categories.delete(category)
    } else {
      categories.add(category)
    }
  },

  clear(): void {
    query = ''
    accountId = null
    direction = 'all'
    categories.clear()
  },

  /** Asks the bank for older lines; stops asking once nothing new comes. */
  async loadMore(): Promise<void> {
    if (loading || exhausted) {
      return
    }

    loading = true

    const before = bank.transactions.length
    const wanted = depth + PAGE
    const outcome = await api.loadHistory({ limit: wanted })

    loading = false

    if (!outcome.ok) {
      return
    }

    depth = wanted
    exhausted = bank.transactions.length === before
  },

  /** Forgets what was loaded so the next opening starts fresh. */
  reset(): void {
    depth = PAGE
    exhausted = false
    loading = false
  },
}
