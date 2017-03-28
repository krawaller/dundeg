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
  skills?: MonsterSkills
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

export interface MonsterSkills {
  drain?: true,
  fierce?: true,
  horde?: true,
  thief?: true
}
