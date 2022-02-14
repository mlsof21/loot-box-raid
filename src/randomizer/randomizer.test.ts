import { stringify } from 'querystring';
import {
  RandomizedEncounter,
  randomizeEncounter,
  randomizeForUser,
  randomizeRaid,
  RandomizedUser,
  Modifier,
  RandomizedRaid,
} from './randomizer';

describe('randomizer tests', () => {
  it('randomizer assigns unique values to user', () => {
    const encounters = ['encounter1', 'encounter2', 'encounter3'];

    const availableModifiers = [];
    for (let i = 1; i <= 4; i++) {
      const modName = `mod${i}`;
      availableModifiers.push({ name: modName, description: modName, isTeamMod: false });
    }
    const user: RandomizedUser = {
      modifiersByName: ['mod2'],
      assignedModifiers: [availableModifiers[1]],
      byEncounter: encounters.reduce(
        (acc: Record<string, Modifier>, curr: string) => (
          (acc[curr] = { name: '', description: '', isTeamMod: false }), acc
        ),
        {},
      ),
      name: 'whatever',
    };
    user.byEncounter.encounter1 = availableModifiers[1];

    const newModifier = randomizeForUser(availableModifiers, user);

    expect(newModifier).not.toBeUndefined();
    expect(newModifier).not.toBe('mod2');
  });

  it('randomizer assigns mods for encounter', () => {
    const usersList = ['user1', 'user2', 'user3'];
    const encounterList = ['encounter1', 'encounter2', 'encounter3'];
    const users: RandomizedUser[] = [];
    const encounter: RandomizedEncounter = {
      hasTeamMod: false,
      teamMod: null,
      assignedModifiers: [],
      modifiersByName: [],
      byUser: usersList.reduce(
        (acc: Record<string, Modifier>, curr: string) => (
          (acc[curr] = { name: '', description: '', isTeamMod: false }), acc
        ),
        {},
      ),
      name: 'encounter1',
      order: 1,
    };
    usersList.forEach((user) => {
      users.push({
        assignedModifiers: [],
        modifiersByName: [],
        byEncounter: encounterList.reduce(
          (acc: Record<string, Modifier>, curr: string) => (
            (acc[curr] = { name: '', description: '', isTeamMod: false }), acc
          ),
          {},
        ),
        name: user,
      });
    });

    const availableModifiers = [];
    for (let i = 1; i <= 6; i++) {
      const modName = `mod${i}`;
      availableModifiers.push({ name: modName, description: modName, isTeamMod: false });
    }
    const encounterResult = randomizeEncounter(availableModifiers, users, encounter);
    // console.log({ encounterResult });

    const isArrayUnique = (arr: Array<any>): boolean => Array.isArray(arr) && new Set(arr).size === arr.length;

    expect(encounterResult).not.toBeUndefined();

    const assignedModifiers = encounterResult.assignedModifiers;

    expect(assignedModifiers.length).toBe(usersList.length);
    expect(isArrayUnique(encounterResult.assignedModifiers)).toBeTruthy();

    const userAssignment = encounterResult.byUser;

    for (const user in userAssignment) {
      expect(userAssignment[user]).not.toBe('');
    }
  });

  it('randomizer assigns mods for entire raid', () => {
    const availableModifiers: Modifier[] = [];
    for (let i = 1; i <= 20; i++) {
      const modName = `mod${i}`;
      availableModifiers.push({ name: modName, description: modName, isTeamMod: false });
    }
    const usersList: string[] = [];
    for (let i = 1; i <= 6; i++) {
      usersList.push(`user${i}`);
    }
    const encounterList: string[] = [];
    for (let i = 1; i <= 7; i++) {
      encounterList.push(`encounter${i}`);
    }

    const users: RandomizedUser[] = [];
    const encounters: RandomizedEncounter[] = [];
    encounterList.forEach((encounter, index) => {
      encounters.push({
        assignedModifiers: [],
        modifiersByName: [],
        byUser: usersList.reduce(
          (acc: Record<string, Modifier>, curr: string) => (
            (acc[curr] = { name: '', description: '', isTeamMod: false }), acc
          ),
          {},
        ),
        name: encounter,
        order: index,
        hasTeamMod: false,
        teamMod: null,
      });
    });
    usersList.forEach((user) => {
      users.push({
        assignedModifiers: [],
        modifiersByName: [],
        byEncounter: encounterList.reduce(
          (acc: Record<string, Modifier>, curr: string) => (
            (acc[curr] = { name: '', description: '', isTeamMod: false }), acc
          ),
          {},
        ),
        name: user,
      });
    });

    const raid: RandomizedRaid = {
      availableModifiers,
      encounters,
      users,
      name: 'raid',
      byEncounter: {},
      byUser: {},
    };

    const raidResult = randomizeRaid(raid);

    console.log(JSON.stringify(raidResult));

    const isArrayUnique = (arr: Array<any>): boolean => Array.isArray(arr) && new Set(arr).size === arr.length;

    expect(raidResult).not.toBeUndefined();

    const userModifiers = raidResult.byUser;
    const encounterModifiers = raidResult.byEncounter;

    for (const user in userModifiers) {
      expect(isArrayUnique(userModifiers[user])).toBeTruthy();
    }
    for (const encounter in encounterModifiers) {
      expect(isArrayUnique(encounterModifiers[encounter]));
    }
  });
});
