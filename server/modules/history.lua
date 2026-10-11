local recipientBook <const> = Banking.recipients

local historyReader <const> = {}

local DEFAULT_CATEGORY <const> = 'other'
local SECONDS_LIMIT <const> = 1e11

--- A journal timestamp as milliseconds, whatever the driver returned.
---@param value any A number of milliseconds or seconds, or a date string.
---@return number at The milliseconds, 0 when unreadable.
local function toMillis(value)
  if type(value) == 'number' then
    return value < SECONDS_LIMIT and math.floor(value * 1000) or math.floor(value)
  end

  if type(value) ~= 'string' then
    return 0
  end

  local year <const>, month <const>, day <const>, hour <const>, minute <const>, second <const> =
    value:match('(%d+)-(%d+)-(%d+)[T ](%d+):(%d+):(%d+)')

  if not year then
    return 0
  end

  return os.time({
    year = tonumber(year),
    month = tonumber(month),
    day = tonumber(day),
    hour = tonumber(hour),
    min = tonumber(minute),
    sec = tonumber(second),
  }) * 1000
end

--- The category of a journal reason, from its first word.
---@param reason any The reason written with the mutation.
---@return string category An interface category.
local function categorize(reason)
  if type(reason) ~= 'string' then
    return DEFAULT_CATEGORY
  end

  local head <const> = reason:match('^%s*([%w_]+)')

  if not head then
    return DEFAULT_CATEGORY
  end

  return BankingConfig.history.categories[head:lower()] or DEFAULT_CATEGORY
end

--- The label of a journal line: what follows the colon of a
--- `category:label` reason, the reason itself otherwise, or the category
--- when the mutation carried nothing.
---@param reason any The reason written with the mutation.
---@param category string The category found.
---@return string label The label.
local function labelOf(reason, category)
  if type(reason) ~= 'string' or reason:match('^%s*$') then
    return T(('history_category_%s'):format(category))
  end

  local detail <const> = reason:match('^%s*[%w_]+%s*:%s*(.-)%s*$')

  if detail and detail ~= '' then
    return detail
  end

  return reason
end

--- A requested depth, kept inside the bank's bounds.
---@param value any The raw limit.
---@return number limit The lines read per account.
function historyReader.limit(value)
  local rule <const> = BankingConfig.history
  local wanted <const> = math.tointeger(tonumber(value))

  if not wanted or wanted <= 0 then
    return rule.limit
  end

  return math.min(wanted, rule.maxLimit)
end

--- The name shown as the author of a journal line: the character who
--- made it, or the bank for a movement no one signed.
---@param performedBy any The character id written with the mutation.
---@return string author The name.
local function authorOf(performedBy)
  local characterId <const> = math.tointeger(performedBy)
  local name <const> = characterId and recipientBook.holderOf(characterId) or ''

  return name ~= '' and name or T('bank_author_system')
end

--- The last movements of a company's accounts, newest first, each one
--- signed with its author.
---@param accountIds table The account ids.
---@param limit number Lines read per account.
---@return table operations The list of { id, accountId, label, category, amount, at, author }.
function historyReader.describeCompany(accountIds, limit)
  local list <const> = {}

  for index = 1, #accountIds do
    local accountId <const> = accountIds[index]
    local mutations <const> = Siku.accounts.getMutations(accountId, limit)

    for position = 1, #mutations do
      local mutation <const> = mutations[position]
      local category <const> = categorize(mutation.reason)

      list[#list + 1] = {
        id = mutation.id,
        accountId = accountId,
        label = labelOf(mutation.reason, category),
        category = category,
        amount = mutation.delta,
        at = toMillis(mutation.createdAt),
        author = authorOf(mutation.performedBy),
      }
    end
  end

  table.sort(list, function(a, b)
    if a.at ~= b.at then
      return a.at > b.at
    end

    return a.id > b.id
  end)

  return list
end

--- The last movements of a list of accounts, newest first.
---@param accounts table The interface accounts.
---@param limit? number Lines read per account, the configured default otherwise.
---@return table transactions The list of { id, accountId, label, category, amount, at, balanceAfter }.
function historyReader.describe(accounts, limit)
  limit = limit or BankingConfig.history.limit

  local list <const> = {}

  for index = 1, #accounts do
    local accountId <const> = accounts[index].id
    local mutations <const> = Siku.accounts.getMutations(accountId, limit)

    for position = 1, #mutations do
      local mutation <const> = mutations[position]
      local category <const> = categorize(mutation.reason)

      list[#list + 1] = {
        id = mutation.id,
        accountId = accountId,
        label = labelOf(mutation.reason, category),
        category = category,
        amount = mutation.delta,
        at = toMillis(mutation.createdAt),
        balanceAfter = mutation.balanceAfter,
      }
    end
  end

  table.sort(list, function(a, b)
    if a.at ~= b.at then
      return a.at > b.at
    end

    return a.id > b.id
  end)

  return list
end

Banking.history = historyReader
