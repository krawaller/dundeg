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

export type HeroStatName = 'AGI' | 'CON' | 'MAG' | 'MRL' | 'PER' | 'STR';

export interface HeroDefinition {
  name: string,
  skills: HeroSkillName[],
  items: ItemName[],
  stats: HeroStats
}

export interface HeroVars {
  stance?: 'assault' | 'defence'
  ATK?: number
  POW?: number
  attackDice?: number[]
  defenceDice?: number[]
  failedDefence?: true
  usePowForDefence?: true
  knockedOutBy?: MonsterId
  escaped?: true
  HP?: number
  gold?: number
}

export interface HeroState {
  blueprint?: HeroBase
  vars?: HeroVars
  states?: HeroStates
  items?: Inventory
  skills?: HeroSkills
}

export type HeroBase = 'angelOfDeath' | 'bloodsportBrawler' | 'carnivalDrifter' | 'hinterLander' | 'infamousButcher' | 'soldierOfFortune';

export type HeroSkillName = 'exterminator' | 'fieldCraft' | 'foeKiller' |  'gourmet' | 'martialDiscipline' | 'performance' | 'rage' | 'sneakAttack';

export interface HeroSkills {
  exterminator?: true
  fieldCraft?: true
  foeKiller?: true
  gourmet?: true
  martialDiscipline?: true
  performance?: true
  rage?: true
  sneakAttack?: true
}

export interface HeroStates {
  blessed?: true
  exalted?: true
  poisoned?: true
  infected?: true
  stunned?: true
}

export type HeroId = string;
