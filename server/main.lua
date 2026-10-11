local accountStore <const> = Banking.store
local recipientBook <const> = Banking.recipients
local branchAccess <const> = Banking.access
local balanceAlerts <const> = Banking.alerts
local sessionService <const> = Banking.session
local bankExports <const> = Banking.api

local REQUIRED_CORE_VERSION <const> = '1.4.0'
local RELEASE_REPOSITORY <const> = 'siku-project/siku_banking'

--- Checks the core is recent enough, stopping the resource otherwise.
---@return nil
local function checkCore()
  local dependency <const> = Siku.version.checkDependency('siku_core', REQUIRED_CORE_VERSION)

  if not dependency.ok then
    Siku.print.throw(dependency.message)
  end

  Siku.print.success(('Linked to siku_core (%s)'):format(dependency.currentVersion))
  Siku.version.checkRelease(RELEASE_REPOSITORY)
end

--- Migrates the schema, then loads the characters already in play.
---@return nil
local function start()
  if not Siku.migration.run(MigrationConfig) then
    return
  end

  sessionService.restoreConnected()

  Siku.print.success(('Bank ready, %d branch(es), %d account(s) per customer'):format(
    #BranchesConfig.branches,
    BankingConfig.accounts.maxPerCharacter
  ))
end

checkCore()
accountStore.listen()
recipientBook.listen()
branchAccess.listen()
balanceAlerts.listen()
sessionService.listen()
bankExports.register()
CreateThread(start)
