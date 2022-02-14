export interface KnownRaid {
  name: string;
  imagePath: string | null;
  encounters: KnownEncounter[];
}

export interface KnownEncounter {
  name: string;
  imagePath: string | null;
  order: number;
}

export const knownRaids: KnownRaid[] = [
  {
    name: 'Last Wish',
    imagePath: null,
    encounters: [
      { name: 'Kalli', imagePath: null, order: 1 },
      { name: 'Shuro Chi', imagePath: null, order: 2 },
      { name: 'Morgeth', imagePath: null, order: 3 },
      { name: 'Vault', imagePath: null, order: 4 },
      { name: 'Riven', imagePath: null, order: 5 },
      { name: 'Queenswalk', imagePath: null, order: 6 },
    ],
  },
  {
    name: 'Garden of Salvation',
    imagePath: null,
    encounters: [
      { name: 'Evade Consecrated Mind', imagePath: null, order: 1 },
      { name: 'Summon Consecrated Mind', imagePath: null, order: 2 },
      { name: 'Defeat Consecrated Mind', imagePath: null, order: 3 },
      { name: 'Defeat Sanctified Mind', imagePath: null, order: 4 },
    ],
  },
  {
    name: 'Deep Stone Crypt',
    imagePath: null,
    encounters: [
      { name: 'Sparrow Race', imagePath: null, order: 1 },
      { name: 'Crypt Security', imagePath: null, order: 2 },
      { name: 'Atraks-1', imagePath: null, order: 3 },
      { name: 'Descent', imagePath: null, order: 4 },
      { name: 'Taniks', imagePath: null, order: 5 },
    ],
  },
  {
    name: 'Vault of Glass',
    imagePath: null,
    encounters: [
      { name: 'Vault Opening', imagePath: null, order: 1 },
      { name: 'Confluxes', imagePath: null, order: 2 },
      { name: 'Oracles', imagePath: null, order: 3 },
      { name: 'Templar', imagePath: null, order: 4 },
      { name: 'Labyrinth', imagePath: null, order: 5 },
      { name: 'Gatekeeper', imagePath: null, order: 6 },
      { name: 'Atheon', imagePath: null, order: 7 },
    ],
  },
];
