import { BattleState, CalculationResult, EvilAttack } from '../interfaces';

import { calculate_hero_armour } from './calculate_hero_armour';
import { calculate_monster_attack } from './calculate_monster_attack';
import { calculate_hero_defence } from './calculate_hero_defence';

interface CalculateWoundsVsHeroSpec {
  monsterId: string
}

export function calculate_wounds_vs_hero (battle: BattleState, {monsterId}: CalculateWoundsVsHeroSpec): CalculationResult {
  let ATK = calculate_monster_attack(battle, {monsterId});
  let heroId = battle.monsters[monsterId].vars.target;
  let DEF = calculate_hero_defence(battle, {heroId,monsterId});
  let ARM = calculate_hero_armour(battle, {heroId,monsterId});
  let val = {
    history: [
      ['Base damage is monster ATK',ATK.value, ATK.history],
      ['Hero armour is subtracted','-'+ARM.value, ARM.history],
      ['As is hero defence','-'+DEF.value, DEF.history]
    ],
    value: Math.max(ATK.value - ARM.value - DEF.value, 0)
  };
  return val;
}

