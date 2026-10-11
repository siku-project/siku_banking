const REDUCED_MAX_MS = 80

/** Whether the player asked the system for less motion. */
export const reducedMotion: boolean =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** A transition duration, cut short when the player prefers reduced motion. */
export const duration = (ms: number): number => (reducedMotion ? Math.min(ms, REDUCED_MAX_MS) : ms)

/** A stagger delay, dropped entirely when the player prefers reduced motion. */
export const stagger = (index: number, step: number, base = 0): number =>
  reducedMotion ? 0 : base + index * step
