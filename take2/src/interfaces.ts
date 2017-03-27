
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
}

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


export interface BattleState {
  heroes?: {
    [idx: string]: HeroState
  }
  monsters?: {
    [idx: string]: MonsterState
  }
}

export interface HeroVars {
  stance?: 'assault' | 'defence'
}

export interface HeroState {
  blueprint: HeroBase
  vars: HeroVars
  states: {
    [idx: string]: true
  }
  items: {
    [idx: string]: true
  }
}

export interface MonsterState {
  blueprint: MonsterBase
  vars: {
    [idx: string]: number | string
  }
  states: {
    [idx: string]: true
  }
}

export type ItemName = 'skinningKnife' | 'spikedGauntlet';

export type HeroBase = 'bloodsportBrawler' | 'hinterLander';

export type MonsterBase = 'manAtArms' | 'swampTroll' | 'slitherFish' | 'backAlleyBruiser';

export interface AttackOptions {
  [idx: string]: Attack
}

export interface Attack {
  type: 'meelee' | 'ranged',
  using: string,
  stat: HeroStatName
}

