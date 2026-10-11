import type { Transaction } from '@/lib/bank.svelte'

let transaction = $state<Transaction | null>(null)

/** The operation the customer opened to read every detail of. */
export const inspector = {
  get transaction(): Transaction | null {
    return transaction
  },

  get open(): boolean {
    return transaction !== null
  },

  show(value: Transaction): void {
    transaction = value
  },

  close(): void {
    transaction = null
  },
}
