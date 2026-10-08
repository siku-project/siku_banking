local customerStore <const> = Banking.customers
local recipientBook <const> = Banking.recipients

local beneficiaryBook <const> = {}

--- Saved recipients live on the customer, in their `beneficiaries` list.

--- The next free id in a list.
---@param list table The saved recipients.
---@return number id The id.
local function nextId(list)
  local highest = 0

  for index = 1, #list do
    highest = math.max(highest, list[index].id)
  end

  return highest + 1
end

--- Saves a recipient for a customer.
---@param characterId number The character id.
---@param accountId number The account the recipient receives on.
---@param label string The name the customer gave, already validated.
---@return table? entry The saved recipient, nil when refused.
---@return string? reason Why it was refused.
function beneficiaryBook.add(characterId, accountId, label)
  local list <const> = customerStore.beneficiariesOf(characterId)

  if not list then
    return nil, 'not_onboarded'
  end

  for index = 1, #list do
    if list[index].accountId == accountId then
      return nil, 'duplicate_beneficiary'
    end
  end

  if #list >= BankingConfig.transfers.beneficiaries.max then
    return nil, 'beneficiary_limit'
  end

  local entry <const> = { id = nextId(list), accountId = accountId, label = label }

  list[#list + 1] = entry

  if not customerStore.saveBeneficiaries(characterId) then
    list[#list] = nil
    return nil, 'write_failed'
  end

  return entry
end

--- Removes a saved recipient.
---@param characterId number The character id.
---@param id number The entry id.
---@return boolean removed Whether the entry is gone.
---@return string? reason Why it was refused.
function beneficiaryBook.remove(characterId, id)
  local list <const> = customerStore.beneficiariesOf(characterId) or {}

  for index = 1, #list do
    if list[index].id == id then
      local entry <const> = table.remove(list, index)

      if not customerStore.saveBeneficiaries(characterId) then
        table.insert(list, index, entry)
        return false, 'write_failed'
      end

      return true
    end
  end

  return false, 'unknown_beneficiary'
end

--- The saved recipients as the interface shows them, each with the number
--- and holder of the account it points to, by name. An entry whose account
--- vanished is left out.
---@param characterId number The character id.
---@return table beneficiaries The list of { id, label, number, holder }.
function beneficiaryBook.describe(characterId)
  local entries <const> = customerStore.beneficiariesOf(characterId) or {}
  local list <const> = {}

  for index = 1, #entries do
    local entry <const> = entries[index]
    local recipient <const> = recipientBook.byId(entry.accountId)

    if recipient then
      list[#list + 1] = {
        id = entry.id,
        label = entry.label,
        number = recipient.number,
        holder = recipient.holder,
      }
    end
  end

  table.sort(list, function(a, b)
    return a.label < b.label
  end)

  return list
end

Banking.beneficiaries = beneficiaryBook
