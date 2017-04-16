import { BattleState, CalculationResult, HeroId, MonsterId } from '../interfaces';

interface CalculateHeroDefenceInstr {
  heroId: HeroId,
  monsterId: MonsterId
}

export function calculate_hero_defence (battle: BattleState, instr: CalculateHeroDefenceInstr): CalculationResult {
  let hero = battle.heroes[instr.heroId];
  if (hero.vars.failedEscape){
    return {
      value: 0,
      history: ['A failed escape attempt means no defence',0]
    };
  }
  let val = {
    history: [['heroes have no natural defence',0]],
    value: 0
  };
  let highest = Math.max.apply(Math,hero.vars.defenceDice);
  if (!hero.vars.failedDefence){
    val.history.push(['Use highest die for defence when defence roll was successful', highest]);
    val.value = highest;
    if (hero.vars.stance === 'defence' && hero.vars.powerDie > highest){
      val.history.push(['In defence stance when defence roll was successful we can use POW for defence when higher', hero.vars.powerDie]);
      val.value = hero.vars.powerDie;
    }
  } else if (hero.vars.usePowForDefence){
    val.history.push(['Can use POW for defence once when failed defence roll', hero.vars.powerDie]);
    val.value = hero.vars.powerDie;
  }
  return val;
}
