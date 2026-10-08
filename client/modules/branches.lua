local bankUi <const> = Banking.ui

local branchWatch <const> = {}

local TARGET_RESOURCE <const> = 'siku_target'
local PED_TYPE <const> = 4
local GROUND_OFFSET <const> = 1.0

--- The banker of each branch while a player is near, by branch index.
local bankers <const> = {}
local blips <const> = {}
local points <const> = {}

--- The option that opens the bank from a banker.
---@return table option The siku_target option.
local function bankOption()
  return {
    label = T('target_open_bank'),
    icon = BranchesConfig.target.icon,
    distance = BranchesConfig.banker.interactDistance,
    onSelect = function()
      bankUi.open()
    end,
  }
end

--- Keeps a ped where it stands: no fleeing, no ragdoll, no reaction.
---@param ped number The ped handle.
---@return nil
local function settle(ped)
  SetEntityInvincible(ped, true)
  FreezeEntityPosition(ped, true)
  SetBlockingOfNonTemporaryEvents(ped, true)
  SetPedCanRagdoll(ped, false)
  SetPedFleeAttributes(ped, 0, false)
  SetPedDiesWhenInjured(ped, false)
  SetEntityAsMissionEntity(ped, true, true)

  local scenario <const> = BranchesConfig.banker.scenario

  if type(scenario) == 'string' and scenario ~= '' then
    TaskStartScenarioInPlace(ped, scenario, 0, true)
  end
end

--- Places the banker of a branch and hands it to the target.
---@param index number The branch index.
---@return nil
local function spawn(index)
  if bankers[index] then
    return
  end

  bankers[index] = { pending = true }

  local branch <const> = BranchesConfig.branches[index]
  local hash <const> = Siku.streaming.requestModel(branch.model or BranchesConfig.banker.model)
  local position <const> = branch.banker

  if not bankers[index] then
    SetModelAsNoLongerNeeded(hash)
    return
  end

  local ped <const> = CreatePed(
    PED_TYPE,
    hash,
    position.x,
    position.y,
    position.z - GROUND_OFFSET,
    position.w,
    false,
    true
  )

  SetModelAsNoLongerNeeded(hash)
  settle(ped)

  bankers[index] = {
    ped = ped,
    target = exports[TARGET_RESOURCE]:AddEntity(ped, bankOption()),
  }
end

--- Takes the banker of a branch away, and its option with it.
---@param index number The branch index.
---@return nil
local function despawn(index)
  local banker <const> = bankers[index]

  bankers[index] = nil

  if not banker or banker.pending then
    return
  end

  if banker.target then
    exports[TARGET_RESOURCE]:Remove(banker.target)
  end

  if DoesEntityExist(banker.ped) then
    DeleteEntity(banker.ped)
  end
end

--- The map marker of a branch.
---@param branch table The branch.
---@return number blip The blip handle.
local function addBlip(branch)
  local rule <const> = BranchesConfig.blip
  local blip <const> = AddBlipForCoord(branch.banker.x, branch.banker.y, branch.banker.z)

  SetBlipSprite(blip, rule.sprite)
  SetBlipColour(blip, rule.color)
  SetBlipScale(blip, rule.scale)
  SetBlipAsShortRange(blip, true)
  BeginTextCommandSetBlipName('STRING')
  AddTextComponentSubstringPlayerName(T('branch_blip'))
  EndTextCommandSetBlipName(blip)

  return blip
end

--- Takes every banker, blip and watch point away.
---@return nil
local function clear()
  for index in pairs(bankers) do
    despawn(index)
  end

  for _, blip in pairs(blips) do
    RemoveBlip(blip)
  end

  for _, point in pairs(points) do
    Siku.spatial.removePoint(point.id)
  end
end

--- Watches every branch: the banker comes when a player nears it, and
--- everything goes away with the resource.
---@return nil
function branchWatch.start()
  AddEventHandler('onResourceStop', function(resource)
    if resource == Siku.name then
      clear()
    end
  end)

  for index, branch in ipairs(BranchesConfig.branches) do
    points[index] = Siku.spatial.addPoint({
      coords = branch.banker.xyz,
      radius = BranchesConfig.banker.spawnDistance,
      onEnter = function()
        CreateThread(function()
          spawn(index)
        end)
      end,
      onExit = function()
        despawn(index)
      end,
    })

    if BranchesConfig.blip.enabled then
      blips[index] = addBlip(branch)
    end
  end
end

Banking.branches = branchWatch
