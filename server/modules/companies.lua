local rules <const> = Banking.rules
local numberPool <const> = Banking.numbers
local recipientBook <const> = Banking.recipients
local historyReader <const> = Banking.history

local companyStore <const> = {}

local OWNER_JOB <const> = rules.OWNERS.JOB
local LEVELS <const> = rules.ACCESS_LEVELS
local STATE_CLOSED <const> = 'closed'
local LAST_DIGITS <const> = 4
local MONTH_FORMAT <const> = '%Y-%m'
local SECONDS_TO_MS <const> = 1000

local SELECT_QUERY <const> = table.concat({
  'SELECT account_id, number, label, is_main, cards, beneficiaries FROM bank_accounts',
  "WHERE owner_type = 'job' AND job_name = ? ORDER BY account_id",
}, ' ')
local INSERT_QUERY <const> = table.concat({
  'INSERT INTO bank_accounts',
  '(account_id, owner_type, job_name, number, label, is_main, balance, cards, beneficiaries)',
  "VALUES (?, ?, ?, ?, ?, ?, ?, '[]', '[]')",
}, ' ')
local LABEL_QUERY <const> = 'UPDATE bank_accounts SET label = ? WHERE account_id = ?'
local MAIN_QUERY <const> = 'UPDATE bank_accounts SET is_main = 1 WHERE account_id = ?'
local CARDS_QUERY <const> = 'UPDATE bank_accounts SET cards = ? WHERE account_id = ?'
local SUPPLIERS_QUERY <const> = 'UPDATE bank_accounts SET beneficiaries = ? WHERE account_id = ?'

--- A JSON list column, decoded.
---@param raw any The stored text.
---@return table list The list, empty when unreadable.
local function decodeList(raw)
  if type(raw) ~= 'string' or raw == '' then
    return {}
  end

  local ok <const>, value <const> = pcall(json.decode, raw)

  return ok and type(value) == 'table' and value or {}
end

--- Whether a core account still serves the company.
---@param accountId number The account id.
---@return boolean open Whether it exists and is not closed.
local function isOpen(accountId)
  local state <const> = Siku.accounts.getState(accountId)

  return state ~= nil and state ~= STATE_CLOSED
end

--- Writes the bank row of a company account.
---@param jobName string The job name.
---@param accountId number The core account id.
---@param label string The name.
---@param main boolean Whether it is the main account.
---@return table? entry { accountId, number, label, main, cards, suppliers }, nil when the write failed.
local function insertRow(jobName, accountId, label, main)
  local number <const> = numberPool.companyAccount()

  if not number then
    return nil
  end

  local balance <const> = Siku.accounts.getBalance(accountId) or 0
  local inserted <const> = MySQL.insert.await(
    INSERT_QUERY,
    { accountId, OWNER_JOB, jobName, number, label, main and 1 or 0, balance }
  )

  if inserted == nil then
    return nil
  end

  return { accountId = accountId, number = number, label = label, main = main, cards = {}, suppliers = {} }
end

--- The companies a character runs: the jobs where they hold the job
--- permission of the bank.
---@param characterId number The character id.
---@return table companies The list of { id, jobName, label, role }.
function companyStore.jobsOf(characterId)
  local permission <const> = BankingConfig.enterprise.jobPermission

  if type(permission) ~= 'string' or permission == '' then
    return {}
  end

  local list <const> = {}

  for _, membership in ipairs(Siku.jobs.getMemberships(characterId)) do
    local definition <const> = Siku.jobs.getDefinition(membership.job)

    if definition and Siku.jobs.hasPermission(characterId, membership.job, permission) then
      list[#list + 1] = {
        id = definition.id,
        jobName = membership.job,
        label = definition.label,
        role = membership.gradeLabel or membership.grade or '',
      }
    end
  end

  return list
end

--- The job behind a company id, when the character runs it.
---@param characterId number The character id.
---@param companyId any The company id sent by the interface.
---@return string? jobName The job name, nil when refused.
---@return string? reason `not_owner`.
function companyStore.resolve(characterId, companyId)
  local id <const> = rules.id(companyId)
  local company <const> = id and Siku.table.find(companyStore.jobsOf(characterId), function(entry)
    return entry.id == id
  end)

  if not company then
    return nil, 'not_owner'
  end

  return company.jobName
end

--- The bank rows of a company, by account id. Accounts the job owns in the
--- core without a bank row yet, opened by another resource or by an
--- administrator, are adopted with a fresh number; the oldest one becomes
--- the main account when the company has none.
---@param jobName string The job name.
---@return table rows The list of { accountId, number, label, main, cards, suppliers }.
function companyStore.rows(jobName)
  local stored <const> = MySQL.query.await(SELECT_QUERY, { jobName }) or {}
  local rows <const> = {}
  local known <const> = {}
  local hasMain = false

  for _, row in ipairs(stored) do
    local accountId <const> = math.tointeger(row.account_id)

    if accountId and isOpen(accountId) then
      local main <const> = row.is_main == 1 or row.is_main == true

      hasMain = hasMain or main
      known[accountId] = true
      rows[#rows + 1] = {
        accountId = accountId,
        number = row.number,
        label = row.label,
        main = main,
        cards = decodeList(row.cards),
        suppliers = decodeList(row.beneficiaries),
      }
    end
  end

  for _, account in ipairs(Siku.accounts.getJobAccounts(jobName)) do
    if not known[account.id] then
      local adopted <const> = insertRow(jobName, account.id, T('company_default_label'), not hasMain)

      hasMain = hasMain or adopted ~= nil
      rows[#rows + 1] = adopted
    end
  end

  table.sort(rows, function(a, b)
    return a.accountId < b.accountId
  end)

  if not hasMain and rows[1] then
    rows[1].main = true
    MySQL.update(MAIN_QUERY, { rows[1].accountId })
  end

  return rows
end

--- One row of a company.
---@param rows table The rows of the company.
---@param accountId any The account id.
---@return table? row The row, or nil.
function companyStore.row(rows, accountId)
  local id <const> = rules.id(accountId)

  return id and Siku.table.find(rows, function(row)
    return row.accountId == id
  end) or nil
end

--- The main row of a company.
---@param rows table The rows of the company.
---@return table? row The row, or nil.
function companyStore.mainRow(rows)
  return Siku.table.find(rows, function(row)
    return row.main
  end)
end

--- Opens a company account: the core account owned by the job, then the
--- bank row.
---@param jobName string The job name.
---@param rows table The current rows.
---@param label string The name, already validated.
---@return boolean opened Whether the account exists.
---@return string? reason Why it was refused.
function companyStore.open(jobName, rows, label)
  if #rows >= BankingConfig.enterprise.accounts.maxPerCompany then
    return false, 'account_limit'
  end

  local accountId <const>, reason <const> = Siku.accounts.create(OWNER_JOB, jobName, {
    metadata = { kind = 'company' },
  })

  if not accountId then
    return false, reason
  end

  if not insertRow(jobName, accountId, label, #rows == 0) then
    Siku.accounts.close(accountId)
    return false, 'write_failed'
  end

  return true
end

--- Renames a company account.
---@param row table The row.
---@param label string The name, already validated.
---@return boolean renamed Whether the row was written.
function companyStore.rename(row, label)
  return MySQL.update.await(LABEL_QUERY, { label, row.accountId }) ~= nil
end

--- Writes the cards of a row after they changed.
---@param row table The row.
---@return boolean saved Whether the row was written.
function companyStore.saveCards(row)
  return MySQL.update.await(CARDS_QUERY, { json.encode(row.cards), row.accountId }) ~= nil
end

--- Writes the suppliers of the main row after they changed.
---@param row table The main row.
---@return boolean saved Whether the row was written.
function companyStore.saveSuppliers(row)
  return MySQL.update.await(SUPPLIERS_QUERY, { json.encode(row.suppliers), row.accountId }) ~= nil
end

--- The level an employee holds on an account, from the core grants.
---@param permissions table The permissions granted.
---@return string? level `spend`, `view`, or nil.
local function levelOf(permissions)
  if Siku.table.contains(permissions, LEVELS.SPEND) then
    return LEVELS.SPEND
  end

  return Siku.table.contains(permissions, LEVELS.VIEW) and LEVELS.VIEW or nil
end

--- Gives an employee a level on a company account, or takes it away.
---@param accountId number The account id.
---@param memberId number The employee's character id.
---@param level string? `view`, `spend`, or nil to remove.
---@param performedBy number The character acting.
---@return boolean done Whether the grants now match.
---@return string? reason Why it was refused.
function companyStore.setAccess(accountId, memberId, level, performedBy)
  Siku.accounts.revoke(accountId, memberId, nil, performedBy)

  if not level then
    return true
  end

  local granted <const>, reason <const> = Siku.accounts.grant(accountId, memberId, level, performedBy)

  return granted, reason
end

--- The accounts of a company as the interface shows them.
---@param rows table The rows.
---@return table accounts The list of { id, number, label, state, balance, main, access }.
local function describeAccounts(rows)
  return Siku.table.map(rows, function(row)
    local access <const> = {}

    for _, grant in ipairs(Siku.accounts.getGrants(row.accountId)) do
      local level <const> = levelOf(grant.permissions)

      if level then
        access[#access + 1] = { memberId = grant.characterId, level = level }
      end
    end

    return {
      id = row.accountId,
      number = row.number,
      label = row.label,
      state = Siku.accounts.getState(row.accountId),
      balance = Siku.accounts.getBalance(row.accountId) or 0,
      main = row.main,
      access = access,
    }
  end)
end

--- The cards of a company as the interface shows them: the last digits,
--- the cap, and what they spent this month.
---@param rows table The rows.
---@return table cards The list of { id, accountId, memberId, last4, limit, spent, expiresAt, state }.
local function describeCards(rows)
  local month <const> = os.date(MONTH_FORMAT)
  local list <const> = {}

  for _, row in ipairs(rows) do
    for _, card in ipairs(row.cards) do
      list[#list + 1] = {
        id = card.id,
        accountId = row.accountId,
        memberId = card.memberId,
        last4 = card.number:sub(-LAST_DIGITS),
        limit = card.limit,
        spent = card.month == month and card.spent or 0,
        expiresAt = card.expiresAt * SECONDS_TO_MS,
        state = card.state,
      }
    end
  end

  return list
end

--- The saved suppliers of a company, each with the number and holder of
--- the account it points to. A supplier whose account vanished is left out.
---@param rows table The rows.
---@return table suppliers The list of { id, label, number, holder }.
local function describeSuppliers(rows)
  local main <const> = companyStore.mainRow(rows)
  local list <const> = {}

  for _, entry in ipairs(main and main.suppliers or {}) do
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

  return list
end

--- The employees of a company, read from the job engine.
---@param jobName string The job name.
---@return table members The list of { id, name, role }.
local function describeMembers(jobName)
  return Siku.table.map(Siku.jobs.getMembers(jobName), function(member)
    return {
      id = member.characterId,
      name = ('%s %s'):format(member.firstName or '', member.lastName or ''):match('^%s*(.-)%s*$'),
      role = member.gradeLabel or member.grade or '',
    }
  end)
end

--- Every company a character runs, as the interface shows them.
---@param characterId number The character id.
---@return table companies The list of { id, name, job, role, accounts, operations, members, cards, suppliers }.
function companyStore.describe(characterId)
  local limit <const> = BankingConfig.enterprise.historyLimit

  return Siku.table.map(companyStore.jobsOf(characterId), function(company)
    local rows <const> = companyStore.rows(company.jobName)
    local ids <const> = Siku.table.map(rows, function(row)
      return row.accountId
    end)

    return {
      id = company.id,
      name = company.label,
      job = company.jobName,
      role = company.role,
      accounts = describeAccounts(rows),
      operations = historyReader.describeCompany(ids, limit),
      members = describeMembers(company.jobName),
      cards = describeCards(rows),
      suppliers = describeSuppliers(rows),
    }
  end)
end

Banking.companies = companyStore
