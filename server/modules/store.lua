local rules <const> = Banking.rules

local accountStore <const> = {}

local OWNER_CHARACTER <const> = rules.OWNERS.CHARACTER
local SELECT_QUERY <const> = table.concat({
  'SELECT account_id, number, label, is_main, balance, cards FROM bank_accounts',
  "WHERE owner_type = 'character' AND character_id = ?",
}, ' ')
local INSERT_QUERY <const> = table.concat({
  'INSERT INTO bank_accounts',
  '(account_id, owner_type, character_id, number, label, is_main, balance, cards)',
  'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
}, ' ')
local LABEL_QUERY <const> = 'UPDATE bank_accounts SET label = ? WHERE account_id = ?'
local MAIN_QUERY <const> = table.concat({
  'UPDATE bank_accounts SET is_main = (account_id = ?)',
  "WHERE owner_type = 'character' AND character_id = ?",
}, ' ')
local BALANCE_QUERY <const> = 'UPDATE bank_accounts SET balance = ? WHERE account_id = ?'
local CARDS_QUERY <const> = 'UPDATE bank_accounts SET cards = ? WHERE account_id = ?'
local DELETE_QUERY <const> = 'DELETE FROM bank_accounts WHERE account_id = ?'
local ROW_COLUMNS <const> = 'account_id, owner_type, character_id, job_name, number, label'
local NUMBER_QUERY <const> = ('SELECT %s FROM bank_accounts WHERE number = ?'):format(ROW_COLUMNS)
local ACCOUNT_QUERY <const> =
  ('SELECT %s FROM bank_accounts WHERE account_id = ?'):format(ROW_COLUMNS)
local EMPTY_CARDS <const> = '[]'

--- Bank accounts live here first, keyed by character id then account id.
--- The rows only visit the database on the way in and on every change.
local byCharacter <const> = {}

--- The cards stored on a row, decoded.
---@param raw any The JSON text.
---@return table cards The list, empty when unreadable.
local function decodeCards(raw)
  if type(raw) ~= 'string' or raw == '' then
    return {}
  end

  local ok <const>, cards <const> = pcall(json.decode, raw)

  return ok and type(cards) == 'table' and cards or {}
end

--- The entries of a character, loading nothing.
---@param characterId number The character id.
---@return table entries The cache, by account id.
local function cacheOf(characterId)
  local cache = byCharacter[characterId]

  if not cache then
    cache = {}
    byCharacter[characterId] = cache
  end

  return cache
end

--- Loads the bank accounts of a character, their balance put back in step
--- with the core, which holds the truth. A row whose core account is gone
--- or closed is left behind.
---@param characterId number The character id.
---@return nil
function accountStore.load(characterId)
  local rows <const> = MySQL.query.await(SELECT_QUERY, { characterId }) or {}
  local cache <const> = {}

  for index = 1, #rows do
    local row <const> = rows[index]
    local accountId <const> = math.tointeger(row.account_id)

    if accountId and Siku.accounts.getState(accountId) ~= nil
      and Siku.accounts.getState(accountId) ~= 'closed' then
      local balance <const> = Siku.accounts.getBalance(accountId) or 0

      if balance ~= math.tointeger(row.balance) then
        MySQL.update(BALANCE_QUERY, { balance, accountId })
      end

      cache[accountId] = {
        accountId = accountId,
        number = row.number,
        label = row.label,
        main = row.is_main == 1 or row.is_main == true,
        balance = balance,
        cards = decodeCards(row.cards),
      }
    end
  end

  byCharacter[characterId] = cache
end

--- Forgets a character that left play.
---@param characterId number The character id.
---@return nil
function accountStore.forget(characterId)
  byCharacter[characterId] = nil
end

--- One bank account of a character.
---@param characterId number The character id.
---@param accountId number The account id.
---@return table? entry { accountId, number, label, main, balance, cards }, or nil.
function accountStore.get(characterId, accountId)
  return cacheOf(characterId)[accountId]
end

--- The bank accounts of a character, by account id.
---@param characterId number The character id.
---@return table entries The list.
function accountStore.list(characterId)
  local list <const> = {}

  for _, entry in pairs(cacheOf(characterId)) do
    list[#list + 1] = entry
  end

  table.sort(list, function(a, b)
    return a.accountId < b.accountId
  end)

  return list
end

--- The account a customer calls their main one.
---@param characterId number The character id.
---@return number? accountId The account id, or nil.
function accountStore.mainOf(characterId)
  for _, entry in pairs(cacheOf(characterId)) do
    if entry.main then
      return entry.accountId
    end
  end

  return nil
end

--- Writes the row of a new bank account.
---@param characterId number The character id.
---@param accountId number The core account id.
---@param number string The account number.
---@param label string The name.
---@param main boolean Whether it becomes the main account.
---@return table? entry The cache entry, nil when the write failed.
function accountStore.insert(characterId, accountId, number, label, main)
  local balance <const> = Siku.accounts.getBalance(accountId) or 0
  local inserted <const> = MySQL.insert.await(
    INSERT_QUERY,
    { accountId, OWNER_CHARACTER, characterId, number, label, main and 1 or 0, balance, EMPTY_CARDS }
  )

  if inserted == nil then
    return nil
  end

  local entry <const> = {
    accountId = accountId,
    number = number,
    label = label,
    main = main,
    balance = balance,
    cards = {},
  }

  cacheOf(characterId)[accountId] = entry

  return entry
end

--- Renames a bank account.
---@param characterId number The character id.
---@param accountId number The account id.
---@param label string The new name.
---@return boolean renamed Whether the row was written.
function accountStore.setLabel(characterId, accountId, label)
  local entry <const> = accountStore.get(characterId, accountId)

  if not entry or not MySQL.update.await(LABEL_QUERY, { label, accountId }) then
    return false
  end

  entry.label = label

  return true
end

--- Makes one account the main one, every other account of the customer
--- losing the mark in the same statement.
---@param characterId number The character id.
---@param accountId number The account id.
---@return boolean changed Whether the rows were written.
function accountStore.setMain(characterId, accountId)
  if not accountStore.get(characterId, accountId) then
    return false
  end

  if not MySQL.update.await(MAIN_QUERY, { accountId, characterId }) then
    return false
  end

  for _, entry in pairs(cacheOf(characterId)) do
    entry.main = entry.accountId == accountId
  end

  return true
end

--- Writes the cards of a bank account after they changed.
---@param characterId number The character id.
---@param accountId number The account id.
---@return boolean saved Whether the row was written.
function accountStore.saveCards(characterId, accountId)
  local entry <const> = accountStore.get(characterId, accountId)

  if not entry then
    return false
  end

  return MySQL.update.await(CARDS_QUERY, { json.encode(entry.cards), accountId }) ~= nil
end

--- Removes the row of an account the customer closed.
---@param characterId number The character id.
---@param accountId number The account id.
---@return nil
function accountStore.remove(characterId, accountId)
  MySQL.update.await(DELETE_QUERY, { accountId })
  cacheOf(characterId)[accountId] = nil
end

--- A bank row as the lookups hand it out.
---@param row table? The database row.
---@return table? entry { accountId, ownerType, characterId?, jobName?, number, label }, or nil.
local function fromLookup(row)
  if not row then
    return nil
  end

  return {
    accountId = math.tointeger(row.account_id),
    ownerType = row.owner_type,
    characterId = math.tointeger(row.character_id),
    jobName = row.job_name,
    number = row.number,
    label = row.label,
  }
end

--- Who holds an account number, a character or a company.
---@param number string The digits.
---@return table? row { accountId, ownerType, characterId?, jobName?, number, label }, or nil.
function accountStore.byNumber(number)
  return fromLookup(MySQL.single.await(NUMBER_QUERY, { number }))
end

--- The bank row of an account id.
---@param accountId number The account id.
---@return table? row { accountId, ownerType, characterId?, jobName?, number, label }, or nil.
function accountStore.byAccount(accountId)
  return fromLookup(MySQL.single.await(ACCOUNT_QUERY, { accountId }))
end

--- Writes the new balance of an account on its bank row, and on the cached
--- entry when a character in play holds it.
---@param accountId any The account id.
---@param balance any The new balance.
---@return nil
local function mirrorBalance(accountId, balance)
  if type(accountId) ~= 'number' or type(balance) ~= 'number' then
    return
  end

  MySQL.update(BALANCE_QUERY, { balance, accountId })

  for _, cache in pairs(byCharacter) do
    local entry <const> = cache[accountId]

    if entry then
      entry.balance = balance
      return
    end
  end
end

--- Keeps the balance copy of every bank row in step with the core.
---@return nil
function accountStore.listen()
  AddEventHandler('siku:accounts:balanceChanged', mirrorBalance)
end

Banking.store = accountStore
