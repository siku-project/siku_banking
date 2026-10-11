local rules <const> = Banking.rules
local uiState <const> = Banking.state
local nuiBridge <const> = Banking.nui

local bankUi <const> = {}

local CALLBACK <const> = 'siku_banking:callback:%s'
local NUI_ACTION <const> = 'siku_banking:nui:%s'
local UNREACHABLE <const> = { ok = false, reason = 'unreachable' }
local ACTIONS <const> = rules.ACTIONS

--- Asks the server for the whole session of the player.
---@return table? session { customer, bank, theme }, or nil without a character.
local function fetchSession()
  local ok <const>, session <const> = Siku.callback.triggerServer(CALLBACK:format('session'))

  if not ok or type(session) ~= 'table' then
    return nil
  end

  return session
end

--- Shows the bank, once the server said who the customer is: the
--- interface plays its opening over data already there.
---@return boolean opened Whether the bank is now on screen.
function bankUi.open()
  if uiState.isOpen() then
    return true
  end

  local session <const> = fetchSession()

  if not session then
    Siku.notification.show({
      type = 'error',
      title = T('notify_title'),
      description = T('bank_unavailable'),
    })
    return false
  end

  uiState.setSession(session)
  nuiBridge.pushSession(session)
  uiState.setOpen(true)
  SetNuiFocus(true, true)
  nuiBridge.setVisible(true)

  return true
end

--- Hides the bank and gives the game its controls back.
---@return nil
function bankUi.close()
  if not uiState.isOpen() then
    return
  end

  uiState.setOpen(false)
  SetNuiFocus(false, false)
  nuiBridge.setVisible(false)
  TriggerServerEvent('siku_banking:server:closed')
end

--- Refreshes what the interface shows, after the money moved elsewhere.
---@return nil
function bankUi.refresh()
  if not uiState.isOpen() then
    return
  end

  local session <const> = fetchSession()

  if not session then
    bankUi.close()
    return
  end

  uiState.setSession(session)
  nuiBridge.pushSession(session)
end

--- Forwards an action of the interface to the server and hands the
--- answer back, the same shape either way.
---@param name string The action name.
---@return nil
local function forward(name)
  RegisterNUICallback(NUI_ACTION:format(name), function(data, cb)
    local ok <const>, outcome <const> =
      Siku.callback.triggerServer(CALLBACK:format(name), type(data) == 'table' and data or {})

    if not ok or type(outcome) ~= 'table' then
      cb(UNREACHABLE)
      return
    end

    cb(outcome)
  end)
end

--- Registers the close button and one NUI callback per action.
---@return nil
function bankUi.listen()
  RegisterNUICallback(NUI_ACTION:format('close'), function(_, cb)
    cb({})
    bankUi.close()
  end)

  for _, name in ipairs(ACTIONS) do
    forward(name)
  end
end

Banking.ui = bankUi
