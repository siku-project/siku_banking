BankingConfig = {
  --- Interface
  ---
  --- The bank opens at the counter of a branch, from the banker, see
  --- config/branches.lua. `theme` is the colour mode a new customer
  --- starts in: 'dark' or 'light'.
  interface = {
    theme = 'dark',
  },

  --- Accounts
  ---
  --- What a character may hold at the bank. The core keeps the balances;
  --- the bank decides the products around them.
  ---
  --- `maxPerCharacter` counts the personal accounts a character owns.
  --- `labelLength` bounds the name a customer gives an account.
  --- `numberPrefix` starts every personal account number; `numberLength`
  --- is the total number of digits.
  ---
  --- Company accounts never show on this side: they belong to the
  --- enterprise mode.
  accounts = {
    maxPerCharacter = 3,
    labelLength = 24,
    numberPrefix = '4021',
    numberLength = 12,
  },

  --- Cards
  ---
  --- One card belongs to one account. A cancelled card never comes back.
  ---
  --- `maxPerAccount` counts the live cards of an account.
  --- `validityYears` is how long a card stays valid from its order.
  --- `maxAttempts` wrong codes lock the card for `lockMinutes`.
  cards = {
    maxPerAccount = 2,
    validityYears = 3,
    numberPrefix = '5312',
    numberLength = 16,
    maxAttempts = 3,
    lockMinutes = 15,
  },

  --- Transfers
  ---
  --- A transfer moves money from one personal account to any account that
  --- carries a number, the customer's own ones included, in one atomic
  --- batch of the core.
  ---
  --- `minAmount` and `maxAmount` bound one transfer; false means no cap.
  --- `labelLength` bounds the wording the customer attaches to it.
  --- `fee.rate` is a share of the amount, `fee.fixed` a flat sum, both
  --- taken from the sender on top of the amount; `fee.account` is the core
  --- account id credited with the fee, false to let it vanish.
  --- `beneficiaries.max` bounds the saved recipients of a customer.
  transfers = {
    minAmount = 1,
    maxAmount = false,
    labelLength = 40,
    fee = { rate = 0, fixed = 0, account = false },
    beneficiaries = { max = 20, labelLength = 24 },
  },

  --- History
  ---
  --- How many journal lines each account shows, newest first, and how a
  --- journal reason maps to a category of the interface. The reason is
  --- matched on its first word, lower-cased: a resource writing
  --- 'salary:police' lands in the salary category, and what follows the
  --- colon becomes the label shown.
  --- `limit` is what opens with the bank; `maxLimit` is how far the
  --- history page may load on request.
  history = {
    limit = 40,
    maxLimit = 300,
    categories = {
      salary = 'salary',
      paycheck = 'salary',
      transfer = 'transfer',
      opening = 'deposit',
      deposit = 'deposit',
      withdrawal = 'withdrawal',
      withdraw = 'withdrawal',
      purchase = 'shopping',
      shop = 'shopping',
      food = 'food',
      rent = 'housing',
      housing = 'housing',
      fuel = 'transport',
      transport = 'transport',
      leisure = 'leisure',
    },
  },

  --- Preferences
  ---
  --- What a customer starts with before touching their settings, kept per
  --- character. The theme falls back on `interface.theme`.
  ---
  --- `intro` plays the opening animation, `discreet` masks every amount
  --- until hovered, `notifyIncoming` and `notifyOutgoing` send an in-game
  --- notification when money reaches or leaves an account while the bank
  --- is closed, `lowBalance` warns once a balance falls under it, 0 off.
  --- `lowBalanceMax` bounds the threshold a customer may set.
  preferences = {
    defaults = {
      intro = true,
      discreet = false,
      notifyIncoming = true,
      notifyOutgoing = false,
      lowBalance = 0,
    },
    lowBalanceMax = 1000000,
  },

  --- Enterprise
  ---
  --- A company is a job of the core, its accounts are the core accounts the
  --- job owns. The side opens for a character holding the staff
  --- `permission`, or the `jobPermission` on one of its jobs: a job
  --- declares it and grants it to the grades that run the company. Only the
  --- jobs where the character holds `jobPermission` show as companies. Set
  --- either to false to ignore that path.
  ---
  --- `accounts.maxPerCompany` bounds the accounts a company holds and
  --- `accounts.numberPrefix` starts their numbers. `cards.maxLimit` is the
  --- highest monthly cap of a company card. `historyLimit` is the journal
  --- lines read per company account. Employees are given `view` or `spend`
  --- on an account through the grants of the core.
  enterprise = {
    permission = 'banking.enterprise',
    jobPermission = 'banking.enterprise',
    accounts = {
      maxPerCompany = 5,
      numberPrefix = '9100',
      labelLength = 40,
    },
    cards = {
      maxLimit = 100000,
    },
    suppliers = {
      max = 30,
      labelLength = 24,
    },
    historyLimit = 80,
  },
}
