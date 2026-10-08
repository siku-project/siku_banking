local rules <const> = Banking.rules
local accountStore <const> = Banking.store
local numberPool <const> = Banking.numbers

local personalAccounts <const> = {}

local KIND_PERSONAL <const> = rules.ACCOUNT_KIND
local OWNER_CHARACTER <const> = rules.OWNERS.CHARACTER

--- The personal accounts of a character, as the interface shows them: the
--- bank's row for the name, the number and the main mark, the core for the
--- state and the balance. Company accounts belong to the enterprise side
--- and never show here.
---@param characterId number The character id.
---@return table accounts The list of { id, number, label, state, balance, main }, by id.
function personalAccounts.describe(characterId)
  local entries <const> = accountStore.list(characterId)
  local list <const> = {}

  for index = 1, #entries do
    local entry <const> = entries[index]

    list[#list + 1] = {
      id = entry.accountId,
      number = entry.number,
      label = entry.label,
      state = Siku.accounts.getState(entry.accountId) or 'active',
      balance = Siku.accounts.getBalance(entry.accountId) or entry.balance,
      main = entry.main,
    }
  end

  return list
end

--- How many personal accounts a character holds at the bank.
---@param characterId number The character id.
---@return number count The count.
function personalAccounts.countOwned(characterId)
  return #accountStore.list(characterId)
end

--- An open account the character holds at the bank.
---@param characterId number The character id.
---@param accountId number The account id.
---@return table? account The core account, nil when refused.
---@return string? reason `unknown_account`, `not_owner` or `closed`.
function personalAccounts.owned(characterId, accountId)
  local account <const> = Siku.accounts.getAccount(accountId)

  if not account then
    return nil, 'unknown_account'
  end

  if account.ownerType ~= OWNER_CHARACTER or account.ownerId ~= characterId then
    return nil, 'not_owner'
  end

  if account.state == 'closed' then
    return nil, 'closed'
  end

  if not accountStore.get(characterId, accountId) then
    return nil, 'unknown_account'
  end

  return account
end

--- Opens a personal account for a character: the core account first, then
--- the bank's row with a fresh number. A row that cannot be written closes
--- the core account again.
---@param characterId number The character id.
---@param label string The name the customer gave it, already validated.
---@param main boolean Whether it becomes the main account.
---@return number? accountId The new account id, nil when refused.
---@return string? reason Why it was refused.
function personalAccounts.open(characterId, label, main)
  if personalAccounts.countOwned(characterId) >= BankingConfig.accounts.maxPerCharacter then
    return nil, 'account_limit'
  end

  local number <const> = numberPool.account()

  if not number then
    return nil, 'write_failed'
  end

  local accountId <const>, reason <const> = Siku.accounts.create(OWNER_CHARACTER, characterId, {
    metadata = { kind = KIND_PERSONAL },
  })

  if not accountId then
    return nil, reason
  end

  if not accountStore.insert(characterId, accountId, number, label, main) then
    Siku.accounts.close(accountId, characterId)
    return nil, 'write_failed'
  end

  return accountId
end

--- Renames an account the character holds.
---@param characterId number The character id.
---@param accountId number The account id.
---@param label string The new name, already validated.
---@return boolean renamed Whether the name moved.
---@return string? reason Why it was refused.
function personalAccounts.rename(characterId, accountId, label)
  local account <const>, reason <const> = personalAccounts.owned(characterId, accountId)

  if not account then
    return false, reason
  end

  if accountStore.get(characterId, accountId).label == label then
    return true
  end

  if not accountStore.setLabel(characterId, accountId, label) then
    return false, 'write_failed'
  end

  return true
end

--- Closes an account the character holds: the core closes it, which needs
--- a zero balance, then the bank's row goes with its cards.
---@param characterId number The character id.
---@param accountId number The account id.
---@return boolean closed Whether the account is closed.
---@return string? reason Why it was refused.
function personalAccounts.close(characterId, accountId)
  local account <const>, reason <const> = personalAccounts.owned(characterId, accountId)

  if not account then
    return false, reason
  end

  if accountId == accountStore.mainOf(characterId) then
    return false, 'main_account'
  end

  if account.balance ~= 0 then
    return false, 'balance_not_zero'
  end

  local closed <const>, refused <const> = Siku.accounts.close(accountId, characterId)

  if not closed then
    return false, refused
  end

  accountStore.remove(characterId, accountId)

  return true
end

Banking.accounts = personalAccounts
