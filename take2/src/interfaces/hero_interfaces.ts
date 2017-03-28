import { Inventory } from './item_interfaces';

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
  skills: string[],
  items: string[],
  stats: HeroStats
}

export interface HeroVars {
  stance?: 'assault' | 'defence',
  ATK?: number,
  POW?: number,
  attackDice?: number[],
  defenceDice?: number[],
  failedDefence?: true,
  usePowForDefence?: true,
  HP?: number,
  gold?: number
}

export interface HeroState {
  blueprint?: HeroBase
  vars?: HeroVars
  states?: HeroStates
  items?: Inventory
  skills?: HeroSkills
}

export type HeroBase = 'bloodsportBrawler' | 'hinterLander';

export interface HeroSkills {
  exterminator?: true,
  rage?: true
}

export interface HeroStates {
  blessed?: true
  exalted?: true
  poisoned?: true
}