local rules <const> = Banking.rules
local accountStore <const> = Banking.store
local numberPool <const> = Banking.numbers

local cardStore <const> = {}

local STATES <const> = rules.CARD_STATES
local YEAR_SECONDS <const> = 365 * 86400
local MINUTE_SECONDS <const> = 60
local LAST_DIGITS <const> = 4
local ID_SPAN <const> = 1000

--- Cards live on their bank account, in its `cards` list. A card id is the
--- account id times a thousand plus its rank on the account, so a card is
--- found from its id alone. A cancelled card leaves the list.

--- The account a card id belongs to.
---@param cardId number The card id.
---@return number accountId The account id.
local function accountOf(cardId)
  return cardId // ID_SPAN
end

--- The next free id on an account.
---@param entry table The bank account.
---@return number id The card id.
local function nextId(entry)
  local highest = entry.accountId * ID_SPAN

  for index = 1, #entry.cards do
    highest = math.max(highest, entry.cards[index].id)
  end

  return highest + 1
end

--- One card of a character, with the bank account holding it.
---@param characterId number The character id.
---@param cardId number The card id.
---@return table? card The card, or nil.
---@return table? entry The bank account.
function cardStore.get(characterId, cardId)
  local entry <const> = accountStore.get(characterId, accountOf(cardId))

  if not entry then
    return nil
  end

  for index = 1, #entry.cards do
    if entry.cards[index].id == cardId then
      return entry.cards[index], entry
    end
  end

  return nil
end

--- The cards of a character on one account.
---@param characterId number The character id.
---@param accountId number The account id.
---@return table cards The list.
function cardStore.ofAccount(characterId, accountId)
  local entry <const> = accountStore.get(characterId, accountId)

  return entry and entry.cards or {}
end

--- How many cards an account carries.
---@param characterId number The character id.
---@param accountId number The account id.
---@return number count The count.
function cardStore.count(characterId, accountId)
  return #cardStore.ofAccount(characterId, accountId)
end

--- Orders a card on an account. The caller checked the account is the
--- character's and active; the bank checks its own limits.
---@param characterId number The character id.
---@param accountId number The account id.
---@param holder string The name printed on the card.
---@param pin string The four digits the holder chose.
---@return table? card The card, nil when refused.
---@return string? reason Why it was refused.
function cardStore.order(characterId, accountId, holder, pin)
  local entry <const> = accountStore.get(characterId, accountId)

  if not entry then
    return nil, 'unknown_account'
  end

  if #entry.cards >= BankingConfig.cards.maxPerAccount then
    return nil, 'card_limit'
  end

  local number <const> = numberPool.card()

  if not number then
    return nil, 'write_failed'
  end

  local card <const> = {
    id = nextId(entry),
    number = number,
    holder = holder,
    pin = pin,
    state = STATES.ACTIVE,
    attempts = 0,
    lockedUntil = false,
    expiresAt = os.time() + BankingConfig.cards.validityYears * YEAR_SECONDS,
  }

  entry.cards[#entry.cards + 1] = card

  if not accountStore.saveCards(characterId, accountId) then
    entry.cards[#entry.cards] = nil
    return nil, 'write_failed'
  end

  return card
end

--- Blocks or unblocks a card.
---@param characterId number The character id.
---@param cardId number The card id.
---@param state string `active` or `blocked`.
---@return boolean changed Whether the card moved.
---@return string? reason Why it was refused.
function cardStore.setState(characterId, cardId, state)
  local card <const>, entry <const> = cardStore.get(characterId, cardId)

  if not card then
    return false, 'unknown_card'
  end

  if card.state == state then
    return false, 'invalid_state'
  end

  local previous <const> = card.state

  card.state = state

  if not accountStore.saveCards(characterId, entry.accountId) then
    card.state = previous
    return false, 'write_failed'
  end

  return true
end

--- Cancels a card for good: it leaves the account's list.
---@param characterId number The character id.
---@param cardId number The card id.
---@return boolean cancelled Whether the card is gone.
---@return string? reason Why it was refused.
function cardStore.cancel(characterId, cardId)
  local card <const>, entry <const> = cardStore.get(characterId, cardId)

  if not card then
    return false, 'unknown_card'
  end

  for index = #entry.cards, 1, -1 do
    if entry.cards[index] == card then
      table.remove(entry.cards, index)
    end
  end

  if not accountStore.saveCards(characterId, entry.accountId) then
    entry.cards[#entry.cards + 1] = card
    return false, 'write_failed'
  end

  return true
end

--- Checks a PIN against a card, counting the misses and locking the card
--- after too many of them.
---@param card table The card.
---@param pin string The PIN offered.
---@return boolean accepted Whether the PIN is right.
---@return string? reason `pin_locked` or `wrong_pin`.
local function verify(card, pin)
  local now <const> = os.time()

  if card.lockedUntil and card.lockedUntil > now then
    return false, 'pin_locked'
  end

  if card.pin == pin then
    card.attempts = 0
    card.lockedUntil = false
    return true
  end

  local rule <const> = BankingConfig.cards

  card.attempts = card.attempts + 1

  if card.attempts >= rule.maxAttempts then
    card.attempts = 0
    card.lockedUntil = now + rule.lockMinutes * MINUTE_SECONDS

    return false, 'pin_locked'
  end

  return false, 'wrong_pin'
end

--- Changes the PIN of a card, once the current one was given.
---@param characterId number The character id.
---@param cardId number The card id.
---@param currentPin string The PIN in use.
---@param pin string The PIN wanted.
---@return boolean changed Whether the PIN moved.
---@return string? reason Why it was refused.
function cardStore.changePin(characterId, cardId, currentPin, pin)
  local card <const>, entry <const> = cardStore.get(characterId, cardId)

  if not card then
    return false, 'unknown_card'
  end

  local accepted <const>, reason <const> = verify(card, currentPin)

  if accepted then
    card.pin = pin
  end

  if not accountStore.saveCards(characterId, entry.accountId) then
    return false, 'write_failed'
  end

  return accepted, reason
end

--- The cards of a character as the interface shows them: the last digits
--- only, the PIN never.
---@param characterId number The character id.
---@return table cards The list of { id, accountId, last4, holder, expiresAt, state }.
function cardStore.describe(characterId)
  local list <const> = {}
  local entries <const> = accountStore.list(characterId)

  for index = 1, #entries do
    local entry <const> = entries[index]

    for position = 1, #entry.cards do
      local card <const> = entry.cards[position]

      list[#list + 1] = {
        id = card.id,
        accountId = entry.accountId,
        last4 = card.number:sub(-LAST_DIGITS),
        holder = card.holder,
        expiresAt = card.expiresAt * 1000,
        state = card.state,
      }
    end
  end

  return list
end

Banking.cards = cardStore
