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
  HP?: number,
  drained?: number 
}

export interface MonsterState {
  blueprint?: MonsterBase
  vars?: MonsterVars
  states?: MonsterStates
}

export interface MonsterStates {
  corroded?: true
  weakness?: true
}

export type MonsterBase = '_fierceTestMonster' | 'backAlleyBruiser' | 'ghoulTroll' | 'manAtArms' | 'ratThing' | 'swampTroll' | 'slitherFish';

export interface MonsterSkills {
  drain?: true,
  fierce?: true,
  horde?: true,
  thief?: true,
  fear?: true
}

export type MonsterTraitName = 'bandit' | 'construct' | 'cult' | 'daemon' | 'filth' | 'fishoid' | 'goblin' | 'human' | 'hunter' | 'law' | 'militant' | 'ooze' | 'puritan' | 'reptilian' | 'undead' | 'vermin' | 'weird' | 'witch'

export interface MonsterTraits {
  bandit?: true
  construct?: true
  cult?: true
  daemon?: true
  filth?: true
  fishoid?: true
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
