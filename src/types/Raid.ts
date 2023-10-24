export type Raid = {
  name: string;
  imagePath: string | null;
  wheelColor: string;
  wheelNeutralColor: string;
  encounters: RaidEncounter[];
};

export type RaidEncounter = {
  name: string;
  imagePath: string | null;
  order: number;
};

export type Raider = {
  name: string;
  modifiers: Modifier[];
};

export type Modifier = {
  name: string;
  description: string;
  isTeamMod: boolean;
};
