import { BattleState, CalculationResult } from '../interfaces';

interface CalculateHeroAttackInstr { heroId: string }

export function calculate_hero_attack (battle: BattleState, instr: CalculateHeroAttackInstr): CalculationResult {
  let hero = battle.heroes[instr.heroId];
  let highest = Math.max.apply(Math,hero.vars.attackDice);
  let val = {
    history: [['highest die', highest]],
    value: highest
  };
  if (hero.vars.stance === 'assault' && hero.vars.powerDie > highest){
    val.history.push(['Assaulting heroes use power die when higher', hero.vars.powerDie]);
    val.value = hero.vars.powerDie;
  }
  return val;
}
