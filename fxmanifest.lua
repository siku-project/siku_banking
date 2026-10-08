fx_version 'cerulean'
game 'gta5'

author 'Siku Studio'
description 'The banking layer of the SIKU ecosystem — a secure, modular system for personal and business accounts, transfers, cards, ATMs and financial services. Built to integrate seamlessly with SIKU Core while keeping banking logic flexible and extensible.'
version '0.1.0'

name 'siku_banking'

lua54 'yes'

shared_scripts {
  '@siku_core/init.lua',
  'config/translation.lua',
  'config/banking.lua',
  'config/branches.lua',
  'shared/namespace.lua',
  'shared/modules/rules.lua',
  'shared/modules/locale.lua',
}

server_scripts {
  '@oxmysql/lib/MySQL.lua',
  'config/migration.lua',
  'server/modules/preferences.lua',
  'server/modules/store.lua',
  'server/modules/customers.lua',
  'server/modules/numbers.lua',
  'server/modules/cards.lua',
  'server/modules/accounts.lua',
  'server/modules/recipients.lua',
  'server/modules/beneficiaries.lua',
  'server/modules/transfers.lua',
  'server/modules/history.lua',
  'server/modules/companies.lua',
  'server/modules/enterprise.lua',
  'server/modules/access.lua',
  'server/modules/alerts.lua',
  'server/modules/views.lua',
  'server/modules/actions.lua',
  'server/modules/company-actions.lua',
  'server/modules/session.lua',
  'server/modules/api.lua',
  'server/main.lua',
}

client_scripts {
  'client/modules/state.lua',
  'client/modules/nui.lua',
  'client/modules/ui.lua',
  'client/modules/events.lua',
  'client/modules/branches.lua',
  'client/main.lua',
}

ui_page 'web/dist/index.html'

files {
  'translations/*.lua',
  'web/dist/**/*',
}

dependencies {
  'siku_core',
  'siku_target',
  'oxmysql',
}
