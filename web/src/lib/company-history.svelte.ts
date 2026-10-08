import { SvelteSet } from 'svelte/reactivity'
import type { TransactionCategory } from '@/lib/bank.svelte'
import { enterprise, type CompanyOperation } from '@/lib/enterprise.svelte'
import type { HistoryDirection, HistoryPeriod, HistorySummary } from '@/lib/history.svelte'

export interface CompanyHistoryGroup {
  /** The start of the day, in milliseconds. */
  day: number
  net: number
  items: CompanyOperation[]
}

const DAY_MS = 86_400_000

let query = $state('')
let accountId = $state<number | null>(null)
let author = $state<string | null>(null)
let direction = $state<HistoryDirection>('all')
let period = $state<HistoryPeriod>('30')
const categories = new SvelteSet<TransactionCategory>()

const startOfDay = (at: number): number => {
  const date = new Date(at)

  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

const normalize = (value: string): string =>
  value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

/** Everyone who moved company money, by name. */
const authors = $derived(
  [...new Set(enterprise.operations.map((operation) => operation.author))].sort((a, b) =>
    a.localeCompare(b),
  ),
)

const results = $derived.by((): CompanyOperation[] => {
  const needle = normalize(query)
  const since = period === 'all' ? 0 : Date.now() - Number(period) * DAY_MS

  return enterprise.operations.filter((operation) => {
    if (operation.at < since) {
      return false
    }

    if (accountId !== null && operation.accountId !== accountId) {
      return false
    }

    if (author !== null && operation.author !== author) {
      return false
    }

    if (direction === 'in' && operation.amount < 0) {
      return false
    }

    if (direction === 'out' && operation.amount >= 0) {
      return false
    }

    if (categories.size > 0 && !categories.has(operation.category)) {
      return false
    }

    return needle === '' || normalize(operation.label).includes(needle)
  })
})

const summary = $derived.by((): HistorySummary => {
  let credits = 0
  let debits = 0

  for (const operation of results) {
    if (operation.amount >= 0) {
      credits += operation.amount
    } else {
      debits -= operation.amount
    }
  }

  return { count: results.length, credits, debits, net: credits - debits }
})

const groups = $derived.by((): CompanyHistoryGroup[] => {
  const list: CompanyHistoryGroup[] = []
  let current: CompanyHistoryGroup | null = null

  for (const operation of results) {
    const day = startOfDay(operation.at)

    if (!current || current.day !== day) {
      current = { day, net: 0, items: [] }
      list.push(current)
    }

    current.net += operation.amount
    current.items.push(operation)
  }

  return list
})

const filtered = $derived(
  query !== '' ||
    accountId !== null ||
    author !== null ||
    direction !== 'all' ||
    categories.size > 0,
)

/** The statements of the company on screen, searched and filtered, read by day. */
export const companyHistory = {
  get query(): string {
    return query
  },

  get accountId(): number | null {
    return accountId
  },

  get author(): string | null {
    return author
  },

  get authors(): string[] {
    return authors
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

  get summary(): HistorySummary {
    return summary
  },

  get groups(): CompanyHistoryGroup[] {
    return groups
  },

  get filtered(): boolean {
    return filtered
  },

  setQuery(value: string): void {
    query = value
  },

  setAccount(value: number | null): void {
    accountId = value
  },

  setAuthor(value: string | null): void {
    author = value
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
    author = null
    direction = 'all'
    categories.clear()
  },
}
