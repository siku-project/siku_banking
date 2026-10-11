import { describe, expect, it } from 'vitest'
import { applyTranslations, m } from './i18n.svelte'
import { locale } from './locale.svelte'

describe('i18n', () => {
  it('serves the compiled message when the game sent nothing', () => {
    expect(m.common_close()).toBe('Fermer')
  })

  it('prefers the string the game pushed for the running language', () => {
    applyTranslations(locale.current, { common_close: 'Quitter' })

    expect(m.common_close()).toBe('Quitter')
  })

  it('fills placeholders in a pushed string', () => {
    applyTranslations(locale.current, { intro_greeting: 'Bienvenue, {name}' })

    expect(m.intro_greeting({ name: 'Élise' })).toBe('Bienvenue, Élise')
  })

  it('switches the language along with the strings', () => {
    applyTranslations('en', { common_close: 'Leave' })

    expect(locale.current).toBe('en')
    expect(m.common_close()).toBe('Leave')
    expect(m.nav_soon()).toBe('Soon')
  })
})
