import { BattleState, Attack, ItemName, CalculationResult, HeroId, MonsterId } from '../interfaces';
import { newCalc, addCalcStep } from '../utils/helpers';
import { monsters, items } from '../library';

interface CalculateMonsterArmourInstr { monsterId: MonsterId, heroId?: HeroId, attack?: Attack }

export function calculate_monster_armour (battle: BattleState, {monsterId, heroId, attack}: CalculateMonsterArmourInstr) :CalculationResult {
  let monster = battle.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];
  let hero = battle.heroes[heroId];
  let ret = newCalc('Monster ARM', blueprint.name+' base ARM', blueprint.stats.ARM);

  if (blueprint.traits.filth && attack && attack.using === 'skinningKnife'){
    ret = addCalcStep(ret, 'Skinning Knife ignores 1 ARM VS Filth', n=>n-1);
  }
  if (hero && hero.skills.backStab && hero.vars.stance === 'assault' && monster.vars.target !== heroId && attack && attack.using && items[attack.using].traits.blade){
    ret = addCalcStep(ret, 'Backstab ignores 1 ARM when assaulting back-turned monster with blade', n=>n-1);
  }
  if (attack && attack.using === 'shrapnelBomb' && hero.vars.attackDice[0] === 6){
    ret = addCalcStep(ret, 'Shrapnel Bomb pierces armour when die was 6', n=>0);
  }
  if (monster.states.corroded){
    ret = addCalcStep(ret, 'Corroded means no ARM', n=>0);
  }
  return ret;
}
