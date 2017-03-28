import { HeroStatName, HeroState } from './hero';
import { MonsterState } from './monster';

export interface CalculationResult {
  value: any,
  history: any[]
}

export interface AttackOptions {
  [idx: string]: Attack
}

export interface Attack {
  type: 'meelee' | 'ranged',
  using: string,
  stat: HeroStatName
}

export interface BattleState {
  heroes?: {
    [idx: string]: HeroState
  }
  monsters?: {
    [idx: string]: MonsterState
  }
}

export type ItemName = 'skinningKnife' | 'spikedGauntlet';
