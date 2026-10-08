local branchAccess <const> = {}

--- Sessions another resource opened the bank for, through the export,
--- whatever their position; cleared when the bank closes.
local granted <const> = {}

--- Whether a player stands close enough to one of the bankers.
---@param sessionId number The player server id.
---@return boolean near Whether a banker is within reach.
function branchAccess.isNearBranch(sessionId)
  local ped <const> = GetPlayerPed(tostring(sessionId))

  if not ped or ped == 0 then
    return false
  end

  local coords <const> = GetEntityCoords(ped)
  local reach <const> = BranchesConfig.security.maxDistance

  for _, branch in ipairs(BranchesConfig.branches) do
    if #(coords - branch.banker.xyz) <= reach then
      return true
    end
  end

  return false
end

--- Whether the bank may answer a player: near a banker, or opened for
--- them by another resource.
---@param sessionId number The player server id.
---@return boolean allowed Whether the bank answers.
function branchAccess.isAllowed(sessionId)
  return granted[sessionId] == true or branchAccess.isNearBranch(sessionId)
end

--- Lets a player use the bank from anywhere until it closes.
---@param sessionId number The player server id.
---@return nil
function branchAccess.grant(sessionId)
  granted[sessionId] = true
end

--- Takes back an access given through the export.
---@param sessionId number The player server id.
---@return nil
function branchAccess.revoke(sessionId)
  granted[sessionId] = nil
end

--- Takes an access back when the bank closes or the player leaves.
---@return nil
function branchAccess.listen()
  RegisterNetEvent('siku_banking:server:closed', function()
    branchAccess.revoke(source)
  end)

  AddEventHandler('playerDropped', function()
    branchAccess.revoke(source)
  end)
end

Banking.access = branchAccess
