local customerStore <const> = Banking.customers
local enterpriseAccess <const> = Banking.enterprise
local personalAccounts <const> = Banking.accounts
local cardStore <const> = Banking.cards
local historyReader <const> = Banking.history
local beneficiaryBook <const> = Banking.beneficiaries
local companyStore <const> = Banking.companies

local CUSTOMER_NUMBER <const> = 'SK-%06d'

local sessionViews <const> = {}

--- The character a session plays.
---@param sessionId any The player server id.
---@return number? characterId The character id, or nil.
function sessionViews.characterOf(sessionId)
  if type(sessionId) ~= 'number' then
    return nil
  end

  return Siku.cache.getCurrentCharacterId(sessionId)
end

--- Who the customer is, as the interface greets them.
---@param characterId number The character id.
---@return table customer { firstName, lastName, birthDate, onboarded, enterprise, number, since, preferences }.
function sessionViews.customer(characterId)
  local character <const> = Siku.cache.getCharacter(characterId) or {}
  local record <const> = customerStore.get(characterId)

  return {
    firstName = character.firstName or '',
    lastName = character.lastName or '',
    birthDate = character.dob or '',
    onboarded = record ~= nil,
    enterprise = enterpriseAccess.isAllowed(characterId),
    number = CUSTOMER_NUMBER:format(characterId),
    since = record and record.onboardedAt or 0,
    preferences = customerStore.preferencesOf(characterId),
  }
end

--- Everything the interface shows about the character's own money.
---@param characterId number The character id.
---@return table bank { accounts, cards, transactions, beneficiaries, limits }.
function sessionViews.bank(characterId)
  local accounts <const> = personalAccounts.describe(characterId)
  local transfers <const> = BankingConfig.transfers

  return {
    accounts = accounts,
    cards = cardStore.describe(characterId),
    transactions = historyReader.describe(accounts),
    beneficiaries = beneficiaryBook.describe(characterId),
    limits = {
      accounts = BankingConfig.accounts.maxPerCharacter,
      cardsPerAccount = BankingConfig.cards.maxPerAccount,
      labelLength = BankingConfig.accounts.labelLength,
      beneficiaries = transfers.beneficiaries.max,
      transfer = {
        min = transfers.minAmount,
        max = transfers.maxAmount or false,
        labelLength = transfers.labelLength,
        feeRate = transfers.fee.rate,
        feeFixed = transfers.fee.fixed,
      },
    },
  }
end

--- The companies the character runs, empty when the enterprise side is closed to them.
---@param characterId number The character id.
---@return table companies The list the interface shows.
function sessionViews.enterprise(characterId)
  return enterpriseAccess.isAllowed(characterId) and companyStore.describe(characterId) or {}
end

--- The whole session of a player, for the interface to open on.
---@param sessionId number The player server id.
---@return table? session { customer, bank, enterprise, theme }, or nil without a character.
function sessionViews.describe(sessionId)
  local characterId <const> = sessionViews.characterOf(sessionId)

  if not characterId then
    return nil
  end

  local customer <const> = sessionViews.customer(characterId)

  return {
    customer = customer,
    bank = sessionViews.bank(characterId),
    enterprise = sessionViews.enterprise(characterId),
    theme = customer.preferences.theme,
  }
end

Banking.views = sessionViews
