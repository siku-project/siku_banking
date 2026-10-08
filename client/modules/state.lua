local uiState <const> = {}

local open = false
local session = nil

--- Whether the bank is on screen.
---@return boolean open Whether the interface shows.
function uiState.isOpen()
  return open
end

--- Keeps whether the bank is on screen.
---@param value boolean Whether the interface shows.
---@return nil
function uiState.setOpen(value)
  open = value == true
end

--- What the server last said about the customer and their money.
---@return table? session { customer, bank, theme }, or nil before the first answer.
function uiState.session()
  return session
end

--- Keeps the session the server sent.
---@param value table? The session, or nil to forget it.
---@return nil
function uiState.setSession(value)
  session = type(value) == 'table' and value or nil
end

Banking.state = uiState
