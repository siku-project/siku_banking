import { toast } from 'svelte-sonner'
import type { Outcome } from '@/lib/api'
import { reasonMessage } from '@/lib/errors'

/** Waits for an enterprise action, tells the customer how it went, and answers whether it went through. */
export const settleAction = async (
  pending: Promise<Outcome>,
  success: string,
): Promise<boolean> => {
  const outcome = await pending

  if (outcome.ok) {
    toast.success(success)
    return true
  }

  toast.error(reasonMessage(outcome.reason))

  return false
}
