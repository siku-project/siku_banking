local rules <const> = Banking.rules
local numberPool <const> = Banking.numbers
local recipientBook <const> = Banking.recipients
local transferService <const> = Banking.transfers
local companyStore <const> = Banking.companies
local sessionViews <const> = Banking.views

local companyActions <const> = {}

local LEVELS <const> = rules.ACCESS_LEVELS
local CARD_STATES <const> = rules.CARD_STATES
local ID_SPAN <const> = 1000
local YEAR_SECONDS <const> = 365 * 86400
local MONTH_FORMAT <const> = '%Y-%m'

--- A refused outcome.
---@param reason string Why.
---@return table outcome { ok = false, reason }.
local function refuse(reason)
  return { ok = false, reason = reason }
end

--- A successful outcome carrying the companies again, and the personal
--- side when money may have reached one of the character's own accounts.
---@param characterId number The character id.
---@param withBank? boolean Whether the personal side is sent too.
---@return table outcome { ok = true, enterprise, bank? }.
local function accept(characterId, withBank)
  return {
    ok = true,
    enterprise = companyStore.describe(characterId),
    bank = withBank and sessionViews.bank(characterId) or nil,
  }
end

--- Runs an action on a company the character runs, with its rows.
---@param characterId number The character id.
---@param data table The request, carrying `companyId`.
---@param action function Receives (jobName, rows) and answers an outcome or a reason.
---@return table outcome The outcome.
local function withCompany(characterId, data, action)
  local jobName <const>, reason <const> = companyStore.resolve(characterId, data.companyId)

  if not jobName then
    return refuse(reason)
  end

  local result <const> = action(jobName, companyStore.rows(jobName))

  if type(result) == 'string' then
    return refuse(result)
  end

  return result or accept(characterId)
end

--- Whether a character works for the company.
---@param jobName string The job name.
---@param memberId any The raw character id.
---@return number? memberId The id, nil when they are no employee.
local function employee(jobName, memberId)
  local id <const> = rules.id(memberId)

  return id and Siku.jobs.hasJob(id, jobName) and id or nil
end

--- A company card and the row holding it.
---@param rows table The company rows.
---@param cardId any The raw card id.
---@return table? card The card, or nil.
---@return table? row The row.
local function cardOf(rows, cardId)
  local id <const> = rules.id(cardId)
  local row <const> = id and companyStore.row(rows, id // ID_SPAN)

  if not row then
    return nil
  end

  return Siku.table.find(row.cards, function(card)
    return card.id == id
  end), row
end

--- A card cap inside the bank's bounds.
---@param value any The raw cap.
---@return number? limit The whole cap, nil when unusable.
local function capOf(value)
  local limit <const> = math.tointeger(tonumber(value))

  if not limit or limit <= 0 or limit > BankingConfig.enterprise.cards.maxLimit then
    return nil
  end

  return limit
end

--- A new company account.
---@param characterId number The character id.
---@param data table { companyId, label }.
---@return table outcome The outcome.
function companyActions.openAccount(characterId, data)
  return withCompany(characterId, data, function(jobName, rows)
    local label <const> =
      rules.label(data.label, BankingConfig.enterprise.accounts.labelLength)

    if not label then
      return 'invalid_label'
    end

    local opened <const>, reason <const> = companyStore.open(jobName, rows, label)

    return not opened and (reason or 'write_failed') or nil
  end)
end

--- A new name on a company account.
---@param characterId number The character id.
---@param data table { companyId, accountId, label }.
---@return table outcome The outcome.
function companyActions.renameAccount(characterId, data)
  return withCompany(characterId, data, function(_, rows)
    local row <const> = companyStore.row(rows, data.accountId)
    local label <const> =
      rules.label(data.label, BankingConfig.enterprise.accounts.labelLength)

    if not row then
      return 'unknown_account'
    end

    if not label then
      return 'invalid_label'
    end

    return not companyStore.rename(row, label) and 'write_failed' or nil
  end)
end

--- What an employee may do on a company account, through the core grants.
---@param characterId number The character id.
---@param data table { companyId, accountId, memberId, level? }.
---@return table outcome The outcome.
function companyActions.setAccess(characterId, data)
  return withCompany(characterId, data, function(jobName, rows)
    local row <const> = companyStore.row(rows, data.accountId)
    local memberId <const> = employee(jobName, data.memberId)
    local level <const> = data.level

    if not row then
      return 'unknown_account'
    end

    if not memberId then
      return 'not_member'
    end

    if level ~= nil and level ~= LEVELS.VIEW and level ~= LEVELS.SPEND then
      return 'invalid_state'
    end

    local done <const>, reason <const> =
      companyStore.setAccess(row.accountId, memberId, level, characterId)

    return not done and (reason or 'write_failed') or nil
  end)
end

--- A company card for an employee, on one account, with a monthly cap.
---@param characterId number The character id.
---@param data table { companyId, accountId, memberId, limit }.
---@return table outcome The outcome.
function companyActions.issueCard(characterId, data)
  return withCompany(characterId, data, function(jobName, rows)
    local row <const> = companyStore.row(rows, data.accountId)
    local memberId <const> = employee(jobName, data.memberId)
    local limit <const> = capOf(data.limit)

    if not row then
      return 'unknown_account'
    end

    if not memberId then
      return 'not_member'
    end

    if not limit then
      return 'invalid_amount'
    end

    for _, entry in ipairs(rows) do
      if Siku.table.find(entry.cards, function(card)
        return card.memberId == memberId
      end) then
        return 'card_limit'
      end
    end

    local number <const> = numberPool.card()

    if not number then
      return 'write_failed'
    end

    local highest = row.accountId * ID_SPAN

    for _, card in ipairs(row.cards) do
      highest = math.max(highest, card.id)
    end

    row.cards[#row.cards + 1] = {
      id = highest + 1,
      number = number,
      memberId = memberId,
      holder = recipientBook.holderOf(memberId):upper(),
      limit = limit,
      spent = 0,
      month = os.date(MONTH_FORMAT),
      state = CARD_STATES.ACTIVE,
      expiresAt = os.time() + BankingConfig.cards.validityYears * YEAR_SECONDS,
    }

    return not companyStore.saveCards(row) and 'write_failed' or nil
  end)
end

--- A company card blocked or unblocked.
---@param characterId number The character id.
---@param data table { companyId, cardId, state }.
---@return table outcome The outcome.
function companyActions.setCardState(characterId, data)
  return withCompany(characterId, data, function(_, rows)
    local card <const>, row <const> = cardOf(rows, data.cardId)

    if not card then
      return 'unknown_card'
    end

    if not rules.isRequestableCardState(data.state) or card.state == data.state then
      return 'invalid_state'
    end

    card.state = data.state

    return not companyStore.saveCards(row) and 'write_failed' or nil
  end)
end

--- A new monthly cap on a company card.
---@param characterId number The character id.
---@param data table { companyId, cardId, limit }.
---@return table outcome The outcome.
function companyActions.setCardLimit(characterId, data)
  return withCompany(characterId, data, function(_, rows)
    local card <const>, row <const> = cardOf(rows, data.cardId)
    local limit <const> = capOf(data.limit)

    if not card then
      return 'unknown_card'
    end

    if not limit then
      return 'invalid_amount'
    end

    card.limit = limit

    return not companyStore.saveCards(row) and 'write_failed' or nil
  end)
end

--- Company money sent to a supplier, another company account or any number.
---@param characterId number The character id.
---@param data table { companyId, fromAccountId, number, amount, label }.
---@return table outcome The outcome, with the personal side too.
function companyActions.transfer(characterId, data)
  return withCompany(characterId, data, function(_, rows)
    local row <const> = companyStore.row(rows, data.fromAccountId)
    local number <const> = recipientBook.number(data.number)
    local label <const> = rules.label(data.label, BankingConfig.transfers.labelLength)

    if not row then
      return 'unknown_account'
    end

    if not number then
      return 'unknown_recipient'
    end

    if not label then
      return 'invalid_label'
    end

    local amount <const>, invalid <const> = transferService.amount(data.amount)

    if not amount then
      return invalid
    end

    local recipient <const> = recipientBook.byNumber(number)

    if not recipient then
      return 'unknown_recipient'
    end

    local moved <const>, reason <const> =
      transferService.send(row.accountId, recipient, amount, label, characterId)

    return moved and accept(characterId, true) or (reason or 'write_failed')
  end)
end

--- A supplier saved for the company, on its main account.
---@param characterId number The character id.
---@param data table { companyId, number, label }.
---@return table outcome The outcome.
function companyActions.addSupplier(characterId, data)
  return withCompany(characterId, data, function(jobName, rows)
    local main <const> = companyStore.mainRow(rows)
    local number <const> = recipientBook.number(data.number)
    local rule <const> = BankingConfig.enterprise.suppliers
    local label <const> = rules.label(data.label, rule.labelLength)
    local recipient <const> = number and recipientBook.byNumber(number)

    if not main then
      return 'unknown_account'
    end

    if not recipient then
      return 'unknown_recipient'
    end

    if not label then
      return 'invalid_label'
    end

    if recipient.jobName == jobName then
      return 'self_beneficiary'
    end

    if Siku.table.find(main.suppliers, function(entry)
      return entry.accountId == recipient.accountId
    end) then
      return 'duplicate_beneficiary'
    end

    if #main.suppliers >= rule.max then
      return 'beneficiary_limit'
    end

    local highest = 0

    for _, entry in ipairs(main.suppliers) do
      highest = math.max(highest, entry.id)
    end

    main.suppliers[#main.suppliers + 1] = {
      id = highest + 1,
      accountId = recipient.accountId,
      label = label,
    }

    return not companyStore.saveSuppliers(main) and 'write_failed' or nil
  end)
end

--- A saved supplier forgotten.
---@param characterId number The character id.
---@param data table { companyId, supplierId }.
---@return table outcome The outcome.
function companyActions.removeSupplier(characterId, data)
  return withCompany(characterId, data, function(_, rows)
    local main <const> = companyStore.mainRow(rows)
    local id <const> = rules.id(data.supplierId)

    if not main or not id then
      return 'unknown_beneficiary'
    end

    local kept <const> = Siku.table.filter(main.suppliers, function(entry)
      return entry.id ~= id
    end)

    if #kept == #main.suppliers then
      return 'unknown_beneficiary'
    end

    main.suppliers = kept

    return not companyStore.saveSuppliers(main) and 'write_failed' or nil
  end)
end

Banking.companyActions = companyActions
