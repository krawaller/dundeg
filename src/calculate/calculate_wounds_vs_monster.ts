/*
Takes a DMG calculation and deducts armour.
*/

import { BattleState, Attack, ItemName, CalculationResult, HeroId, MonsterId } from '../interfaces';
import { monsters, items } from '../library';
import { calculate_monster_armour } from './calculate_monster_armour';

interface CalculateWoundsVsMonsterSpec {
  monsterId: MonsterId,
  heroId: HeroId,
  attack: Attack,
  damage: CalculationResult
}

export function calculate_wounds_vs_monster (battle: BattleState, {monsterId, heroId, attack, damage}: CalculateWoundsVsMonsterSpec):CalculationResult {
  let val:CalculationResult = {
    history: ['attack damage', damage],
    value: damage.value
  };

  let armour = calculate_monster_armour(battle, {monsterId, heroId, attack});

  val.history.push( [ 'deduct monster armour', armour ] );
  val.value = Math.max(  damage.value - armour.value );

  return val;
}
