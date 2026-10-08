local preferenceRules <const> = {}

local THEMES <const> = { dark = true, light = true }
local FLAGS <const> = { 'intro', 'discreet', 'notifyIncoming', 'notifyOutgoing' }

--- What a customer starts with, the configured theme included.
---@return table preferences { theme, intro, discreet, notifyIncoming, notifyOutgoing, lowBalance }.
function preferenceRules.defaults()
  local defaults <const> = BankingConfig.preferences.defaults
  local theme <const> = BankingConfig.interface.theme

  return {
    theme = THEMES[theme] and theme or 'dark',
    intro = defaults.intro ~= false,
    discreet = defaults.discreet == true,
    notifyIncoming = defaults.notifyIncoming ~= false,
    notifyOutgoing = defaults.notifyOutgoing == true,
    lowBalance = math.tointeger(defaults.lowBalance) or 0,
  }
end

--- Reads a low-balance threshold inside the bank's bounds.
---@param value any The raw threshold.
---@return number? threshold The whole threshold, nil when unusable.
local function threshold(value)
  local number <const> = math.tointeger(tonumber(value))

  if not number or number < 0 or number > BankingConfig.preferences.lowBalanceMax then
    return nil
  end

  return number
end

--- Keeps the known keys of a patch that carry a usable value.
---@param patch any The raw patch.
---@return table? clean The accepted fields, nil when one of them is wrong.
function preferenceRules.validate(patch)
  if type(patch) ~= 'table' then
    return nil
  end

  local clean <const> = {}

  if patch.theme ~= nil then
    if not THEMES[patch.theme] then
      return nil
    end

    clean.theme = patch.theme
  end

  for index = 1, #FLAGS do
    local key <const> = FLAGS[index]
    local value <const> = patch[key]

    if value ~= nil and type(value) ~= 'boolean' then
      return nil
    end

    clean[key] = value
  end

  if patch.lowBalance ~= nil then
    clean.lowBalance = threshold(patch.lowBalance)

    if clean.lowBalance == nil then
      return nil
    end
  end

  return next(clean) and clean or nil
end

--- A full set from what the database stored, unknown or broken fields
--- replaced by the defaults.
---@param stored any The decoded JSON.
---@return table preferences The full set.
function preferenceRules.from(stored)
  local preferences <const> = preferenceRules.defaults()
  local clean <const> = preferenceRules.validate(stored)

  if clean then
    for key, value in pairs(clean) do
      preferences[key] = value
    end
  end

  return preferences
end

Banking.preferences = preferenceRules
