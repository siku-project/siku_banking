local rules <const> = {}

local PIN_LENGTH <const> = 4
local LABEL_MIN <const> = 2

--- The kind written in the metadata of every account the bank opens for a
--- character. Company accounts are another side of the bank.
rules.ACCOUNT_KIND = 'personal'

--- Where a card stands. A cancelled card is kept for the record only.
rules.CARD_STATES = { ACTIVE = 'active', BLOCKED = 'blocked', CANCELLED = 'cancelled' }

--- How many digits a PIN carries.
rules.PIN_LENGTH = PIN_LENGTH

--- Who a bank account belongs to, as the core names it.
rules.OWNERS = { CHARACTER = 'character', JOB = 'job' }

--- What an employee may do on a company account, granted through the core.
rules.ACCESS_LEVELS = { VIEW = 'view', SPEND = 'spend' }

--- The prefix of every action of the enterprise side.
rules.ENTERPRISE_PREFIX = 'enterprise:'

--- Every action the interface may ask, the same name from the NUI callback
--- to the server callback. The enterprise ones carry the prefix above.
rules.ACTIONS = {
  'onboard',
  'openAccount',
  'renameAccount',
  'setMainAccount',
  'closeAccount',
  'orderCard',
  'setCardState',
  'cancelCard',
  'changePin',
  'lookupRecipient',
  'transfer',
  'addBeneficiary',
  'removeBeneficiary',
  'loadHistory',
  'savePreferences',
  'blockAllCards',
  'enterprise:openAccount',
  'enterprise:renameAccount',
  'enterprise:setAccess',
  'enterprise:issueCard',
  'enterprise:setCardState',
  'enterprise:setCardLimit',
  'enterprise:transfer',
  'enterprise:addSupplier',
  'enterprise:removeSupplier',
}

--- Trims a label and tells whether it fits the bank's rule.
---@param value any The raw label.
---@param max number The longest label allowed.
---@return string? label The trimmed label when acceptable, nil otherwise.
function rules.label(value, max)
  if type(value) ~= 'string' then
    return nil
  end

  local trimmed <const> = value:match('^%s*(.-)%s*$')
  local length <const> = utf8.len(trimmed) or #trimmed

  if length < LABEL_MIN or length > max then
    return nil
  end

  return trimmed
end

--- Whether a value is a PIN: exactly four digits.
---@param value any The raw PIN.
---@return boolean valid Whether it is usable.
function rules.isPin(value)
  return type(value) == 'string' and #value == PIN_LENGTH and value:match('^%d+$') ~= nil
end

--- Whether a value names a card state a customer may ask for.
---@param value any The raw state.
---@return boolean valid Whether it is `active` or `blocked`.
function rules.isRequestableCardState(value)
  return value == rules.CARD_STATES.ACTIVE or value == rules.CARD_STATES.BLOCKED
end

--- Reads a raw id from the interface as a positive integer.
---@param value any The raw id.
---@return number? id The id, or nil.
function rules.id(value)
  local number <const> = math.tointeger(tonumber(value))

  if number == nil or number <= 0 then
    return nil
  end

  return number
end

Banking.rules = rules
