fx_version 'cerulean'
game 'gta5'

author 'Siku Studio'
description 'The banking layer of the SIKU ecosystem — a secure, modular system for personal and business accounts, transfers, cards, ATMs and financial services. Built to integrate seamlessly with SIKU Core while keeping banking logic flexible and extensible.'
version '0.0.1'

name 'siku_banking'

lua54 'yes'

shared_scripts {}

server_scripts {}

client_scripts {}

ui_page 'web/dist/index.html'

files {
  'translations/*.lua',
  'web/dist/**/*',
}

dependencies {}
