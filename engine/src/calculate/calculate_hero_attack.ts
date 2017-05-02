/*
This calculates a hero's battle ATK value, which will later have armour deducted etc.

Effects that deal additional damage cannot be calculated here, that must be done in wounds stuff.
*/

import { BattleState, CalculationResult, Attack } from '../interfaces';
import { monsters } from '../library';
import { newCalc, addCalcStep } from '../utils/helpers';

interface CalculateHeroAttackInstr {
  heroId: string,
  attack: Attack
}

export function calculate_hero_attack (battle: BattleState, {heroId,attack}: CalculateHeroAttackInstr): CalculationResult {
  let hero = battle.heroes[heroId];
  let monster = battle.monsters[hero.vars.target];
  let monsterBlueprint = monsters[monster.blueprint];
  let highest = Math.max.apply(Math,hero.vars.attackDice);
  let lowest = Math.min.apply(Math,hero.vars.attackDice);
  let highestPow = Math.max.apply(Math,hero.vars.powerDice||[]);
  let halfPow = Math.ceil(highestPow / 2)

  let ret = attack.type === 'unarmed'
    ? newCalc('Hero ATK', 'Base ATK for unarmed strike is lowest attack die', lowest)
    : newCalc('Hero ATK', 'Base ATK is highest attack die', highest);

  if (hero.vars.stance === 'assault' && attack.type !== 'unarmed' && highestPow > highest){
    ret = addCalcStep(ret, 'Assaulting heroes use power die when higher', n=>highestPow);
  }

  if (hero.vars.stance === 'assault' && attack.type === 'unarmed' && halfPow > lowest){
    ret = addCalcStep(ret, 'Assaulting heroes use half power die when higher for unarmed strike', n=>halfPow);
  }

  if (highestPow === 6 && attack && attack.using === 'nastyCleaver' && hero.vars.stance === 'assault'){
    ret = addCalcStep(ret, 'Nasty Cleaver has +1 ATK when assaulting and a POW die is 6', n=>n+1);
  }
  if (hero.skills.backStab && monster.vars.target !== heroId && hero.vars.stance === 'assault' && attack.type === 'meelee'){
    ret = addCalcStep(ret, 'Backstab has +1 ATK for assault meelee attacks vs monsters targetting someone else', n=>n+1);
  }
  return ret;
}

