import { BattleState, CalculationResult } from '../interfaces';

interface InstrJustHeroId { heroId: string }

export function calculate_hero_armour (battle: BattleState, instr: InstrJustHeroId): CalculationResult {
  let val = {
    history: [['Heroes have no natural armour', 0]],
    value: 0
  };
  return val;
}
