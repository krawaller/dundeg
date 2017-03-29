import { BattleState, CalculationResult } from '../interfaces';

interface CalculateHeroArmourInstr { heroId: string }

export function calculate_hero_armour (battle: BattleState, instr: CalculateHeroArmourInstr): CalculationResult {
  let val = {
    history: [['Heroes have no natural armour', 0]],
    value: 0
  };
  return val;
}
