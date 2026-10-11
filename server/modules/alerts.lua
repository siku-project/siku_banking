local rules <const> = Banking.rules
local accountStore <const> = Banking.store
local customerStore <const> = Banking.customers

local balanceAlerts <const> = {}

local OWNER_CHARACTER <const> = rules.OWNERS.CHARACTER
local CURRENCY <const> = '%s $'

--- An amount as players read it.
---@param value number The amount.
---@return string text The formatted amount.
local function money(value)
  return CURRENCY:format(Siku.math.formatNumber(math.abs(value)))
end

--- The session and preferences of the customer owning an account, when
--- they are in play with the bank closed.
---@param account table The core account.
---@return number? sessionId The player server id, nil when nobody listens.
---@return table? preferences The customer's preferences.
local function listenerOf(account)
  if account.ownerType ~= OWNER_CHARACTER then
    return nil
  end

  if not customerStore.isOnboarded(account.ownerId) then
    return nil
  end

  local sessionId <const> = Siku.cache.getSessionByCharacter(account.ownerId)

  if not sessionId then
    return nil
  end

  return sessionId, customerStore.preferencesOf(account.ownerId)
end

--- The label of an account for a notification.
---@param account table The core account.
---@return string label The label.
local function labelOf(account)
  local entry <const> = accountStore.get(account.ownerId, account.id)

  return entry and entry.label or T('account_default_label')
end

--- Tells a customer money moved on an account, per their preferences.
---@param sessionId number The player server id.
---@param preferences table The customer's preferences.
---@param account table The core account.
---@param balance number The new balance.
---@param delta number The signed movement.
---@param selfMade boolean Whether the customer made the movement.
---@return nil
local function notify(sessionId, preferences, account, balance, delta, selfMade)
  local label <const> = labelOf(account)

  if delta > 0 and preferences.notifyIncoming then
    Siku.notification.show(sessionId, {
      type = 'success',
      title = T('notify_title'),
      description = T('notify_incoming', money(delta), label),
    })
  elseif delta < 0 and preferences.notifyOutgoing and not selfMade then
    Siku.notification.show(sessionId, {
      type = 'info',
      title = T('notify_title'),
      description = T('notify_outgoing', money(delta), label),
    })
  end

  local threshold <const> = preferences.lowBalance

  if threshold > 0 and balance < threshold and balance - delta >= threshold then
    Siku.notification.show(sessionId, {
      type = 'warning',
      title = T('notify_title'),
      description = T('notify_low_balance', label, money(threshold)),
    })
  end
end

--- Tells the owner of an account that money moved on it, when they listen.
---@param accountId any The account id.
---@param balance number The new balance.
---@param delta any The signed movement.
---@param _ any The batch id.
---@param _ any The reason.
---@param performedBy any The character who made it.
---@return nil
local function onBalanceChanged(accountId, balance, delta, _, _, performedBy)
  if type(delta) ~= 'number' or delta == 0 then
    return
  end

  local account <const> = Siku.accounts.getAccount(accountId)

  if not account then
    return
  end

  local sessionId <const>, preferences <const> = listenerOf(account)

  if sessionId then
    notify(sessionId, preferences, account, balance, delta, performedBy == account.ownerId)
  end
end

--- Starts the in-game notifications on balance movements.
---@return nil
function balanceAlerts.listen()
  AddEventHandler('siku:accounts:balanceChanged', onBalanceChanged)
end

Banking.alerts = balanceAlerts
