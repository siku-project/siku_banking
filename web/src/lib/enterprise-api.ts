import { call, ENTERPRISE_PREFIX, type Outcome } from '@/lib/api'
import type { CardState } from '@/lib/bank.svelte'
import type { AccessLevel } from '@/lib/enterprise.svelte'

interface CompanyPayload {
  companyId: number
}

export interface CompanyAccountPayload extends CompanyPayload {
  accountId: number
}

export interface CompanyAccessPayload extends CompanyAccountPayload {
  memberId: number
  /** The access given, null to take it away. */
  level: AccessLevel | null
}

export interface IssueCardPayload extends CompanyAccountPayload {
  memberId: number
  limit: number
}

export interface CompanyCardPayload extends CompanyPayload {
  cardId: number
}

export interface CompanyCardStatePayload extends CompanyCardPayload {
  state: Exclude<CardState, 'cancelled'>
}

export interface CompanyCardLimitPayload extends CompanyCardPayload {
  limit: number
}

export interface CompanyTransferPayload extends CompanyPayload {
  fromAccountId: number
  number: string
  amount: number
  label: string
}

export interface SupplierPayload extends CompanyPayload {
  number: string
  label: string
}

const ask = <P>(name: string, payload: P): Promise<Outcome> =>
  call(`${ENTERPRISE_PREFIX}${name}`, payload)

/** Every action of the enterprise side, each one carrying the company it acts on. */
export const enterpriseApi = {
  openAccount: (payload: CompanyPayload & { label: string }): Promise<Outcome> =>
    ask('openAccount', payload),
  renameAccount: (payload: CompanyAccountPayload & { label: string }): Promise<Outcome> =>
    ask('renameAccount', payload),
  setAccess: (payload: CompanyAccessPayload): Promise<Outcome> => ask('setAccess', payload),
  issueCard: (payload: IssueCardPayload): Promise<Outcome> => ask('issueCard', payload),
  setCardState: (payload: CompanyCardStatePayload): Promise<Outcome> =>
    ask('setCardState', payload),
  setCardLimit: (payload: CompanyCardLimitPayload): Promise<Outcome> =>
    ask('setCardLimit', payload),
  transfer: (payload: CompanyTransferPayload): Promise<Outcome> => ask('transfer', payload),
  addSupplier: (payload: SupplierPayload): Promise<Outcome> => ask('addSupplier', payload),
  removeSupplier: (payload: CompanyPayload & { supplierId: number }): Promise<Outcome> =>
    ask('removeSupplier', payload),
}
