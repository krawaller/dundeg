import { BattleState, CalculationResult } from '../interfaces';

interface InstrJustHeroId { heroId: string }

export const calculate_hero_defence = (battle: BattleState, instr: InstrJustHeroId): CalculationResult => {
  let hero = battle.heroes[instr.heroId];
  let highest = Math.max.apply(Math,hero.vars.defenceDice);
  let val = {
    history: [['heroes have no natural defence',0]],
    value: 0
  };
  if (!hero.vars.failedDefence){
    val.history.push(['Use highest die for defence when defence roll was successful', highest]);
    val.value = highest;
    if (hero.vars.stance === 'defence' && hero.vars.POW > highest){
      val.history.push(['In defence stance when defence roll was successful we can use POW for defence when higher', hero.vars.POW]);
      val.value = hero.vars.POW;
    }
  } else if (hero.vars.usePowForDefence){
    val.history.push(['Can use POW for defence once when failed defence roll', hero.vars.POW]);
    val.value = hero.vars.POW;
  }
  return val;
};