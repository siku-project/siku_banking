local rules <const> = Banking.rules
local customerStore <const> = Banking.customers
local accountStore <const> = Banking.store
local branchAccess <const> = Banking.access
local sessionViews <const> = Banking.views
local personalActions <const> = Banking.actions
local companyActions <const> = Banking.companyActions

local CALLBACK <const> = 'siku_banking:callback:%s'
local ENTERPRISE_PREFIX <const> = rules.ENTERPRISE_PREFIX

local sessionService <const> = {}

--- Loads what the bank keeps about a character who entered play.
---@param characterId number The character id.
---@return nil
local function load(characterId)
  customerStore.load(characterId)
  accountStore.load(characterId)
end

--- Forgets a character who left play.
---@param characterId number The character id.
---@return nil
local function forget(characterId)
  customerStore.forget(characterId)
  accountStore.forget(characterId)
end

--- The function behind an action name: the enterprise ones carry the prefix.
---@param name string The action name.
---@return function action The action, receiving (characterId, data).
local function actionOf(name)
  if name:sub(1, #ENTERPRISE_PREFIX) == ENTERPRISE_PREFIX then
    return companyActions[name:sub(#ENTERPRISE_PREFIX + 1)]
  end

  return personalActions[name]
end

--- Answers an action asked from the interface, once the character is known
--- and standing where the bank serves them.
---@param name string The action name.
---@return function handler The callback handler.
local function handlerFor(name)
  local action <const> = actionOf(name)

  return function(sessionId, data)
    local characterId <const> = sessionViews.characterOf(sessionId)

    if not characterId then
      return { ok = false, reason = 'not_ready' }
    end

    if not branchAccess.isAllowed(sessionId) then
      return { ok = false, reason = 'too_far' }
    end

    return action(characterId, type(data) == 'table' and data or {})
  end
end

--- Loads every character already in play, after a restart of the resource.
---@return nil
function sessionService.restoreConnected()
  for _, sessionId in ipairs(Siku.cache.getSessionIds()) do
    local characterId <const> = sessionViews.characterOf(sessionId)

    if characterId then
      load(characterId)
    end
  end
end

--- Registers the session callback, one callback per action, and follows
--- the characters entering and leaving play.
---@return nil
function sessionService.listen()
  Siku.callback.register(CALLBACK:format('session'), function(sessionId)
    if not branchAccess.isAllowed(sessionId) then
      return nil
    end

    return sessionViews.describe(sessionId)
  end)

  for _, name in ipairs(rules.ACTIONS) do
    Siku.callback.register(CALLBACK:format(name), handlerFor(name))
  end

  AddEventHandler('siku:server:createCharacterInstance', function(_, characterData)
    if type(characterData) ~= 'table' or type(characterData.id) ~= 'number' then
      return
    end

    CreateThread(function()
      load(characterData.id)
    end)
  end)

  AddEventHandler('siku:server:releaseCharacterInstance', function(_, characterId)
    if type(characterId) == 'number' then
      forget(characterId)
    end
  end)
end

Banking.session = sessionService
