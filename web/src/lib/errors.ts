import type { Reason } from '@/lib/api'
import { m } from '@/lib/i18n.svelte'

/** The sentence shown for a refusal; unknown reasons fall back on a generic one. */
export const reasonMessage = (reason?: Reason): string => {
  switch (reason) {
    case 'unreachable':
      return m.error_unreachable()
    case 'already_onboarded':
      return m.error_already_onboarded()
    case 'unknown_account':
    case 'unknown_card':
      return m.error_unknown()
    case 'not_owner':
      return m.error_not_owner()
    case 'account_limit':
      return m.error_account_limit()
    case 'card_limit':
      return m.error_card_limit()
    case 'invalid_label':
      return m.error_invalid_label()
    case 'invalid_pin':
      return m.error_invalid_pin()
    case 'wrong_pin':
      return m.error_wrong_pin()
    case 'pin_locked':
      return m.error_pin_locked()
    case 'balance_not_zero':
      return m.error_balance_not_zero()
    case 'main_account':
      return m.error_main_account()
    case 'last_account':
      return m.error_last_account()
    case 'frozen':
      return m.error_frozen()
    case 'closed':
      return m.error_closed()
    case 'unknown_recipient':
      return m.error_unknown_recipient()
    case 'same_account':
      return m.error_same_account()
    case 'insufficient_balance':
      return m.error_insufficient_balance()
    case 'invalid_amount':
      return m.error_invalid_amount()
    case 'amount_limit':
      return m.error_amount_limit()
    case 'beneficiary_limit':
      return m.error_beneficiary_limit()
    case 'duplicate_beneficiary':
      return m.error_duplicate_beneficiary()
    case 'unknown_beneficiary':
      return m.error_unknown()
    case 'self_beneficiary':
      return m.error_self_beneficiary()
    case 'invalid_preferences':
      return m.error_invalid_preferences()
    case 'too_far':
      return m.error_too_far()
    case 'not_member':
      return m.error_not_member()
    default:
      return m.error_generic()
  }
}
