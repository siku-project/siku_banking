local enterpriseAccess <const> = {}

--- Whether one of the character's roles carries the staff permission.
---@param characterId number The character id.
---@return boolean allowed Whether the role path opens the door.
local function byRole(characterId)
  local permission <const> = BankingConfig.enterprise.permission

  if type(permission) ~= 'string' or permission == '' then
    return false
  end

  return Siku.permissions.hasPermission(characterId, permission)
end

--- Whether one of the character's jobs grants the job permission.
---@param characterId number The character id.
---@return boolean allowed Whether the job path opens the door.
local function byJob(characterId)
  local permission <const> = BankingConfig.enterprise.jobPermission

  if type(permission) ~= 'string' or permission == '' then
    return false
  end

  local memberships <const> = Siku.jobs.getMemberships(characterId)

  for index = 1, #memberships do
    if Siku.jobs.hasPermission(characterId, memberships[index].job, permission) then
      return true
    end
  end

  return false
end

--- Whether a character may switch to the enterprise side of the bank.
---@param characterId number The character id.
---@return boolean allowed Whether the button shows.
function enterpriseAccess.isAllowed(characterId)
  return byRole(characterId) or byJob(characterId)
end

Banking.enterprise = enterpriseAccess
