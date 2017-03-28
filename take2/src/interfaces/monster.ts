export interface MonsterStats {
  ATK: number
  HP: number
  ARM: number
}

export interface MonsterDefinition {
  name: string
  stats: MonsterStats
  traits: {
    [idx:string]: true
  }
  targets: string
  value: number,
  skills?: {
    [idx:string]: true
  }
}

export interface MonsterVars {
  HP?: number,
  drained?: number 
}

export interface MonsterState {
  blueprint?: MonsterBase
  vars?: MonsterVars
  states?: {
    [idx: string]: true
  }
}

export type MonsterBase = '_fierceTestMonster' | 'backAlleyBruiser' | 'ghoulTroll' | 'manAtArms' | 'ratThing' | 'swampTroll' | 'slitherFish';

