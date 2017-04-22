import { HeroId } from './hero_interfaces';
import { RegionName } from './mixed_interfaces';

export type MonsterId = string;

export interface MonsterStats {
  ATK: number
  HP: number
  ARM: number
}

export interface MonsterDefinition {
  name: string
  stats: MonsterStats
  traits: MonsterTraits
  targets: string
  value: number,
  skills?: MonsterSkills
}

export interface MonsterVars {
  HP?: number
  drained?: number
  killedBy?: string
  escaped?: true
  target?: string
  hasAttacked?: true
}

export interface MonsterState {
  name?: string
  blueprint?: MonsterBase
  vars?: MonsterVars
  states?: MonsterStates
}

export type MonsterStateName = keyof MonsterStates;

export interface MonsterStates {
  corroded?: true
  weakness?: HeroId
  dazed?: true
  bloodCurse?: HeroId
  hungOver?: true
  ragingMad?: true
}

export type MonsterBase = '_fierceTestMonster' | 'backAlleyBruiser' | 'chickenWitch' | 'drunkenYokel' | 'footPad' | 'ghoulTroll' | 'harpy' | 'imperialHuntsman' | 'manAtArms' | 'megaRat' | 'nachtDrekSlicer' | 'nugBear' | 'ratThing' | 'slimeCorpse' | 'shambler' | 'swampTroll' | 'slitherFish';

export interface MonsterEntrySkills {
  ambush?: MonsterId[]
  dimwit?: MonsterId[]
  fear?: MonsterId[]
  rally?: MonsterId[]
}

export interface MonsterSkills {
  ambush?: true
  dimwit?: true
  drain?: true
  evade?: true
  fear?: true
  fierce?: true
  fury?: true
  horde?: MonsterTraitName
  infect?: true
  pain?: true
  pierce?: number
  pursue?: true
  rally?: true
  regenerate?: true
  skirmish?: true
  slime?: true
  summon?: RegionName
  thief?: true
}

export type MonsterTraitName =  keyof MonsterTraits;

export interface MonsterTraits {
  bandit?: true
  construct?: true
  cult?: true
  daemon?: true
  filth?: true
  fishoid?: true
  fungus?: true
  goblin?: true
  human?: true
  hunter?: true
  law?: true
  militant?: true
  ooze?: true
  puritan?: true
  reptilian?: true
  undead?: true
  vermin?: true
  weird?: true
  witch?: true
}
