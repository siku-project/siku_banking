import {
  accountDigits,
  api,
  isAccountNumber,
  isLabel,
  type Reason,
  type Recipient,
} from '@/lib/api'
import { enterpriseApi } from '@/lib/enterprise-api'
import { enterprise, type CompanyAccount } from '@/lib/enterprise.svelte'

/** Where company money goes: another company account, a saved supplier, or a typed number. */
export type CompanyTarget = 'internal' | 'supplier' | 'number'

export type CompanyTransferStep = 'form' | 'confirm' | 'done'

const LABEL_MAX = 40

let fromAccountId = $state<number | null>(null)
let target = $state<CompanyTarget>('supplier')
let toAccountId = $state<number | null>(null)
let supplierId = $state<number | null>(null)
let typedNumber = $state('')
let amountText = $state('')
let label = $state('')
let recipient = $state<Recipient | null>(null)
let verifying = $state(false)
let submitting = $state(false)
let step = $state<CompanyTransferStep>('form')
let error = $state<Reason | null>(null)

const accounts = $derived(enterprise.company?.accounts ?? [])

const fromAccount = $derived(accounts.find((account) => account.id === fromAccountId) ?? null)

const amount = $derived.by(() => {
  const value = Number.parseInt(amountText, 10)

  return Number.isFinite(value) && value > 0 ? value : 0
})

const supplier = $derived(
  enterprise.company?.suppliers.find((entry) => entry.id === supplierId) ?? null,
)

const internal = $derived(accounts.find((account) => account.id === toAccountId) ?? null)

const number = $derived.by((): string => {
  switch (target) {
    case 'internal':
      return internal?.number ?? ''
    case 'supplier':
      return supplier?.number ?? ''
    default:
      return accountDigits(typedNumber)
  }
})

const holder = $derived.by((): string => {
  if (target === 'internal') {
    return internal ? `${enterprise.company?.name ?? ''} · ${internal.label}` : ''
  }

  if (target === 'supplier') {
    return supplier?.label ?? ''
  }

  return recipient?.number === number ? recipient.holder : ''
})

const amountValid = $derived(fromAccount !== null && amount > 0 && amount <= fromAccount.balance)

const valid = $derived(
  fromAccount !== null &&
    fromAccount.state === 'active' &&
    isAccountNumber(number) &&
    number !== fromAccount.number &&
    holder !== '' &&
    amountValid &&
    isLabel(label, LABEL_MAX),
)

/** One company transfer being prepared, confirmed, then done. */
export const companyTransfer = {
  get fromAccountId(): number | null {
    return fromAccountId
  },

  get fromAccount(): CompanyAccount | null {
    return fromAccount
  },

  get target(): CompanyTarget {
    return target
  },

  get toAccountId(): number | null {
    return toAccountId
  },

  get supplierId(): number | null {
    return supplierId
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

  get number(): string {
    return number
  },

  get holder(): string {
    return holder
  },

  get amountValid(): boolean {
    return amountValid
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

  get step(): CompanyTransferStep {
    return step
  },

  get error(): Reason | null {
    return error
  },

  get labelMax(): number {
    return LABEL_MAX
  },

  setFrom(accountId: number): void {
    fromAccountId = accountId

    if (toAccountId === accountId) {
      toAccountId = null
    }
  },

  setTarget(value: CompanyTarget): void {
    target = value
  },

  pickInternal(accountId: number): void {
    target = 'internal'
    toAccountId = accountId
  },

  pickSupplier(id: number): void {
    target = 'supplier'
    supplierId = id
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

  async verify(): Promise<void> {
    if (target !== 'number' || !isAccountNumber(number) || verifying) {
      return
    }

    verifying = true
    error = null

    const outcome = await api.lookupRecipient({ number })

    verifying = false

    if (!outcome.ok || !outcome.recipient) {
      recipient = null
      error = outcome.reason ?? 'unknown_recipient'
      return
    }

    recipient = outcome.recipient
  },

  review(): void {
    if (valid) {
      step = 'confirm'
    }
  },

  cancelReview(): void {
    if (step === 'confirm') {
      step = 'form'
    }
  },

  async confirm(): Promise<boolean> {
    const company = enterprise.company

    if (!valid || submitting || !company || fromAccountId === null) {
      return false
    }

    submitting = true
    error = null

    const outcome = await enterpriseApi.transfer({
      companyId: company.id,
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

    step = 'done'

    return true
  },

  reset(): void {
    toAccountId = null
    supplierId = null
    typedNumber = ''
    amountText = ''
    label = ''
    recipient = null
    error = null
    step = 'form'
  },

  /** Picks the main company account as the sender when none fits yet. */
  prepare(): void {
    if (fromAccountId === null || !accounts.some((account) => account.id === fromAccountId)) {
      fromAccountId = accounts.find((account) => account.main)?.id ?? accounts[0]?.id ?? null
    }

    if (target === 'supplier' && (enterprise.company?.suppliers.length ?? 0) === 0) {
      target = accounts.length > 1 ? 'internal' : 'number'
    }
  },
}
