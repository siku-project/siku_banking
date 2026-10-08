const ACCOUNT_GROUP = 4
const DAY_MS = 86_400_000

const amountFormats = new Map<string, Intl.NumberFormat>()
const dateFormats = new Map<string, Intl.DateTimeFormat>()

const amountFormat = (locale: string, signed: boolean): Intl.NumberFormat => {
  const key = `${locale}:${signed}`
  let format = amountFormats.get(key)

  if (!format) {
    format = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      signDisplay: signed ? 'exceptZero' : 'auto',
    })
    amountFormats.set(key, format)
  }

  return format
}

const dateFormat = (locale: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat => {
  const key = `${locale}:${JSON.stringify(options)}`
  let format = dateFormats.get(key)

  if (!format) {
    format = new Intl.DateTimeFormat(locale, options)
    dateFormats.set(key, format)
  }

  return format
}

/** A whole-dollar amount, `$1,250` or `1 250 $`, with an explicit sign when asked. */
export const formatAmount = (value: number, locale: string, signed = false): string =>
  amountFormat(locale, signed).format(Math.round(value)).replace('-', '−')

/** Twelve digits read in groups of four, `4021 7730 1185`. */
export const formatAccountNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  const groups: string[] = []

  for (let index = 0; index < digits.length; index += ACCOUNT_GROUP) {
    groups.push(digits.slice(index, index + ACCOUNT_GROUP))
  }

  return groups.join(' ')
}

/** A masked card number, `•••• •••• •••• 4821`. */
export const formatCardNumber = (last4: string): string => `•••• •••• •••• ${last4}`

/** A card expiry, `09/28`. */
export const formatExpiry = (at: number): string => {
  const date = new Date(at)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)

  return `${month}/${year}`
}

/** An ISO day, `1994-03-12`, as a long date in the running language. */
export const formatIsoDay = (value: string, locale: string): string => {
  const at = Date.parse(value)

  return Number.isNaN(at) ? value : formatDate(at, locale, true)
}

const percentFormats = new Map<string, Intl.NumberFormat>()

/** A share as a percentage, `12,4 %`, with an explicit sign when asked. */
export const formatPercent = (share: number, locale: string, signed = false): string => {
  const key = `${locale}:${signed}`
  let format = percentFormats.get(key)

  if (!format) {
    format = new Intl.NumberFormat(locale, {
      style: 'percent',
      maximumFractionDigits: 1,
      signDisplay: signed ? 'exceptZero' : 'auto',
    })
    percentFormats.set(key, format)
  }

  return format.format(share).replace('-', '−')
}

/** A short day, `28 Sep`, or with the year when `long`. */
export const formatDate = (at: number, locale: string, long = false): string =>
  dateFormat(
    locale,
    long ? { day: 'numeric', month: 'long', year: 'numeric' } : { day: 'numeric', month: 'short' },
  ).format(new Date(at))

/** The time of day, `14:05`. */
export const formatTime = (at: number, locale: string): string =>
  dateFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(new Date(at))

/** How many calendar days ago a moment was, 0 for today. */
export const daysAgo = (at: number, now = Date.now()): number => {
  const start = (value: number): number => {
    const date = new Date(value)
    date.setHours(0, 0, 0, 0)
    return date.getTime()
  }

  return Math.round((start(now) - start(at)) / DAY_MS)
}
