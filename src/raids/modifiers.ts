import { Modifier } from '../types/Raid';

export const defaultModifiers: Modifier[] = [
  { name: 'DIM loadout', description: 'Use a randomized loadout from DIM', isTeamMod: false },
  {
    name: 'All special weapons',
    description: 'You must use a special weapon in the kinetic and energy slots. You may not use power weapons.',
    isTeamMod: false,
  },
  { name: 'Triple Fusion', description: 'Use a fusion in every weapon slot', isTeamMod: false },
  { name: 'No Exotics', description: 'You cannot use an exotic weapon or armor', isTeamMod: false },
  { name: 'Abilities only', description: 'You may only use abilities', isTeamMod: false },
  { name: 'No HUD', description: 'You must disable your HUD', isTeamMod: false },
  { name: 'All Void', description: 'You must use all void weapons and a void subclass', isTeamMod: false },
  { name: 'All Solar', description: 'You must use all solar weapons and a solar subclass', isTeamMod: false },
  { name: 'All Arc', description: 'You must use all arc weapons and an arc subclass', isTeamMod: false },
  {
    name: 'D2 Classic',
    description:
      'You must use a primary ammo weapon in the kinetic and energy slots, and a special or power ammo weapon in the power slot',
    isTeamMod: false,
  },
  { name: 'Blue Weapons', description: 'You may only use rare (blue) weapons', isTeamMod: false },
  { name: 'Party Choice', description: '', isTeamMod: false },
  { name: 'Triple GLs', description: 'You must use a grenade launcher in every weapon slot', isTeamMod: false },
  {
    name: 'Dead Weight',
    description:
      'You may not kill enemies or participate in the encounter mechanics. You are allowed to use your revive token.',
    isTeamMod: false,
  },
  { name: 'All Bows', description: 'You must use a bow in every weapon slot', isTeamMod: false },
  { name: 'All Snipers', description: 'You must use a sniper in every weapon slot', isTeamMod: false },
  { name: 'No Mods', description: '', isTeamMod: false },
  { name: 'No speech in VC', description: 'You may not use voice to communicate', isTeamMod: false },
  { name: 'Triple Shotty', description: 'You must use a shotgun in every weapon slot', isTeamMod: false },
  { name: '30 FPS', description: 'You must adjust your video settings to be capped at 30 fps', isTeamMod: false },
  { name: 'Not Main Character', description: 'You must use a character that is not your main', isTeamMod: false },
  {
    name: 'Silent as the Grave',
    description: 'You must be muted and deafened in your VC. Text chat is allowed.',
    isTeamMod: false,
  },
  { name: 'Grounded', description: 'You must not jump (unbinding jump is recommended)', isTeamMod: false },
  { name: 'Ok Boomer', description: 'You must max your aim sensitivity.', isTeamMod: false },
  { name: 'Team Mod: Native Tongue', description: '', isTeamMod: true },
  { name: 'Team Mod: No repeat Exotics', description: '', isTeamMod: true },
  { name: 'Pepé Le Pew', description: 'You are only allowed to speak French.', isTeamMod: false },
  { name: 'Exotic Party Choice', description: '', isTeamMod: false },
  { name: 'Texas Drawl', description: '', isTeamMod: false },
  { name: 'Team Rat King', description: '', isTeamMod: true },
  { name: 'Mr. Freeze', description: 'You may only use stasis weapons and subclass.', isTeamMod: false },
  {
    name: 'The Parent Trap',
    description: 'You must swap your jump and shoot keybindings or controller mappings.',
    isTeamMod: false,
  },
  { name: 'The Styx', description: 'You must use a controller.', isTeamMod: false },
  { name: 'No Hablo Ingles', description: 'You may not speak English.', isTeamMod: false },
  {
    name: 'Pacifist',
    description: 'You may not harm enemies. You are allowed to participate in encounter mechanics.',
    isTeamMod: false,
  },
  { name: 'Broadway Musical', description: 'You must sing or only speak in song lyrics.', isTeamMod: false },
];