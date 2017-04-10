import { Inventory, ItemName } from './item_interfaces';

import { MonsterId } from './monster_interfaces';

export interface HeroStats {
  AGI: number,
  CON: number,
  MAG: number,
  MRL: number,
  PER: number,
  STR: number
}

export type HeroStatName = keyof HeroStats;

export interface HeroDefinition {
  name: string,
  skills: HeroSkillName[],
  items: ItemName[],
  stats: HeroStats
}

export type HeroStance = 'assault' | 'defence';

export interface HeroVars {
  stance?: HeroStance
  ATK?: number
  powerDie?: number
  attackDice?: number[]
  defenceDice?: number[]
  failedDefence?: true
  failedEscape?: true
  usePowForDefence?: true
  knockedOutBy?: MonsterId
  escaped?: true
  HP?: number
  gold?: number
  bloodCurseLink?: MonsterId
  target?: MonsterId
  luck?: number
}

export interface HeroState {
  blueprint?: HeroBase
  vars?: HeroVars
  states?: HeroStates
  items?: Inventory
  skills?: HeroSkills
}

export type HeroBase = 'angelOfDeath' | 'bloodsportBrawler' | 'carnivalDrifter' | 'hinterLander' | 'infamousButcher' | 'soldierOfFortune';

export type HeroSkillName = keyof HeroSkills;

export interface HeroSkills {
  backStab?: true
  bloodCurse?: true
  bloodLust?: true
  exterminator?: true
  fieldCraft?: true
  findWeakness?: true
  foeKiller?: true
  gourmet?: true
  martialDiscipline?: true
  performance?: true
  rage?: true
  sixthSense?: true
  sneakAttack?: true
}

export interface HeroStates {
  blessed?: true
  exalted?: true
  poisoned?: true
  infected?: true
  stunned?: true
  focused?: true
}

export type HeroId = string;
