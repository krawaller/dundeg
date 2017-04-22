import { HeroStatName, HeroState, HeroId, HeroSkillName } from './hero_interfaces';
import { MonsterState } from './monster_interfaces';
import { ItemName } from './item_interfaces';

export interface CalculationResult {
  title: string
  value: any,
  history: any[]
}

export interface AttackOptions {
  [idx: string]: Attack
}

// DMG versus monstesr
export type AttackType = 'meelee' | 'ranged' | 'special'
export interface Attack {
  type: AttackType
  using?: ItemName,
  skill?: HeroSkillName, 
  stat?: HeroStatName
}

// DMG versus heroes
export type EvilAttackType = 'regular'
export interface EvilAttack {
  type: EvilAttackType
}


import { Question, FlowInstruction } from './flow_interfaces';

export interface BattleState {
  heroes?: {
    [idx: string]: HeroState
  }
  monsters?: {
    [idx: string]: MonsterState
  }
  log?: LogMessage[]
  question?: Question
  seed?: string
  stack?: FlowInstruction[]
}

export type LogMessageLine = LogMessagePart[]
export type LogMessageType = 'info' | 'action' | 'monsterAction' | 'verbose' | 'fail' | 'success'
export type LogMessagePart = string | LogMessageMonsterRef | LogMessageHeroRef | CalculationResult | LogMessageItemRef
export interface LogMessage {
  type: LogMessageType
  line: LogMessageLine
}
export interface LogMessageMonsterRef {
  monsterRef: string
}
export interface LogMessageHeroRef {
  heroRef: string
}
export interface LogMessageItemRef {
  itemRef: string
}

export interface PartyStatCheck {
  stat: HeroStatName
  individual: {
    [idx: string]: CalculationResult
  },
  ordered: PartyStatCheckOrderedPart[]
  reason: StatCheckReason
}

export interface PartyStatCheckOrderedPart {
  value: number
  heroes: HeroId[]
}

export type StatCheckReason = '_testReason' | 'ambush' | 'monsterTargetAcquisition' | 'bloodCurse' | 'weakness' | 'escape' | 'landAttack' | 'playerOrder' ;

export type RegionName = 'red' | 'yellow' | 'blue' | 'green';

export type DiceType = 'attack' | 'defence' | 'power';

export interface DiceSpec {
  attack?: true
  defence?: true
  power?: true
  singleAttack?: true
}


export type HeroGroup = 'standing' | 'notActed'