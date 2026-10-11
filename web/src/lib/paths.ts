/** Every route of the bank, kept apart from the route map so stores can link without importing pages. */
export const PATHS = {
  dashboard: '/',
  accounts: '/accounts',
  transfers: '/transfers',
  history: '/history',
  settings: '/settings',
  enterprise: '/enterprise',
  enterpriseAccounts: '/enterprise/accounts',
  enterpriseTransfers: '/enterprise/transfers',
  enterpriseHistory: '/enterprise/history',
} as const
