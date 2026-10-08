MigrationConfig = {
  --- Whether this resource migrates its own schema on startup.
  enabled = true,

  --- Whether a schema whose version was already applied is still inspected
  --- for elements that went missing.
  detectMissing = true,

  --- Resources whose schema must be fully applied before this one runs.
  ---
  --- Bank accounts hang on core accounts and customers are characters, so
  --- the core schema has to exist first whatever the start order.
  dependencies = { 'siku_core' },

  schema = {
    --- Bump this whenever the tables below change.
    version = '1.0.0',

    tables = {
      --- One row per account the bank serves, owned by a character or by a
      --- company (a job of the core). The balance is a copy of the core
      --- account's, kept in step on every movement; the core stays the
      --- truth. `cards` is the JSON list of the cards linked to the account:
      --- number, holder, PIN or employee, state, misses, lock, cap, expiry.
      --- `beneficiaries` holds the saved suppliers of a company, on its main
      --- account only.
      {
        name = 'bank_accounts',
        columns = {
          { name = 'account_id', type = 'INT', unsigned = true, primaryKey = true },
          { name = 'owner_type', type = 'VARCHAR(16)', notNull = true, default = "'character'" },
          { name = 'character_id', type = 'INT', unsigned = true, default = 'NULL' },
          { name = 'job_name', type = 'VARCHAR(64)', default = 'NULL' },
          { name = 'number', type = 'CHAR(12)', notNull = true, unique = true },
          { name = 'label', type = 'VARCHAR(64)', notNull = true },
          { name = 'is_main', type = 'TINYINT(1)', notNull = true, default = 0 },
          { name = 'balance', type = 'BIGINT', notNull = true, default = 0 },
          { name = 'cards', type = 'LONGTEXT', notNull = true },
          { name = 'beneficiaries', type = 'LONGTEXT', default = 'NULL' },
          { name = 'created_at', type = 'TIMESTAMP', default = 'CURRENT_TIMESTAMP' },
          {
            name = 'updated_at',
            type = 'TIMESTAMP',
            default = 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },
        },
        indexes = {
          { name = 'idx_bank_accounts_character', columns = { 'character_id' } },
          { name = 'idx_bank_accounts_job', columns = { 'owner_type', 'job_name' } },
        },
        foreignKeys = {
          {
            column = 'account_id',
            references = { table = 'accounts', column = 'id' },
            onDelete = 'CASCADE',
            onUpdate = 'CASCADE',
          },
          {
            column = 'character_id',
            references = { table = 'characters', column = 'id' },
            onDelete = 'CASCADE',
            onUpdate = 'CASCADE',
          },
        },
      },

      --- One row per transfer: from which account to which, how much, the
      --- fee on top, the reference the sender wrote and who sent it.
      {
        name = 'bank_transfers',
        columns = {
          { name = 'id', type = 'INT', unsigned = true, primaryKey = true, autoIncrement = true },
          { name = 'from_account_id', type = 'INT', unsigned = true, notNull = true },
          { name = 'to_account_id', type = 'INT', unsigned = true, notNull = true },
          { name = 'amount', type = 'BIGINT', unsigned = true, notNull = true },
          { name = 'fee', type = 'BIGINT', unsigned = true, notNull = true, default = 0 },
          { name = 'label', type = 'VARCHAR(64)', notNull = true },
          { name = 'performed_by', type = 'INT', unsigned = true },
          { name = 'created_at', type = 'TIMESTAMP', default = 'CURRENT_TIMESTAMP' },
        },
        indexes = {
          { name = 'idx_bank_transfers_from', columns = { 'from_account_id', 'created_at' } },
          { name = 'idx_bank_transfers_to', columns = { 'to_account_id', 'created_at' } },
        },
        foreignKeys = {
          {
            column = 'from_account_id',
            references = { table = 'accounts', column = 'id' },
            onDelete = 'CASCADE',
            onUpdate = 'CASCADE',
          },
          {
            column = 'to_account_id',
            references = { table = 'accounts', column = 'id' },
            onDelete = 'CASCADE',
            onUpdate = 'CASCADE',
          },
        },
      },

      --- One row per customer: what belongs to the person, not to one of
      --- their accounts. `preferences` and `beneficiaries` are JSON.
      {
        name = 'bank_customers',
        columns = {
          { name = 'character_id', type = 'INT', unsigned = true, primaryKey = true },
          { name = 'preferences', type = 'TEXT', notNull = true },
          { name = 'beneficiaries', type = 'TEXT', notNull = true },
          { name = 'onboarded_at', type = 'TIMESTAMP', default = 'CURRENT_TIMESTAMP' },
          {
            name = 'updated_at',
            type = 'TIMESTAMP',
            default = 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },
        },
        foreignKeys = {
          {
            column = 'character_id',
            references = { table = 'characters', column = 'id' },
            onDelete = 'CASCADE',
            onUpdate = 'CASCADE',
          },
        },
      },
    },
  },
}
