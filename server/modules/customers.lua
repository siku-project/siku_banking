local preferenceRules <const> = Banking.preferences
local accountStore <const> = Banking.store

local customerStore <const> = {}

local SELECT_QUERY <const> = table.concat({
  'SELECT preferences, beneficiaries, UNIX_TIMESTAMP(onboarded_at) * 1000 AS onboarded_at',
  'FROM bank_customers WHERE character_id = ?',
}, ' ')
local INSERT_QUERY <const> =
  'INSERT INTO bank_customers (character_id, preferences, beneficiaries) VALUES (?, ?, ?)'
local PREFERENCES_QUERY <const> = 'UPDATE bank_customers SET preferences = ? WHERE character_id = ?'
local BENEFICIARIES_QUERY <const> =
  'UPDATE bank_customers SET beneficiaries = ? WHERE character_id = ?'
local EMPTY_LIST <const> = '[]'

--- Customers live here first, keyed by character id: what belongs to the
--- person rather than to one of their accounts.
local customers <const> = {}

--- A JSON column decoded, or a fallback.
---@param raw any The stored text.
---@return any value The decoded value, nil when unreadable.
local function decode(raw)
  if type(raw) ~= 'string' or raw == '' then
    return nil
  end

  local ok <const>, value <const> = pcall(json.decode, raw)

  return ok and value or nil
end

--- Loads the customer row of a character, if they ever opened an account.
---@param characterId number The character id.
---@return nil
function customerStore.load(characterId)
  local row <const> = MySQL.single.await(SELECT_QUERY, { characterId })

  if not row then
    customers[characterId] = nil
    return
  end

  local beneficiaries <const> = decode(row.beneficiaries)

  customers[characterId] = {
    characterId = characterId,
    onboardedAt = math.tointeger(row.onboarded_at),
    preferences = preferenceRules.from(decode(row.preferences)),
    beneficiaries = type(beneficiaries) == 'table' and beneficiaries or {},
  }
end

--- Forgets a character that left play.
---@param characterId number The character id.
---@return nil
function customerStore.forget(characterId)
  customers[characterId] = nil
end

--- The customer entry of a character.
---@param characterId number The character id.
---@return table? customer { characterId, onboardedAt, preferences, beneficiaries }, or nil.
function customerStore.get(characterId)
  return customers[characterId]
end

--- Whether a character already went through their first opening.
---@param characterId number The character id.
---@return boolean onboarded Whether a customer row exists.
function customerStore.isOnboarded(characterId)
  return customers[characterId] ~= nil
end

--- Registers a character as a customer.
---@param characterId number The character id.
---@return boolean created Whether the row was written.
function customerStore.create(characterId)
  if customers[characterId] then
    return false
  end

  local preferences <const> = preferenceRules.defaults()
  local inserted <const> = MySQL.insert.await(
    INSERT_QUERY,
    { characterId, json.encode(preferences), EMPTY_LIST }
  )

  if inserted == nil then
    return false
  end

  customers[characterId] = {
    characterId = characterId,
    onboardedAt = os.time() * 1000,
    preferences = preferences,
    beneficiaries = {},
  }

  return true
end

--- The account a customer calls their main one.
---@param characterId number The character id.
---@return number? accountId The account id, or nil.
function customerStore.mainOf(characterId)
  return accountStore.mainOf(characterId)
end

--- Changes the main account of a customer.
---@param characterId number The character id.
---@param accountId number The account id.
---@return boolean changed Whether the rows were written.
function customerStore.setMain(characterId, accountId)
  return accountStore.setMain(characterId, accountId)
end

--- The preferences of a character, the defaults when they are no customer.
---@param characterId number The character id.
---@return table preferences The full set.
function customerStore.preferencesOf(characterId)
  local customer <const> = customers[characterId]

  return customer and customer.preferences or preferenceRules.defaults()
end

--- Merges validated fields into the preferences of a customer and writes them.
---@param characterId number The character id.
---@param patch table The fields, already validated.
---@return table? preferences The full set, nil when refused.
---@return string? reason `not_onboarded` or `write_failed`.
function customerStore.setPreferences(characterId, patch)
  local customer <const> = customers[characterId]

  if not customer then
    return nil, 'not_onboarded'
  end

  local merged <const> = {}

  for key, value in pairs(customer.preferences) do
    merged[key] = value
  end

  for key, value in pairs(patch) do
    merged[key] = value
  end

  if not MySQL.update.await(PREFERENCES_QUERY, { json.encode(merged), characterId }) then
    return nil, 'write_failed'
  end

  customer.preferences = merged

  return merged
end

--- The saved recipients of a customer, as stored.
---@param characterId number The character id.
---@return table? beneficiaries The list of { id, accountId, label }, nil when no customer.
function customerStore.beneficiariesOf(characterId)
  local customer <const> = customers[characterId]

  return customer and customer.beneficiaries or nil
end

--- Writes the saved recipients of a customer after they changed.
---@param characterId number The character id.
---@return boolean saved Whether the row was written.
function customerStore.saveBeneficiaries(characterId)
  local customer <const> = customers[characterId]

  if not customer then
    return false
  end

  local encoded <const> = json.encode(customer.beneficiaries)

  return MySQL.update.await(BENEFICIARIES_QUERY, { encoded, characterId }) ~= nil
end

Banking.customers = customerStore
