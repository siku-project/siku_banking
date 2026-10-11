import { toast } from 'svelte-sonner'
import { api } from '@/lib/api'
import { reasonMessage } from '@/lib/errors'
import { session, type Preferences } from '@/lib/session.svelte'
import { theme } from '@/lib/theme.svelte'

let saving = $state(false)

/** The customer's settings: applied at once, kept by the game, put back when it refuses. */
export const preferences = {
  get value(): Preferences {
    return session.customer.preferences
  },

  get saving(): boolean {
    return saving
  },

  async save(patch: Partial<Preferences>): Promise<boolean> {
    const previous = { ...session.customer.preferences }

    session.setCustomer({ preferences: { ...previous, ...patch } })

    if (patch.theme) {
      theme.set(patch.theme)
    }

    saving = true

    const outcome = await api.savePreferences({ preferences: patch })

    saving = false

    if (outcome.ok) {
      return true
    }

    session.setCustomer({ preferences: previous })
    theme.set(previous.theme)
    toast.error(reasonMessage(outcome.reason))

    return false
  },

  toggleTheme(): Promise<boolean> {
    return preferences.save({ theme: theme.isDark ? 'light' : 'dark' })
  },

  toggleDiscreet(): Promise<boolean> {
    return preferences.save({ discreet: !session.customer.preferences.discreet })
  },
}
