/*
Performs a regular monster attack. They are always "successful" in terms of hitting.
*/

import { BattleState, MonsterId, FlowInstruction, EvilAttack, FlowWoundMonster } from '../interfaces';
import { calculate_wounds_vs_hero } from '../calculate/calculate_wounds_vs_hero';

export interface PerformMonsterAttackSpec {
  monsterId: MonsterId,
  attack: EvilAttack
}

export function flow_perform_monster_attack(battle: BattleState, {monsterId, attack}:PerformMonsterAttackSpec): FlowInstruction {
  let monster = battle.monsters[monsterId];
  let heroId = monster.vars.target;
  let hero = battle.heroes[heroId];
  let wounds = calculate_wounds_vs_hero(battle, {monsterId});
  return <FlowInstruction>['apply','woundHero',{heroId,wounds,monsterId}];
}
