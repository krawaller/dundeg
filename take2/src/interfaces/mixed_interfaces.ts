import { HeroStatName, HeroState, HeroId } from './hero_interfaces';
import { MonsterState } from './monster_interfaces';
import { ItemName } from './item_interfaces';

export interface CalculationResult {
  value: any,
  history: any[]
}

export interface AttackOptions {
  [idx: string]: Attack
}

export interface Attack {
  type: 'meelee' | 'ranged',
  using: ItemName,
  stat: HeroStatName
}

import { Question } from './flow_interfaces';

export interface BattleState {
  heroes?: {
    [idx: string]: HeroState
  }
  monsters?: {
    [idx: string]: MonsterState
  }
  log?: LogMessage[],
  question?: Question
}

export type LogMessageLine = LogMessagePart[]
export type LogMessageType = 'info' | 'action' | 'monsterAction' | 'verbose' | 'fail'
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

export type StatCheckReason = '_testReason' | 'ambush' | 'monsterTargetAcquisition' | 'bloodCurse' | 'weakness' | 'escape' ;

export type RegionName = 'red' | 'yellow' | 'blue' | 'green';

export type DiceType = 'attack' | 'defence' | 'power';

