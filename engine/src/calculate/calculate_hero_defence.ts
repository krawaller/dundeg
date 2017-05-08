import { BattleState, CalculationResult, HeroId, MonsterId } from '../interfaces';

import { newCalc, addCalcStep } from '../utils/helpers';

interface CalculateHeroDefenceInstr {
  heroId: HeroId,
  monsterId: MonsterId
}

export function calculate_hero_defence (battle: BattleState, instr: CalculateHeroDefenceInstr): CalculationResult {
  let hero = battle.heroes[instr.heroId];

  let ret = newCalc('Hero DEF', 'Heroes have no natural defence', 0);

  if (!hero.vars.failedDefence){
    let highest = Math.max.apply(Math,hero.vars.defenceDice||[0]);
    let highestPow = Math.max.apply(Math,hero.vars.powerDice||[0]);
    let highestPowHalved = Math.ceil(highestPow / 2);
    ret = addCalcStep(ret, 'Successful defenders use highest defence die', n=>highest);
    if (hero.vars.stance === 'guard' && highestPow > highest && !hero.vars.unarmed){
      ret = addCalcStep(ret, 'Successful defenders in defence stance use POW die when higher', n=> highestPow);
    }
    if (hero.vars.stance === 'guard' && highestPowHalved > highest && hero.vars.unarmed){
      ret = addCalcStep(ret, 'Successful defenders in defence stance fighting unarmed use half of highest POW die when higher than def', n=> highestPowHalved);
    }
  } else if (typeof hero.vars.usePowForDefence === 'number'){
    if (hero.vars.unarmed){
      ret = addCalcStep(ret, 'Failed defence but chose one-time use of a POW die (halved because fighting unarmed', n=> Math.ceil(hero.vars.powerDice[hero.vars.usePowForDefence]/2));
    } else {
      ret = addCalcStep(ret, 'Failed defence but chose one-time use of a POW die', n=> hero.vars.powerDice[hero.vars.usePowForDefence]);
    }
  }
  return ret;
}
