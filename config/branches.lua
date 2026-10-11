BranchesConfig = {
  --- Banker
  ---
  --- The advisor standing behind every counter. The ped only exists for a
  --- player close enough, within `spawnDistance`, and leaves once they are
  --- gone. Aiming at them, in classic or free target mode, offers the
  --- option that opens the bank, reachable within `interactDistance`.
  ---
  --- `scenario` is what the banker does while waiting, false for a plain
  --- idle stance. A branch may carry its own `model`.
  banker = {
    model = 'u_m_m_bankman',
    scenario = 'WORLD_HUMAN_STAND_IMPATIENT',
    spawnDistance = 40.0,
    interactDistance = 2.5,
  },

  --- Target
  ---
  --- The option shown on the banker. `icon` is a name of siku_target's
  --- icon map.
  target = {
    icon = 'wallet',
  },

  --- Blips
  ---
  --- One map marker per branch. `sprite`, `color` and `scale` follow the
  --- game's blip values.
  blip = {
    enabled = true,
    sprite = 108,
    color = 4,
    scale = 0.75,
  },

  --- Security
  ---
  --- The server only opens the bank for a player standing within
  --- `maxDistance` of a banker, whatever the client says.
  security = {
    maxDistance = 6.0,
  },

  --- Branches
  ---
  --- Every agency of the bank and where its banker stands, `w` being the
  --- heading. [IN-GAME TUNING] the positions follow the game's counters
  --- and may need a nudge.
  branches = {
    { name = 'legion', label = 'Fleeca · Legion Square', banker = vector4(149.46, -1042.09, 29.37, 335.43) },
    { name = 'alta', label = 'Fleeca · Hawick Avenue', banker = vector4(313.84, -280.58, 54.16, 338.31) },
    { name = 'burton', label = 'Fleeca · Burton', banker = vector4(-351.23, -51.28, 49.04, 341.73) },
    { name = 'rockford', label = 'Fleeca · Rockford Hills', banker = vector4(-1211.90, -331.90, 37.78, 20.07) },
    { name = 'banham', label = 'Fleeca · Great Ocean Highway', banker = vector4(-2961.14, 483.09, 15.70, 83.84) },
    { name = 'harmony', label = 'Fleeca · Route 68', banker = vector4(1174.80, 2708.20, 38.09, 178.52) },
    { name = 'paleto', label = 'Blaine County Savings', banker = vector4(-112.22, 6471.01, 31.63, 134.18) },
    { name = 'pacific', label = 'Pacific Standard', banker = vector4(241.44, 227.19, 106.29, 170.43) },
  },
}
