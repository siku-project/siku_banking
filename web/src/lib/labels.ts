import {
  ArrowDownLeft,
  ArrowLeftRight,
  Banknote,
  Briefcase,
  Car,
  CircleDot,
  House,
  ShoppingBag,
  Ticket,
  Utensils,
  type LucideIcon,
} from '@lucide/svelte'
import type { TransactionCategory } from '@/lib/bank.svelte'
import { daysAgo, formatDate } from '@/lib/format'
import { m } from '@/lib/i18n.svelte'

/** Every category, in the order the filters show them. */
export const CATEGORIES: readonly TransactionCategory[] = [
  'salary',
  'transfer',
  'shopping',
  'food',
  'housing',
  'transport',
  'deposit',
  'withdrawal',
  'leisure',
  'other',
]

export const CATEGORY_ICONS: Record<TransactionCategory, LucideIcon> = {
  salary: Briefcase,
  transfer: ArrowLeftRight,
  shopping: ShoppingBag,
  food: Utensils,
  housing: House,
  transport: Car,
  deposit: ArrowDownLeft,
  withdrawal: Banknote,
  leisure: Ticket,
  other: CircleDot,
}

export const categoryLabel = (category: TransactionCategory): string => {
  switch (category) {
    case 'salary':
      return m.common_category_salary()
    case 'transfer':
      return m.common_category_transfer()
    case 'shopping':
      return m.common_category_shopping()
    case 'food':
      return m.common_category_food()
    case 'housing':
      return m.common_category_housing()
    case 'transport':
      return m.common_category_transport()
    case 'deposit':
      return m.common_category_deposit()
    case 'withdrawal':
      return m.common_category_withdrawal()
    case 'leisure':
      return m.common_category_leisure()
    default:
      return m.common_category_other()
  }
}

/** Today, yesterday, or the short date. */
export const dayLabel = (at: number, locale: string, long = false): string => {
  const days = daysAgo(at)

  if (days === 0) {
    return m.common_today()
  }

  if (days === 1) {
    return m.common_yesterday()
  }

  return formatDate(at, locale, long)
}
