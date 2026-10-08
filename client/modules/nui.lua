local bankLocale <const> = Banking.locale
local uiState <const> = Banking.state

local nuiBridge <const> = {}

local NUI_READY <const> = 'siku_banking:nui:ready'
local ACTION_LOCALE <const> = 'siku_banking:nui:setLocale'
local ACTION_DATA <const> = 'siku_banking:nui:setData'
local ACTION_VISIBLE <const> = 'siku_banking:nui:setVisible'

--- Sends the interface the language and its strings.
---@return nil
function nuiBridge.pushLocale()
  SendNUIMessage({ action = ACTION_LOCALE, locale = bankLocale.describe() })
end

--- Sends the interface the customer, their money and the colour mode.
---@param session table { customer, bank, enterprise, theme }.
---@return nil
function nuiBridge.pushSession(session)
  SendNUIMessage({ action = ACTION_DATA, payload = session })
end

--- Shows or hides the interface.
---@param visible boolean Whether the bank is on screen.
---@return nil
function nuiBridge.setVisible(visible)
  SendNUIMessage({ action = ACTION_VISIBLE, payload = { visible = visible == true } })
end

--- Answers the interface once it loaded: the language, its strings and
--- the last session, so a reload lands where the player was.
---@return nil
function nuiBridge.listen()
  RegisterNUICallback(NUI_READY, function(_, cb)
    local session <const> = uiState.session() or {}

    cb({
      locale = bankLocale.describe(),
      visible = uiState.isOpen(),
      theme = session.theme or BankingConfig.interface.theme,
      customer = session.customer,
      bank = session.bank,
      enterprise = session.enterprise,
    })
  end)
end

Banking.nui = nuiBridge
