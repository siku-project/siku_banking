local nuiBridge <const> = Banking.nui
local bankUi <const> = Banking.ui
local gameEvents <const> = Banking.events
local branchWatch <const> = Banking.branches

nuiBridge.listen()
bankUi.listen()
gameEvents.listen()
branchWatch.start()
