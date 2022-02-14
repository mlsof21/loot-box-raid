export interface RandomizedUser {
  assignedModifiers: Modifier[];
  modifiersByName: string[];
  byEncounter: Record<string, Modifier>;
  name: string;
}

export interface RandomizedEncounter {
  assignedModifiers: Modifier[];
  modifiersByName: string[];
  byUser: Record<string, Modifier>;
  name: string;
  order: number;
  hasTeamMod: boolean;
  teamMod: string | null;
}

export interface RandomizedRaid {
  name: string;
  encounters: RandomizedEncounter[];
  users: RandomizedUser[];
  availableModifiers: Modifier[];
  byUser: Record<string, Modifier[]>;
  byEncounter: Record<string, Modifier[]>;
}

export interface Modifier {
  name: string;
  description: string;
  isTeamMod: boolean;
}

export function randomizeForUser(modifiers: Modifier[], user: RandomizedUser): Modifier {
  const filteredModifiers = modifiers.filter((mod) => !user.assignedModifiers.includes(mod));

  return filteredModifiers[Math.floor(Math.random() * filteredModifiers.length)];
}

export function randomizeEncounter(modifiers: Modifier[], users: RandomizedUser[], encounter: RandomizedEncounter) {
  if (modifiers.length < users.length) {
    throw new Error('The number of modifiers must be greater than or equal to the number of users');
  }

  const encounterModifiers = [...modifiers];
  for (const user of users) {
    const newMod = randomizeForUser(encounterModifiers, user);
    user.assignedModifiers.push(newMod);
    user.modifiersByName.push(newMod.name);
    user.byEncounter[encounter.name] = newMod;
    encounter.assignedModifiers.push(newMod);
    encounter.byUser[user.name] = newMod;
    encounter.modifiersByName.push(newMod.name);
    const modIndex = encounterModifiers.indexOf(newMod);
    if (modIndex > -1) {
      encounterModifiers.splice(modIndex, 1);
    }
  }

  return encounter;
}

export function randomizeRaid(raid: RandomizedRaid): RandomizedRaid {
  for (const encounter of raid.encounters.sort((a, b) => a.order - b.order)) {
    randomizeEncounter(raid.availableModifiers, raid.users, encounter);
    raid.byEncounter[encounter.name] = [...encounter.assignedModifiers];
  }
  for (const user of raid.users) {
    raid.byUser[user.name] = user.assignedModifiers;
  }
  return raid;
}
