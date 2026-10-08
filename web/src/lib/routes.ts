import type { RouteDefinition } from 'svelte-spa-router'
import {
  ArrowLeftRight,
  History,
  LayoutDashboard,
  Settings,
  WalletCards,
  type LucideIcon,
} from '@lucide/svelte'
import AccountsPage from '@/components/bank/pages/AccountsPage.svelte'
import DashboardPage from '@/components/bank/pages/DashboardPage.svelte'
import EnterpriseAccountsPage from '@/components/bank/pages/EnterpriseAccountsPage.svelte'
import EnterpriseDashboardPage from '@/components/bank/pages/EnterpriseDashboardPage.svelte'
import EnterpriseHistoryPage from '@/components/bank/pages/EnterpriseHistoryPage.svelte'
import EnterpriseTransfersPage from '@/components/bank/pages/EnterpriseTransfersPage.svelte'
import HistoryPage from '@/components/bank/pages/HistoryPage.svelte'
import SettingsPage from '@/components/bank/pages/SettingsPage.svelte'
import TransfersPage from '@/components/bank/pages/TransfersPage.svelte'
import { PATHS } from '@/lib/paths'

export { PATHS }

export type NavigationLabelKey =
  'nav_dashboard' | 'nav_accounts' | 'nav_transfers' | 'nav_history' | 'nav_settings'

export interface NavigationItem {
  key: string
  labelKey: NavigationLabelKey
  icon: LucideIcon
  /** The route the entry opens; an entry without one is announced, not built yet. */
  path?: string
}

/** The route map the router mounts. */
export const routes: RouteDefinition = {
  [PATHS.dashboard]: DashboardPage,
  [PATHS.accounts]: AccountsPage,
  [PATHS.transfers]: TransfersPage,
  [PATHS.history]: HistoryPage,
  [PATHS.settings]: SettingsPage,
  [PATHS.enterprise]: EnterpriseDashboardPage,
  [PATHS.enterpriseAccounts]: EnterpriseAccountsPage,
  [PATHS.enterpriseTransfers]: EnterpriseTransfersPage,
  [PATHS.enterpriseHistory]: EnterpriseHistoryPage,
  '*': DashboardPage,
}

/** The entries of the sidebar on the personal side, in order. */
export const navigation: NavigationItem[] = [
  { key: 'dashboard', labelKey: 'nav_dashboard', icon: LayoutDashboard, path: PATHS.dashboard },
  { key: 'accounts', labelKey: 'nav_accounts', icon: WalletCards, path: PATHS.accounts },
  { key: 'transfers', labelKey: 'nav_transfers', icon: ArrowLeftRight, path: PATHS.transfers },
  { key: 'history', labelKey: 'nav_history', icon: History, path: PATHS.history },
  { key: 'settings', labelKey: 'nav_settings', icon: Settings, path: PATHS.settings },
]

/** The entries of the sidebar on the enterprise side, in order. */
export const enterpriseNavigation: NavigationItem[] = [
  { key: 'dashboard', labelKey: 'nav_dashboard', icon: LayoutDashboard, path: PATHS.enterprise },
  {
    key: 'accounts',
    labelKey: 'nav_accounts',
    icon: WalletCards,
    path: PATHS.enterpriseAccounts,
  },
  {
    key: 'transfers',
    labelKey: 'nav_transfers',
    icon: ArrowLeftRight,
    path: PATHS.enterpriseTransfers,
  },
  { key: 'history', labelKey: 'nav_history', icon: History, path: PATHS.enterpriseHistory },
]

/** Whether a sidebar entry covers the current location. */
export const isActivePath = (path: string | undefined, location: string): boolean =>
  path !== undefined && location === path
