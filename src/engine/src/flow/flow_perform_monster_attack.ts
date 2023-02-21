/*
Performs a regular monster attack. They are always "successful" in terms of hitting.
*/

import {
  BattleState,
  MonsterId,
  FlowInstruction,
  EvilAttack,
  FlowWoundMonster,
} from '../interfaces'
import { calculate_wounds_vs_hero } from '../calculate/calculate_wounds_vs_hero'

export interface PerformMonsterAttackSpec {
  monsterId: MonsterId
  attack?: EvilAttack
}

export function flow_perform_monster_attack(
  battle: BattleState,
  { monsterId, attack }: PerformMonsterAttackSpec
): FlowInstruction {
  const monster = battle.monsters[monsterId]
  const heroId = monster.vars.target
  const hero = battle.heroes[heroId]
  const wounds = calculate_wounds_vs_hero(battle, { monsterId })
  return <FlowInstruction>[
    'flow',
    'all',
    [
      [
        'apply',
        'log',
        {
          line: [{ monsterRef: monsterId }, 'attacks', { heroRef: heroId }],
          type: 'monsterAction',
        },
      ],
      ['apply', 'woundHero', { heroId, wounds, monsterId }],
    ],
  ]
}
