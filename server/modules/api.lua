local customerStore <const> = Banking.customers
local personalAccounts <const> = Banking.accounts
local enterpriseAccess <const> = Banking.enterprise
local branchAccess <const> = Banking.access
local sessionViews <const> = Banking.views

local bankExports <const> = {}

--- Whether a session is online.
---@param sessionId any The player server id.
---@return boolean online Whether the player is connected.
local function isOnline(sessionId)
  return type(sessionId) == 'number' and GetPlayerName(tostring(sessionId)) ~= nil
end

--- Who a player is for the bank.
---@param sessionId number The player server id.
---@return table? customer { firstName, lastName, birthDate, onboarded, enterprise }, or nil without a character.
local function getCustomer(sessionId)
  local characterId <const> = sessionViews.characterOf(sessionId)

  if not characterId then
    return nil
  end

  return sessionViews.customer(characterId)
end

--- Whether a player already opened their first account.
---@param sessionId number The player server id.
---@return boolean onboarded Whether they are a customer.
local function isOnboarded(sessionId)
  local characterId <const> = sessionViews.characterOf(sessionId)

  return characterId ~= nil and customerStore.isOnboarded(characterId)
end

--- Whether a player may switch to the enterprise side.
---@param sessionId number The player server id.
---@return boolean allowed Whether the button shows for them.
local function isEnterpriseAllowed(sessionId)
  local characterId <const> = sessionViews.characterOf(sessionId)

  return characterId ~= nil and enterpriseAccess.isAllowed(characterId)
end

--- The personal accounts of a player, as the interface shows them.
---@param sessionId number The player server id.
---@return table accounts The list of { id, number, label, state, balance, main }.
local function getAccounts(sessionId)
  local characterId <const> = sessionViews.characterOf(sessionId)

  if not characterId then
    return {}
  end

  return personalAccounts.describe(characterId)
end

--- The main account of a player.
---@param sessionId number The player server id.
---@return number? accountId The core account id, or nil.
local function getMainAccount(sessionId)
  local characterId <const> = sessionViews.characterOf(sessionId)

  if not characterId then
    return nil
  end

  return customerStore.mainOf(characterId)
end

--- Opens or closes the bank on a player's screen. Opened this way, the bank
--- answers wherever the player stands until it closes.
---@param sessionId number The player server id.
---@param open boolean Whether the interface shows.
---@return boolean sent Whether the request reached the client.
local function setBankOpen(sessionId, open)
  if not isOnline(sessionId) then
    return false
  end

  if open then
    branchAccess.grant(sessionId)
  else
    branchAccess.revoke(sessionId)
  end

  TriggerClientEvent('siku_banking:client:setOpen', sessionId, open == true)

  return true
end

--- Publishes the exports other resources call.
---@return nil
function bankExports.register()
  exports('GetCustomer', getCustomer)
  exports('IsOnboarded', isOnboarded)
  exports('IsEnterpriseAllowed', isEnterpriseAllowed)
  exports('GetAccounts', getAccounts)
  exports('GetMainAccount', getMainAccount)
  exports('SetBankOpen', setBankOpen)
end

Banking.api = bankExports
