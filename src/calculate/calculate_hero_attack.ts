/*
This calculates a hero's battle ATK value, which will later have armour deducted etc.

Effects that deal additional damage cannot be calculated here, that must be done in wounds stuff.
*/

import { BattleState, CalculationResult, Attack } from '../interfaces';
import { monsters } from '../library';

interface CalculateHeroAttackInstr {
  heroId: string,
  attack: Attack
}

export function calculate_hero_attack (battle: BattleState, {heroId,attack}: CalculateHeroAttackInstr): CalculationResult {
  let hero = battle.heroes[heroId];
  let monster = battle.monsters[hero.vars.target];
  let monsterBlueprint = monsters[monster.blueprint];
  let highest = Math.max.apply(Math,hero.vars.attackDice);
  let val = {
    history: [['highest die', highest]],
    value: highest
  };
  if (hero.vars.stance === 'assault' && hero.vars.powerDie > highest){
    val.history.push(['Assaulting heroes use power die when higher', hero.vars.powerDie]);
    val.value = hero.vars.powerDie;
  }
  if (hero.vars.powerDie === 6 && attack && attack.using === 'nastyCleaver' && hero.vars.stance === 'assault'){
    val.history.push(['Nasty Cleaver deals 1 extra damage when assaulting', '+1']);
    val.value++;
  }
  if (hero.skills.backStab && monster.vars.target !== heroId && hero.vars.stance === 'assault' && attack.type === 'meelee'){
    val.history.push(['Backstab deals 1 extra DMG for meelee attacks in assault stance vs monsters targetting someone else', '+1']);
    val.value++;
  }
  return val;
}

