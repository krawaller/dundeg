import { BattleState, CalculationResult } from '../interfaces';

interface CalculateHeroDamageInstr {
  monsterId: string,
  heroId?: string,
  monsterATK: CalculationResult,
  heroARM: CalculationResult,
  heroDEF: CalculationResult
}

export function calculate_damage_vs_hero (battle: BattleState, instr: CalculateHeroDamageInstr): CalculationResult {
  let val = {
    history: [
      ['Base damage is monster ATK',instr.monsterATK.value, instr.monsterATK.history],
      ['Hero armour is subtracted','-'+instr.heroARM.value, instr.heroARM.history],
      ['As is hero defence','-'+instr.heroDEF.value, instr.heroDEF.history]
    ],
    value: instr.monsterATK.value - instr.heroARM.value - instr.heroDEF.value
  };
  return val;
}

// TODO - stupefy this
