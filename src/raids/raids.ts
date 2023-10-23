export interface Raid {
  name: string;
  imagePath: string | null;
  wheelColor: string;
  wheelNeutralColor: string;
  encounters: RaidEncounter[];
}

export interface RaidEncounter {
  name: string;
  imagePath: string | null;

  order: number;
}

export const raids: Raid[] = [
  {
    name: 'Last Wish',
    imagePath: null,
    wheelColor: '#c38f80',
    wheelNeutralColor: '#31223a',
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
    wheelColor: '#3a7039',
    wheelNeutralColor: '#759366',
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
    wheelColor: '#7295ca',
    wheelNeutralColor: '#2549a3',
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
    wheelColor: '#ab892e',
    wheelNeutralColor: '#6d5411',
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
  {
    name: 'Vow of the Disciple',
    imagePath: null,
    wheelColor: '#92c24e',
    wheelNeutralColor: '#5a7718',
    encounters: [
      { name: 'Opening', imagePath: null, order: 1 },
      { name: 'Acquisition', imagePath: null, order: 2 },
      { name: 'Caretaker', imagePath: null, order: 3 },
      { name: 'Exhibition', imagePath: null, order: 4 },
      { name: 'Rhulk', imagePath: null, order: 5 },
    ],
  },
  {
    name: 'Root of Nightmares',
    imagePath: null,
    wheelColor: '#bba0b8',
    wheelNeutralColor: '#64435a',
    encounters: [
      { name: 'Cataclysm', imagePath: null, order: 1 },
      { name: 'Scission', imagePath: null, order: 2 },
      { name: 'Explicator', imagePath: null, order: 3 },
      { name: 'Nezarec', imagePath: null, order: 4 },
    ],
  },
  {
    name: "Crota's End",
    imagePath: null,
    wheelColor: '#41614d',
    wheelNeutralColor: '#16241f',
    encounters: [
      { name: 'Abyss', imagePath: null, order: 1 },
      { name: 'Bridge', imagePath: null, order: 2 },
      { name: 'Ir Yût', imagePath: null, order: 3 },
      { name: 'Crota', imagePath: null, order: 4 },
    ],
  },
];
