local rules <const> = Banking.rules
local preferenceRules <const> = Banking.preferences
local accountStore <const> = Banking.store
local customerStore <const> = Banking.customers
local cardStore <const> = Banking.cards
local personalAccounts <const> = Banking.accounts
local recipientBook <const> = Banking.recipients
local beneficiaryBook <const> = Banking.beneficiaries
local transferService <const> = Banking.transfers
local historyReader <const> = Banking.history
local sessionViews <const> = Banking.views

local personalActions <const> = {}

local CARD_STATES <const> = rules.CARD_STATES

--- A refused outcome.
---@param reason string Why.
---@return table outcome { ok = false, reason }.
local function refuse(reason)
  return { ok = false, reason = reason }
end

--- A successful outcome carrying the bank data again, since every action
--- moves at least one list.
---@param characterId number The character id.
---@param customer? table Customer fields that changed.
---@return table outcome { ok = true, bank, customer? }.
local function accept(characterId, customer)
  return { ok = true, bank = sessionViews.bank(characterId), customer = customer }
end

--- The name printed on a card: the character's full name, upper-cased.
---@param characterId number The character id.
---@return string holder The holder.
local function holderOf(characterId)
  local character <const> = Siku.cache.getCharacter(characterId) or {}
  local name <const> = ('%s %s'):format(character.firstName or '', character.lastName or '')

  return name:match('^%s*(.-)%s*$'):upper()
end

--- A live card the character holds on one of their accounts.
---@param characterId number The character id.
---@param data table The request.
---@return table? card The cache entry, nil when refused.
---@return string? reason Why it was refused.
local function ownedCard(characterId, data)
  local cardId <const> = rules.id(data.cardId)

  if not cardId then
    return nil, 'unknown_card'
  end

  local card <const>, entry <const> = cardStore.get(characterId, cardId)

  if not card then
    return nil, 'unknown_card'
  end

  local account <const>, reason <const> = personalAccounts.owned(characterId, entry.accountId)

  if not account then
    return nil, reason
  end

  return card
end

--- The first opening: the account, the customer row, and the card when
--- the customer asked for one.
---@param characterId number The character id.
---@param data table { label, pin? }.
---@return table outcome The outcome.
function personalActions.onboard(characterId, data)
  if customerStore.isOnboarded(characterId) then
    return refuse('already_onboarded')
  end

  local label <const> = rules.label(data.label, BankingConfig.accounts.labelLength)

  if not label then
    return refuse('invalid_label')
  end

  local pin <const> = data.pin

  if pin ~= nil and not rules.isPin(pin) then
    return refuse('invalid_pin')
  end

  local accountId <const>, reason <const> = personalAccounts.open(characterId, label, true)

  if not accountId then
    return refuse(reason)
  end

  if not customerStore.create(characterId) then
    Siku.accounts.close(accountId, characterId)
    accountStore.remove(characterId, accountId)
    return refuse('write_failed')
  end

  if pin ~= nil then
    cardStore.order(characterId, accountId, holderOf(characterId), pin)
  end

  return accept(characterId, { onboarded = true })
end

--- One more personal account.
---@param characterId number The character id.
---@param data table { label }.
---@return table outcome The outcome.
function personalActions.openAccount(characterId, data)
  if not customerStore.isOnboarded(characterId) then
    return refuse('not_onboarded')
  end

  local label <const> = rules.label(data.label, BankingConfig.accounts.labelLength)

  if not label then
    return refuse('invalid_label')
  end

  local main <const> = customerStore.mainOf(characterId) == nil
  local accountId <const>, reason <const> = personalAccounts.open(characterId, label, main)

  if not accountId then
    return refuse(reason)
  end

  return accept(characterId)
end

--- A new name on an account.
---@param characterId number The character id.
---@param data table { accountId, label }.
---@return table outcome The outcome.
function personalActions.renameAccount(characterId, data)
  local accountId <const> = rules.id(data.accountId)
  local label <const> = rules.label(data.label, BankingConfig.accounts.labelLength)

  if not accountId then
    return refuse('unknown_account')
  end

  if not label then
    return refuse('invalid_label')
  end

  local renamed <const>, reason <const> = personalAccounts.rename(characterId, accountId, label)

  if not renamed then
    return refuse(reason or 'write_failed')
  end

  return accept(characterId)
end

--- Another account as the main one.
---@param characterId number The character id.
---@param data table { accountId }.
---@return table outcome The outcome.
function personalActions.setMainAccount(characterId, data)
  local accountId <const> = rules.id(data.accountId)

  if not accountId then
    return refuse('unknown_account')
  end

  local account <const>, reason <const> = personalAccounts.owned(characterId, accountId)

  if not account then
    return refuse(reason)
  end

  if account.state ~= 'active' then
    return refuse(account.state)
  end

  if not customerStore.setMain(characterId, accountId) then
    return refuse('write_failed')
  end

  return accept(characterId)
end

--- An account closed for good.
---@param characterId number The character id.
---@param data table { accountId }.
---@return table outcome The outcome.
function personalActions.closeAccount(characterId, data)
  local accountId <const> = rules.id(data.accountId)

  if not accountId then
    return refuse('unknown_account')
  end

  local closed <const>, reason <const> = personalAccounts.close(characterId, accountId)

  if not closed then
    return refuse(reason or 'write_failed')
  end

  return accept(characterId)
end

--- A card on one of the character's accounts.
---@param characterId number The character id.
---@param data table { accountId, pin }.
---@return table outcome The outcome.
function personalActions.orderCard(characterId, data)
  local accountId <const> = rules.id(data.accountId)

  if not accountId then
    return refuse('unknown_account')
  end

  if not rules.isPin(data.pin) then
    return refuse('invalid_pin')
  end

  local account <const>, reason <const> = personalAccounts.owned(characterId, accountId)

  if not account then
    return refuse(reason)
  end

  if account.state ~= 'active' then
    return refuse(account.state)
  end

  local card <const>, refused <const> =
    cardStore.order(characterId, accountId, holderOf(characterId), data.pin)

  if not card then
    return refuse(refused)
  end

  return accept(characterId)
end

--- A card blocked or unblocked.
---@param characterId number The character id.
---@param data table { cardId, state }.
---@return table outcome The outcome.
function personalActions.setCardState(characterId, data)
  if not rules.isRequestableCardState(data.state) then
    return refuse('invalid_state')
  end

  local card <const>, reason <const> = ownedCard(characterId, data)

  if not card then
    return refuse(reason)
  end

  local changed <const>, refused <const> = cardStore.setState(characterId, card.id, data.state)

  if not changed then
    return refuse(refused)
  end

  return accept(characterId)
end

--- A card cancelled for good.
---@param characterId number The character id.
---@param data table { cardId }.
---@return table outcome The outcome.
function personalActions.cancelCard(characterId, data)
  local card <const>, reason <const> = ownedCard(characterId, data)

  if not card then
    return refuse(reason)
  end

  local cancelled <const>, refused <const> = cardStore.cancel(characterId, card.id)

  if not cancelled then
    return refuse(refused)
  end

  return accept(characterId)
end

--- Who stands behind an account number, before a transfer is confirmed.
---@param _ number The character id.
---@param data table { number }.
---@return table outcome { ok, recipient = { number, holder } } or a refusal.
function personalActions.lookupRecipient(_, data)
  local number <const> = recipientBook.number(data.number)

  if not number then
    return refuse('unknown_recipient')
  end

  local recipient <const> = recipientBook.byNumber(number)

  if not recipient then
    return refuse('unknown_recipient')
  end

  return { ok = true, recipient = { number = recipient.number, holder = recipient.holder } }
end

--- Money moved from one of the character's accounts to a number.
---@param characterId number The character id.
---@param data table { fromAccountId, number, amount, label }.
---@return table outcome The outcome, with `fee` when it moved.
function personalActions.transfer(characterId, data)
  local fromAccountId <const> = rules.id(data.fromAccountId)
  local number <const> = recipientBook.number(data.number)
  local label <const> = rules.label(data.label, BankingConfig.transfers.labelLength)

  if not fromAccountId then
    return refuse('unknown_account')
  end

  if not number then
    return refuse('unknown_recipient')
  end

  if not label then
    return refuse('invalid_label')
  end

  local amount <const>, invalid <const> = transferService.amount(data.amount)

  if not amount then
    return refuse(invalid)
  end

  local recipient <const> = recipientBook.byNumber(number)

  if not recipient then
    return refuse('unknown_recipient')
  end

  local moved <const>, reason <const>, fee <const> =
    transferService.execute(characterId, fromAccountId, recipient, amount, label)

  if not moved then
    return refuse(reason or 'write_failed')
  end

  local outcome <const> = accept(characterId)

  outcome.fee = fee

  return outcome
end

--- A recipient saved for later transfers.
---@param characterId number The character id.
---@param data table { number, label }.
---@return table outcome The outcome.
function personalActions.addBeneficiary(characterId, data)
  local number <const> = recipientBook.number(data.number)
  local label <const> =
    rules.label(data.label, BankingConfig.transfers.beneficiaries.labelLength)

  if not number then
    return refuse('unknown_recipient')
  end

  if not label then
    return refuse('invalid_label')
  end

  local recipient <const> = recipientBook.byNumber(number)

  if not recipient then
    return refuse('unknown_recipient')
  end

  if recipient.ownerId == characterId then
    return refuse('self_beneficiary')
  end

  local entry <const>, reason <const> =
    beneficiaryBook.add(characterId, recipient.accountId, label)

  if not entry then
    return refuse(reason)
  end

  return accept(characterId)
end

--- A saved recipient forgotten.
---@param characterId number The character id.
---@param data table { beneficiaryId }.
---@return table outcome The outcome.
function personalActions.removeBeneficiary(characterId, data)
  local id <const> = rules.id(data.beneficiaryId)

  if not id then
    return refuse('unknown_beneficiary')
  end

  local removed <const>, reason <const> = beneficiaryBook.remove(characterId, id)

  if not removed then
    return refuse(reason)
  end

  return accept(characterId)
end

--- A deeper history, when the customer scrolls past what opened with the bank.
---@param characterId number The character id.
---@param data table { limit }.
---@return table outcome { ok, bank = { transactions } }.
function personalActions.loadHistory(characterId, data)
  local accounts <const> = personalAccounts.describe(characterId)
  local limit <const> = historyReader.limit(data.limit)

  return { ok = true, bank = { transactions = historyReader.describe(accounts, limit) } }
end

--- Settings the customer changed.
---@param characterId number The character id.
---@param data table { preferences }.
---@return table outcome { ok, customer = { preferences } } or a refusal.
function personalActions.savePreferences(characterId, data)
  local patch <const> = preferenceRules.validate(data.preferences)

  if not patch then
    return refuse('invalid_preferences')
  end

  local preferences <const>, reason <const> = customerStore.setPreferences(characterId, patch)

  if not preferences then
    return refuse(reason)
  end

  return { ok = true, customer = { preferences = preferences } }
end

--- Every active card of the customer blocked at once, when one went missing.
---@param characterId number The character id.
---@return table outcome The outcome, with `count` the cards blocked.
function personalActions.blockAllCards(characterId)
  local accounts <const> = personalAccounts.describe(characterId)
  local count = 0

  for index = 1, #accounts do
    local cards <const> = cardStore.ofAccount(characterId, accounts[index].id)

    for position = 1, #cards do
      local card <const> = cards[position]

      if card.state == CARD_STATES.ACTIVE
        and cardStore.setState(characterId, card.id, CARD_STATES.BLOCKED) then
        count = count + 1
      end
    end
  end

  local outcome <const> = accept(characterId)

  outcome.count = count

  return outcome
end

--- A new PIN on a card.
---@param characterId number The character id.
---@param data table { cardId, currentPin, pin }.
---@return table outcome The outcome.
function personalActions.changePin(characterId, data)
  if not rules.isPin(data.currentPin) or not rules.isPin(data.pin) then
    return refuse('invalid_pin')
  end

  if data.currentPin == data.pin then
    return refuse('invalid_pin')
  end

  local card <const>, reason <const> = ownedCard(characterId, data)

  if not card then
    return refuse(reason)
  end

  if card.state == CARD_STATES.CANCELLED then
    return refuse('closed')
  end

  local changed <const>, refused <const> =
    cardStore.changePin(characterId, card.id, data.currentPin, data.pin)

  if not changed then
    return refuse(refused)
  end

  return accept(characterId)
end

Banking.actions = personalActions
