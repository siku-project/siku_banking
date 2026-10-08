# siku_banking

The banking layer of the SIKU ecosystem — a secure, modular system for personal and business accounts, transfers, cards, ATMs and financial services. Built to integrate seamlessly with SIKU Core while keeping banking logic flexible and extensible.

The core keeps the money: every balance is a `Siku.accounts` account, every movement a journal line. The bank decides the products around it: who is a customer, what an account is called and numbered, which cards hang on it, who may switch to the enterprise side.

## Requirements

- `siku_core` 1.4.0 or newer
- `siku_target`
- `oxmysql`

## What it does today

- **First visit.** A character with no customer row is welcomed into an opening flow: identity confirmation, account name, optional bank card with a PIN, signature. One account and one customer row come out of it.
- **Accounts.** A customer owns up to `accounts.maxPerCharacter` personal accounts, each with a twelve-digit number and a name they choose. They can rename one, make one their main account, or close one whose balance is zero. Company accounts never show on this side: everything about a character's company belongs to the enterprise mode.
- **Cards.** Each account carries up to `cards.maxPerAccount` live cards, ordered with a four-digit PIN. A card can be blocked, unblocked, cancelled, and its PIN changed after giving the current one; too many wrong codes lock it for a while.
- **Transfers.** Immediate, from one personal account to one of the customer's other accounts, a saved beneficiary or a typed twelve-digit number, whose holder the bank confirms before anything moves. Amount, optional fee and a reference the recipient sees, all applied in one atomic batch of the core. Beneficiaries are saved by number and name, up to `transfers.beneficiaries.max`.
- **Activity.** The last journal lines of every visible account, categorised from the reason each mutation was written with: `category:label` reasons show their label, the category otherwise. The history page searches them by label, filters by account, direction, period and categories, reads them by day with the day's net, sums the selection, and loads deeper on request up to `history.maxLimit`. Every operation anywhere in the interface opens its detail.
- **Settings.** Kept per character in `bank_customers.preferences`: theme, opening animation, discreet mode masking every amount until hovered (also one click away in the header), in-game notifications for money received, money debited by someone else and a low-balance threshold, a customer profile, and a one-move block of every active card.
- **Enterprise mode.** A switch in the sidebar crosses to the companies the character runs. A company is a job of the core: it shows for every job where the character holds `enterprise.jobPermission`, with the grade label as their role. Its accounts are the core accounts the job owns; accounts another resource or an administrator opened for the job are adopted with a fresh number the first time the bank reads them. The side offers a dashboard (treasury, 30-day revenue, expenses and net with its trend, cash-flow curve, cards, spending by category), the accounts (rename, open, share of the treasury, employee access, company cards), transfers (to saved suppliers, another company account or any verified number, signed with the director's name) and statements (search, account, direction, period, author, categories). Teams and invoices are not the bank's business: a management or billing resource handles them.
- **Employee access.** A director gives an employee `view` or `spend` on a company account through the grants of the core, so `Siku.accounts.canAct(accountId, characterId, 'spend')` answers for any other resource. Employees come from `Siku.jobs.getMembers`; the bank never hires, fires or pays them.
- **Company cards.** One per employee, on one account, with a monthly cap and what it spent this month.

## Opening the bank

There is no command. Every branch of `config/branches.lua` has a banker behind its counter: the ped appears for a player within `banker.spawnDistance` and leaves once they are gone. Aiming at the banker with siku_target, in classic or free mode, offers **Access my accounts**, which opens the bank. The server only answers a player standing within `security.maxDistance` of a banker; another resource may still open the bank anywhere with `SetBankOpen(source, true)`, which lets that player in until the bank closes. Each branch also gets a map blip.

## Configuration

`config/branches.lua`:

| Key | Purpose |
| --- | --- |
| `banker.model`, `banker.scenario` | The advisor ped and what it does while waiting; a branch may carry its own `model`. |
| `banker.spawnDistance`, `banker.interactDistance` | When the ped appears, and how close the target option is offered. |
| `target.icon` | The icon of the option, from siku_target's icon map. |
| `blip.enabled`, `blip.sprite`, `blip.color`, `blip.scale` | The map marker of every branch. |
| `security.maxDistance` | How far from a banker the server still answers. |
| `branches` | Every agency: `name`, `label`, `banker` as `vector4` with the heading. |


`config/banking.lua`:

| Key | Purpose |
| --- | --- |
| `interface.theme` | The colour mode the interface starts in, `dark` or `light`. |
| `accounts.maxPerCharacter` | Personal accounts a character may own. |
| `accounts.labelLength` | Longest account name. |
| `accounts.numberPrefix`, `accounts.numberLength` | Shape of personal account numbers. |
| `cards.maxPerAccount` | Live cards per account. |
| `cards.validityYears` | Validity of a card from its order. |
| `cards.numberPrefix`, `cards.numberLength` | Shape of card numbers. |
| `cards.maxAttempts`, `cards.lockMinutes` | Wrong PINs tolerated before a lock, and its length. |
| `transfers.minAmount`, `transfers.maxAmount` | Bounds of one transfer, `false` for no cap. |
| `transfers.labelLength` | Longest reference on a transfer. |
| `transfers.fee.rate`, `transfers.fee.fixed` | Fee taken from the sender on top of the amount. |
| `transfers.fee.account` | Core account id credited with the fee, `false` to let it vanish. |
| `transfers.beneficiaries.max`, `transfers.beneficiaries.labelLength` | Saved recipients per customer and the length of their name. |
| `history.limit`, `history.maxLimit` | Journal lines read per account when the bank opens, and the most the history page may load. |
| `history.categories` | Journal reason first word to interface category. |
| `preferences.defaults` | What a customer starts with: `intro`, `discreet`, `notifyIncoming`, `notifyOutgoing`, `lowBalance`. |
| `preferences.lowBalanceMax` | Highest low-balance threshold a customer may set. |
| `enterprise.permission` | Staff permission that shows the enterprise switch. |
| `enterprise.jobPermission` | Job permission that shows it and makes the job one of the character's companies. |
| `enterprise.accounts.maxPerCompany`, `enterprise.accounts.numberPrefix`, `enterprise.accounts.labelLength` | Accounts per company, the start of their numbers, the length of their names. |
| `enterprise.cards.maxLimit` | Highest monthly cap of a company card. |
| `enterprise.suppliers.max`, `enterprise.suppliers.labelLength` | Saved suppliers per company and the length of their name. |
| `enterprise.historyLimit` | Journal lines read per company account. |

A job opts in by declaring the permission and granting it to the grades that run the company:

```lua
Siku.jobs.get('logistics'):register({
  label = 'Northern Freight Co.',
  permissions = { 'banking.enterprise' },
  grades = {
    { name = 'driver', label = 'Chauffeur', rank = 1, permissions = {} },
    { name = 'director', label = 'Directrice', rank = 2, permissions = { 'banking.enterprise' } },
  },
})
```

`config/translation.lua` picks the language; the strings live in `translations/<language>.lua` and reach the interface at startup, so a wording change never needs a rebuild.

## Tables

Declared in `config/migration.lua` and applied through `Siku.migration` once the core schema exists.

- `bank_accounts` — one row per account the bank serves: `account_id` (the core account), `owner_type` (`character` or `job`), `character_id` or `job_name`, `number`, `label`, `is_main`, `balance`, `cards`, `beneficiaries`. The balance is a copy of the core account's, written on every movement and put back in step when the character loads; the core stays the truth. `cards` is the JSON list of the linked cards: number, holder or employee, PIN, state, misses, lock, monthly cap, expiry. `beneficiaries` holds the saved suppliers of a company, on its main account.
- `bank_transfers` — one row per transfer: `from_account_id`, `to_account_id`, `amount`, `fee`, `label`, `performed_by`, `created_at`.
- `bank_customers` — one row per customer, what belongs to the person rather than to an account: `preferences` and `beneficiaries` as JSON, `onboarded_at`.

## Exports

Server side.

| Export | Returns |
| --- | --- |
| `GetCustomer(source)` | `{ firstName, lastName, birthDate, onboarded, enterprise }` or nil without a character. |
| `IsOnboarded(source)` | Whether the character opened their first account. |
| `IsEnterpriseAllowed(source)` | Whether the enterprise button shows for them. |
| `GetAccounts(source)` | The personal accounts of the character, `{ id, number, label, state, balance, main }`. |
| `GetMainAccount(source)` | The core account id of their main account, or nil. |
| `SetBankOpen(source, open)` | Opens or closes the bank on their screen. |

## Structure

```
config/        banking.lua, branches.lua, migration.lua, translation.lua
shared/        namespace.lua, modules/rules.lua, modules/locale.lua
server/        main.lua
server/modules preferences, store, customers, numbers, cards, accounts, recipients, beneficiaries,
               transfers, history, companies, enterprise, access, alerts, views, actions,
               company-actions, session, api
client/        main.lua
client/modules state, nui, ui, events, branches
web/           the Svelte 5 interface
```

The resource keeps one global, `Banking`, besides its configuration tables. Every module is a local table hung on it at the end of its file (`Banking.store = accountStore`) and reads what it needs at the top (`local accountStore <const> = Banking.store`), so the manifest lists the modules in the order they depend on each other. No module does anything while it loads: event handlers, callbacks and exports sit in `listen` or `register` functions that `server/main.lua` and `client/main.lua` call once everything is loaded.

## Game and interface

- **Opening.** The client asks `siku_banking:callback:session` and gets `{ customer, bank, enterprise, theme }`, pushes it with `siku_banking:nui:setData`, then shows the interface with `siku_banking:nui:setVisible`. The `siku_banking:nui:ready` callback answers the language, the `web` strings of `translations/<language>.lua` and the last session, so a wording edited in Lua reaches the interface without a rebuild.
- **Actions.** Every action of `Banking.rules.ACTIONS` goes `siku_banking:nui:<action>` → `siku_banking:callback:<action>`, the same name on both sides; the enterprise ones are prefixed `enterprise:` and carry the `companyId`, the id of the job. The server answers `{ ok, reason?, customer?, bank?, enterprise? }`; the interface applies what came back and tells the customer why when it was refused.
- **Freshness.** The core pushes `siku:client:accountsUpdated` and `siku:client:jobsUpdated`; an open bank asks its session again on either.
- **Translations.** `translations/<language>.lua` holds the Lua strings at the top and the interface strings in `web`; `bun run messages` compiles the `web` block to `web/messages/<language>.json` for Paraglide.

## Web

```
cd web
bun install
bun run dev      # browser, mock server, ?scenario=rich|empty|new, ?intro=0, ?theme=light
bun run check    # locales, prettier, svelte-check, lint
bun run build
```
