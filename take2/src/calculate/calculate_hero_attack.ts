import { BattleState, CalculationResult } from '../interfaces';

interface InstrJustHeroId { heroId: string }

export function calculate_hero_attack (battle: BattleState, instr: InstrJustHeroId): CalculationResult {
  let hero = battle.heroes[instr.heroId];
  let highest = Math.max.apply(Math,hero.vars.attackDice);
  let val = {
    history: [['highest die', highest]],
    value: highest
  };
  if (hero.vars.stance === 'assault' && hero.vars.POW > highest){
    val.history.push(['Assaulting heroes use power die when higher', hero.vars.POW]);
    val.value = hero.vars.POW;
  }
  return val;
}
