local personalAccounts <const> = Banking.accounts

local transferService <const> = {}

local REASON <const> = 'transfer:%s'
local INSERT_QUERY <const> = table.concat({
  'INSERT INTO bank_transfers (from_account_id, to_account_id, amount, fee, label, performed_by)',
  'VALUES (?, ?, ?, ?, ?, ?)',
}, ' ')

--- The fee taken on an amount, per the configuration.
---@param amount number The amount moved.
---@return number fee The fee, whole.
function transferService.feeOf(amount)
  local fee <const> = BankingConfig.transfers.fee
  local rate <const> = type(fee.rate) == 'number' and fee.rate or 0
  local fixed <const> = type(fee.fixed) == 'number' and fee.fixed or 0

  return math.max(0, math.floor(amount * rate + fixed + 0.5))
end

--- Reads a raw amount as a whole number inside the bank's bounds.
---@param value any The raw amount.
---@return number? amount The amount, nil when unusable.
---@return string? reason `invalid_amount` or `amount_limit`.
function transferService.amount(value)
  local amount <const> = math.tointeger(tonumber(value))
  local rule <const> = BankingConfig.transfers

  if not amount or amount <= 0 then
    return nil, 'invalid_amount'
  end

  if amount < rule.minAmount or (rule.maxAmount and amount > rule.maxAmount) then
    return nil, 'amount_limit'
  end

  return amount
end

--- The mutations of a transfer: the sender pays the amount and the fee,
--- the recipient gets the amount, the fee account gets the fee when one
--- is configured.
---@param fromAccountId number The sender's account.
---@param toAccountId number The recipient's account.
---@param amount number The amount moved.
---@param fee number The fee taken.
---@return table mutations The batch.
local function batch(fromAccountId, toAccountId, amount, fee)
  local mutations <const> = {
    { account = fromAccountId, delta = -(amount + fee) },
    { account = toAccountId, delta = amount },
  }
  local feeAccount <const> = BankingConfig.transfers.fee.account

  if fee > 0 and type(feeAccount) == 'number' and feeAccount ~= fromAccountId then
    mutations[#mutations + 1] = { account = feeAccount, delta = fee }
  end

  return mutations
end

--- Moves money from one of the character's accounts to a recipient, all
--- of it or nothing.
---@param characterId number The character id.
---@param fromAccountId number The sender's account.
---@param recipient table { accountId, number, holder } from the recipients module.
---@param amount number The amount, already validated.
---@param label string The wording, already validated.
---@return boolean moved Whether the money moved.
---@return string? reason Why it was refused.
---@return number? fee The fee taken when it moved.
function transferService.execute(characterId, fromAccountId, recipient, amount, label)
  local account <const>, reason <const> = personalAccounts.owned(characterId, fromAccountId)

  if not account then
    return false, reason
  end

  return transferService.send(account.id, recipient, amount, label, characterId)
end

--- Moves money from an account the caller already vouched for to a
--- recipient, in one atomic batch of the core, then writes the transfer
--- row. The core refuses on its own a frozen account or a short balance.
---@param fromAccountId number The sender's account, checked by the caller.
---@param recipient table { accountId } from the recipients module.
---@param amount number The amount, already validated.
---@param label string The wording, already validated.
---@param performedBy number The character who signs the transfer.
---@return boolean moved Whether the money moved.
---@return string? reason Why it was refused.
---@return number? fee The fee taken when it moved.
function transferService.send(fromAccountId, recipient, amount, label, performedBy)
  if fromAccountId == recipient.accountId then
    return false, 'same_account'
  end

  local fee <const> = transferService.feeOf(amount)
  local applied <const>, refused <const> = Siku.accounts.apply(
    batch(fromAccountId, recipient.accountId, amount, fee),
    { reason = REASON:format(label), performedBy = performedBy }
  )

  if not applied then
    return false, refused
  end

  MySQL.insert(INSERT_QUERY, { fromAccountId, recipient.accountId, amount, fee, label, performedBy })

  return true, nil, fee
end

Banking.transfers = transferService
