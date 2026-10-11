import type { TransactionCategory } from '@/lib/bank.svelte'
import type { Company, CompanyOperation, Member } from '@/lib/enterprise.svelte'

const DAY_MS = 86_400_000
const HOUR_MS = 3_600_000
const HISTORY_DAYS = 60
const SEED = 20260929

interface Recurring {
  label: string
  category: TransactionCategory
  /** Every how many days it comes back. */
  every: number
  min: number
  max: number
  sign: 1 | -1
  author: string
  accountId: number
}

/** A small seeded generator, so the mock company tells the same story on every reload. */
const generator = (seed: number): (() => number) => {
  let state = seed

  return () => {
    state = (state + 0x6d2b79f5) | 0

    let value = Math.imul(state ^ (state >>> 15), 1 | state)

    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

const FREIGHT: Recurring[] = [
  {
    label: 'Contrat Port Authority',
    category: 'transfer',
    every: 4,
    min: 6_200,
    max: 11_800,
    sign: 1,
    author: 'Élise Marchand',
    accountId: 11,
  },
  {
    label: 'Contrat Meridian Logistics',
    category: 'transfer',
    every: 9,
    min: 9_000,
    max: 17_500,
    sign: 1,
    author: 'Tobias Okafor',
    accountId: 11,
  },
  {
    label: 'Livraison express',
    category: 'deposit',
    every: 2,
    min: 450,
    max: 1_900,
    sign: 1,
    author: 'Ravi Anand',
    accountId: 11,
  },
  {
    label: 'Paie équipe',
    category: 'salary',
    every: 7,
    min: 9_400,
    max: 9_800,
    sign: -1,
    author: 'Banque SIKU',
    accountId: 11,
  },
  {
    label: 'Carburant flotte',
    category: 'transport',
    every: 3,
    min: 620,
    max: 1_480,
    sign: -1,
    author: 'Tobias Okafor',
    accountId: 11,
  },
  {
    label: 'Loyer entrepôt',
    category: 'housing',
    every: 30,
    min: 3_400,
    max: 3_400,
    sign: -1,
    author: 'Banque SIKU',
    accountId: 11,
  },
  {
    label: 'Assurance véhicules',
    category: 'other',
    every: 15,
    min: 2_180,
    max: 2_180,
    sign: -1,
    author: 'Banque SIKU',
    accountId: 11,
  },
  {
    label: 'Pièces et entretien',
    category: 'shopping',
    every: 6,
    min: 280,
    max: 1_150,
    sign: -1,
    author: 'Ravi Anand',
    accountId: 11,
  },
  {
    label: 'Mise en réserve',
    category: 'transfer',
    every: 14,
    min: 5_000,
    max: 5_000,
    sign: 1,
    author: 'Élise Marchand',
    accountId: 12,
  },
]

const CAFE: Recurring[] = [
  {
    label: 'Recette du jour',
    category: 'deposit',
    every: 1,
    min: 380,
    max: 1_150,
    sign: 1,
    author: 'Maud Delcourt',
    accountId: 21,
  },
  {
    label: 'Fournisseur café',
    category: 'food',
    every: 7,
    min: 640,
    max: 980,
    sign: -1,
    author: 'Élise Marchand',
    accountId: 21,
  },
  {
    label: 'Paie équipe',
    category: 'salary',
    every: 14,
    min: 2_400,
    max: 2_400,
    sign: -1,
    author: 'Banque SIKU',
    accountId: 21,
  },
  {
    label: 'Loyer local',
    category: 'housing',
    every: 30,
    min: 1_800,
    max: 1_800,
    sign: -1,
    author: 'Banque SIKU',
    accountId: 21,
  },
]

/** Plays the recurring movements over the last days, newest first. */
const operationsOf = (recurring: Recurring[], now: number): CompanyOperation[] => {
  const random = generator(SEED)
  const operations: CompanyOperation[] = []
  let id = 1

  for (let day = HISTORY_DAYS; day >= 0; day -= 1) {
    for (const entry of recurring) {
      if ((day + entry.label.length) % entry.every !== 0) {
        continue
      }

      const amount = Math.round(entry.min + random() * (entry.max - entry.min))
      const hour = 8 + Math.floor(random() * 10)

      operations.push({
        id: id++,
        accountId: entry.accountId,
        label: entry.label,
        category: entry.category,
        amount: entry.sign * amount,
        at: now - day * DAY_MS - (new Date(now).getHours() - hour) * HOUR_MS,
        author: entry.author,
      })
    }
  }

  return operations.filter((operation) => operation.at <= now)
}

const FREIGHT_TEAM: [string, string][] = [
  ['Élise Marchand', 'Directrice'],
  ['Tobias Okafor', 'Chef d’équipe'],
  ['Ravi Anand', 'Chef d’équipe'],
  ['Maud Delcourt', 'Régulatrice'],
  ['Jonas Varga', 'Régulateur'],
  ['Léa Fontaine', 'Chauffeuse'],
  ['Samir Haddad', 'Chauffeur'],
  ['Nora Lindqvist', 'Chauffeuse'],
  ['Hugo Berthier', 'Chauffeur'],
  ['Inès Moreau', 'Chauffeuse'],
]

const CAFE_TEAM: [string, string][] = [
  ['Élise Marchand', 'Associée'],
  ['Maud Delcourt', 'Barista'],
  ['Lucas Perrin', 'Serveur'],
  ['Sofia Nakamura', 'Serveuse'],
]

const membersOf = (team: [string, string][], base: number): Member[] =>
  team.map(([name, role], index) => ({ id: base + index, name, role }))

/** The development companies of the mock customer. */
export const mockCompanies = (now = Date.now()): Company[] => [
  {
    id: 1,
    name: 'Northern Freight Co.',
    job: 'logistics',
    role: 'Directrice',
    accounts: [
      {
        id: 11,
        number: '910055120043',
        label: 'Compte d’exploitation',
        state: 'active',
        balance: 126_780,
        main: true,
        access: [
          { memberId: 101, level: 'spend' },
          { memberId: 102, level: 'spend' },
          { memberId: 103, level: 'view' },
        ],
      },
      {
        id: 12,
        number: '910055120051',
        label: 'Réserve',
        state: 'active',
        balance: 48_000,
        main: false,
        access: [{ memberId: 101, level: 'view' }],
      },
    ],
    operations: operationsOf(FREIGHT, now),
    members: membersOf(FREIGHT_TEAM, 100),
    cards: [
      {
        id: 1,
        accountId: 11,
        memberId: 101,
        last4: '7741',
        limit: 5_000,
        spent: 3_860,
        expiresAt: now + 900 * DAY_MS,
        state: 'active',
      },
      {
        id: 2,
        accountId: 11,
        memberId: 102,
        last4: '2208',
        limit: 3_000,
        spent: 940,
        expiresAt: now + 700 * DAY_MS,
        state: 'active',
      },
      {
        id: 3,
        accountId: 11,
        memberId: 105,
        last4: '5316',
        limit: 1_500,
        spent: 1_480,
        expiresAt: now + 400 * DAY_MS,
        state: 'blocked',
      },
    ],
    suppliers: [
      { id: 1, label: 'Garage Xero', number: '402173350904', holder: 'Ravi Anand' },
      { id: 2, label: 'SCI Terminal Nord', number: '402190031562', holder: 'Maud Delcourt' },
    ],
  },
  {
    id: 2,
    name: 'Café Lumen',
    job: 'restaurant',
    role: 'Associée',
    accounts: [
      {
        id: 21,
        number: '910055130022',
        label: 'Compte d’exploitation',
        state: 'active',
        balance: 18_420,
        main: true,
        access: [{ memberId: 201, level: 'spend' }],
      },
    ],
    operations: operationsOf(CAFE, now),
    members: membersOf(CAFE_TEAM, 200),
    cards: [],
    suppliers: [],
  },
]
