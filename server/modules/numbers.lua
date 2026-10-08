local numberPool <const> = {}

local MAX_TRIES <const> = 20
local ACCOUNT_LOOKUP <const> = 'SELECT 1 FROM bank_accounts WHERE number = ? LIMIT 1'
local CARD_LOOKUP <const> =
  "SELECT 1 FROM bank_accounts WHERE JSON_SEARCH(cards, 'one', ?, NULL, '$[*].number') IS NOT NULL LIMIT 1"

--- A run of random digits.
---@param count number How many digits.
---@return string digits The digits.
local function digits(count)
  local parts <const> = {}

  for index = 1, count do
    parts[index] = tostring(Siku.math.randomInt(0, 9))
  end

  return table.concat(parts)
end

--- Draws numbers until one is free, or gives up.
---@param prefix string The fixed start.
---@param length number The total length.
---@param lookup string The query telling whether a number is taken.
---@return string? number A free number, or nil after too many tries.
local function unique(prefix, length, lookup)
  for _ = 1, MAX_TRIES do
    local candidate <const> = prefix .. digits(math.max(0, length - #prefix))

    if not MySQL.scalar.await(lookup, { candidate }) then
      return candidate
    end
  end

  return nil
end

--- A free personal account number.
---@return string? number The number, or nil when none could be found.
function numberPool.account()
  local rule <const> = BankingConfig.accounts

  return unique(rule.numberPrefix, rule.numberLength, ACCOUNT_LOOKUP)
end

--- A free company account number, same length, the company prefix.
---@return string? number The number, or nil when none could be found.
function numberPool.companyAccount()
  local prefix <const> = BankingConfig.enterprise.accounts.numberPrefix

  return unique(prefix, BankingConfig.accounts.numberLength, ACCOUNT_LOOKUP)
end

--- A free card number.
---@return string? number The number, or nil when none could be found.
function numberPool.card()
  local rule <const> = BankingConfig.cards

  return unique(rule.numberPrefix, rule.numberLength, CARD_LOOKUP)
end

Banking.numbers = numberPool
