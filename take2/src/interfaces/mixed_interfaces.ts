import { HeroStatName, HeroState } from './hero_interfaces';
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

export interface BattleState {
  heroes?: {
    [idx: string]: HeroState
  }
  monsters?: {
    [idx: string]: MonsterState
  }
}
