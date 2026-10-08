local rules <const> = Banking.rules
local accountStore <const> = Banking.store

local recipientBook <const> = {}

local HOLDER_LOOKUP <const> = 'SELECT first_name, last_name FROM characters WHERE id = ?'

--- Names by character id, asked once: a name changes rarely, and the
--- identity event clears the entry when it does.
local holders <const> = {}

--- The full name of a character, online or not.
---@param characterId number The character id.
---@return string holder The name, empty when unknown.
function recipientBook.holderOf(characterId)
  local known <const> = holders[characterId]

  if known then
    return known
  end

  local character <const> = Siku.cache.getCharacter(characterId)
  local row <const> = character or MySQL.single.await(HOLDER_LOOKUP, { characterId })

  if not row then
    return ''
  end

  local name <const> = ('%s %s'):format(
    row.firstName or row.first_name or '',
    row.lastName or row.last_name or ''
  )

  holders[characterId] = name:match('^%s*(.-)%s*$')

  return holders[characterId]
end

--- Whether a value reads as an account number of the bank.
---@param value any The raw number.
---@return string? number The digits, or nil.
function recipientBook.number(value)
  if type(value) ~= 'string' then
    return nil
  end

  local digits <const> = value:gsub('%s', '')

  if #digits ~= BankingConfig.accounts.numberLength or not digits:match('^%d+$') then
    return nil
  end

  return digits
end

--- The name a company shows to whoever pays it: the label of its job.
---@param jobName string The job name.
---@return string holder The label, the name itself when the job is unknown.
function recipientBook.companyOf(jobName)
  local definition <const> = Siku.jobs.getDefinition(jobName)

  return definition and definition.label or jobName
end

--- A recipient from a bank row, when its core account still receives. A
--- company answers with its name, a character with theirs.
---@param row table The bank row, from the store lookups.
---@return table? recipient { accountId, number, holder, ownerId?, jobName? }, or nil.
local function describe(row)
  local state <const> = Siku.accounts.getState(row.accountId)

  if state == nil or state == 'closed' then
    return nil
  end

  local company <const> = row.ownerType == rules.OWNERS.JOB and row.jobName or nil

  return {
    accountId = row.accountId,
    number = row.number,
    holder = company and recipientBook.companyOf(company)
      or recipientBook.holderOf(row.characterId),
    ownerId = row.characterId,
    jobName = company,
  }
end

--- The recipient behind an account number.
---@param number string The digits.
---@return table? recipient { accountId, number, holder, ownerId?, jobName? }, or nil when nobody answers.
function recipientBook.byNumber(number)
  local row <const> = accountStore.byNumber(number)

  return row and describe(row) or nil
end

--- The recipient behind an account id.
---@param accountId number The account id.
---@return table? recipient { accountId, number, holder, ownerId?, jobName? }, or nil.
function recipientBook.byId(accountId)
  local row <const> = accountStore.byAccount(accountId)

  return row and describe(row) or nil
end

--- Forgets a remembered name when the character's identity changes.
---@return nil
function recipientBook.listen()
  AddEventHandler('siku:character:identityChanged', function(_, characterId)
    if type(characterId) == 'number' then
      holders[characterId] = nil
    end
  end)
end

Banking.recipients = recipientBook
