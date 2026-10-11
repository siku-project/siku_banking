import {
  accountDigits,
  api,
  isAccountNumber,
  isLabel,
  type Reason,
  type Recipient,
} from '@/lib/api'
import { bank } from '@/lib/bank.svelte'

/** Where the money goes: one of the customer's accounts, a saved recipient, or a typed number. */
export type TransferTarget = 'mine' | 'beneficiary' | 'number'

export type TransferStep = 'form' | 'confirm' | 'done'

export interface TransferQuote {
  amount: number
  fee: number
  total: number
}

let fromAccountId = $state<number | null>(null)
let target = $state<TransferTarget>('mine')
let toAccountId = $state<number | null>(null)
let beneficiaryId = $state<number | null>(null)
let typedNumber = $state('')
let amountText = $state('')
let label = $state('')
let recipient = $state<Recipient | null>(null)
let verifying = $state(false)
let submitting = $state(false)
let step = $state<TransferStep>('form')
let error = $state<Reason | null>(null)
let lastFee = $state(0)

const fromAccount = $derived(fromAccountId === null ? null : bank.account(fromAccountId))

const amount = $derived.by(() => {
  const value = Number.parseInt(amountText, 10)

  return Number.isFinite(value) && value > 0 ? value : 0
})

const quote = $derived.by((): TransferQuote => {
  const { feeRate, feeFixed } = bank.limits.transfer
  const fee = amount > 0 ? Math.max(0, Math.round(amount * feeRate + feeFixed)) : 0

  return { amount, fee, total: amount + fee }
})

/** The number the transfer goes to, whatever way it was picked. */
const number = $derived.by((): string => {
  switch (target) {
    case 'mine':
      return toAccountId === null ? '' : (bank.account(toAccountId)?.number ?? '')
    case 'beneficiary':
      return beneficiaryId === null ? '' : (bank.beneficiary(beneficiaryId)?.number ?? '')
    default:
      return accountDigits(typedNumber)
  }
})

/** The holder shown for the target, verified or already known. */
const holder = $derived.by((): string => {
  if (target === 'mine') {
    return toAccountId === null ? '' : (bank.account(toAccountId)?.label ?? '')
  }

  if (target === 'beneficiary') {
    return beneficiaryId === null ? '' : (bank.beneficiary(beneficiaryId)?.holder ?? '')
  }

  return recipient?.number === number ? recipient.holder : ''
})

const amountValid = $derived.by((): boolean => {
  const { min, max } = bank.limits.transfer

  if (amount < min || (max !== false && amount > max)) {
    return false
  }

  return fromAccount !== null && quote.total <= fromAccount.balance
})

const targetValid = $derived(
  isAccountNumber(number) &&
    fromAccount !== null &&
    number !== fromAccount.number &&
    (target !== 'number' || holder !== ''),
)

const valid = $derived(
  fromAccount !== null &&
    fromAccount.state === 'active' &&
    targetValid &&
    amountValid &&
    isLabel(label, bank.limits.transfer.labelLength),
)

/** One transfer being prepared, confirmed, then done. */
export const transfer = {
  get fromAccountId(): number | null {
    return fromAccountId
  },

  get fromAccount() {
    return fromAccount
  },

  get target(): TransferTarget {
    return target
  },

  get toAccountId(): number | null {
    return toAccountId
  },

  get beneficiaryId(): number | null {
    return beneficiaryId
  },

  get typedNumber(): string {
    return typedNumber
  },

  get amountText(): string {
    return amountText
  },

  get amount(): number {
    return amount
  },

  get label(): string {
    return label
  },

  get recipient(): Recipient | null {
    return recipient
  },

  get number(): string {
    return number
  },

  get holder(): string {
    return holder
  },

  get quote(): TransferQuote {
    return quote
  },

  get amountValid(): boolean {
    return amountValid
  },

  get targetValid(): boolean {
    return targetValid
  },

  get valid(): boolean {
    return valid
  },

  get verifying(): boolean {
    return verifying
  },

  get submitting(): boolean {
    return submitting
  },

  get step(): TransferStep {
    return step
  },

  get error(): Reason | null {
    return error
  },

  get lastFee(): number {
    return lastFee
  },

  /** Whether the typed number still waits for the bank to say who holds it. */
  get needsVerification(): boolean {
    return target === 'number' && isAccountNumber(number) && holder === ''
  },

  setFrom(accountId: number | null): void {
    fromAccountId = accountId

    if (toAccountId === accountId) {
      toAccountId = null
    }
  },

  setTarget(value: TransferTarget): void {
    target = value
  },

  pickMine(accountId: number): void {
    target = 'mine'
    toAccountId = accountId
  },

  pickBeneficiary(id: number): void {
    target = 'beneficiary'
    beneficiaryId = id
  },

  setTypedNumber(value: string): void {
    typedNumber = accountDigits(value).slice(0, 12)

    if (recipient && recipient.number !== typedNumber) {
      recipient = null
    }
  },

  setAmountText(value: string): void {
    amountText = value.replace(/\D/g, '').slice(0, 12)
  },

  setLabel(value: string): void {
    label = value
  },

  /** Asks the bank who holds the typed number. */
  async verify(): Promise<boolean> {
    if (target !== 'number' || !isAccountNumber(number) || verifying) {
      return false
    }

    verifying = true
    error = null

    const outcome = await api.lookupRecipient({ number })

    verifying = false

    if (!outcome.ok || !outcome.recipient) {
      recipient = null
      error = outcome.reason ?? 'unknown_recipient'
      return false
    }

    recipient = outcome.recipient

    return true
  },

  /** Opens the confirmation once everything holds. */
  review(): void {
    if (valid) {
      step = 'confirm'
      error = null
    }
  },

  cancelReview(): void {
    if (step === 'confirm') {
      step = 'form'
    }
  },

  async confirm(): Promise<boolean> {
    if (!valid || submitting || fromAccountId === null) {
      return false
    }

    submitting = true
    error = null

    const outcome = await api.transfer({
      fromAccountId,
      number,
      amount,
      label: label.trim(),
    })

    submitting = false

    if (!outcome.ok) {
      error = outcome.reason ?? 'unreachable'
      step = 'form'
      return false
    }

    lastFee = outcome.fee ?? 0
    step = 'done'

    return true
  },

  /** Back to an empty form, the sender kept. */
  reset(): void {
    toAccountId = null
    beneficiaryId = null
    typedNumber = ''
    amountText = ''
    label = ''
    recipient = null
    error = null
    step = 'form'
  },

  /** Picks the main account as the sender when none is chosen yet. */
  prepare(): void {
    if (fromAccountId === null || !bank.account(fromAccountId)) {
      fromAccountId = bank.mainAccount?.id ?? null
    }

    if (target === 'mine' && bank.accounts.length < 2) {
      target = bank.beneficiaries.length > 0 ? 'beneficiary' : 'number'
    }
  },
}
