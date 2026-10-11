local bankUi <const> = Banking.ui

local CORE_ACCOUNTS_EVENT <const> = 'siku:client:accountsUpdated'
local CORE_JOBS_EVENT <const> = 'siku:client:jobsUpdated'

local gameEvents <const> = {}

--- Follows the server asking to open or close the bank, the core telling
--- accounts or jobs moved, and the resource stopping.
---@return nil
function gameEvents.listen()
  RegisterNetEvent('siku_banking:client:setOpen', function(open)
    if open then
      bankUi.open()
    else
      bankUi.close()
    end
  end)

  RegisterNetEvent(CORE_ACCOUNTS_EVENT, bankUi.refresh)
  RegisterNetEvent(CORE_JOBS_EVENT, bankUi.refresh)

  AddEventHandler('onResourceStop', function(resource)
    if resource == Siku.name then
      SetNuiFocus(false, false)
    end
  end)
end

Banking.events = gameEvents
