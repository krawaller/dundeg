import { BattleState, Attack, ItemName, CalculationResult, HeroId, MonsterId } from '../interfaces';

import { monsters, items } from '../library';

interface CalculateMonsterArmourInstr { monsterId: MonsterId, heroId?: HeroId, attack?: Attack }

export function calculate_monster_armour (battle: BattleState, {monsterId, heroId, attack}: CalculateMonsterArmourInstr) :CalculationResult {
  let monster = battle.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];
  let hero = battle.heroes[heroId];
  let val = {
    history: [[blueprint.name, blueprint.stats.ARM]],
    value: blueprint.stats.ARM
  }

  if (monster.states.corroded){
    val.history.push(['corroded',0]);
    val.value = 0;
    return val; // nothing else matters, force to 0;
  }

  if (blueprint.traits.filth && attack && attack.using === 'skinningKnife'){
    val.history.push(['skinning knife ignores 1 ARM VS filth', '-1']);
    val.value = Math.max( 0, val.value - 1 );
  }

  if (attack && attack.using === 'shrapnelBomb' && hero.vars.attackDice[0] === 6){
    val.history.push(['Shrapnel bomb deals piercing dmg when die was 6', '0']);
    val.value = 0;
  }

  if (hero && hero.skills.backStab && hero.vars.stance === 'assault' && monster.vars.target !== heroId && attack && attack.using && items[attack.using].traits.blade){
    val.history.push(['backstab ignores 1 ARM when assaulting monster not targetting hero and using a bladed item', '-1']);
    val.value = Math.max( 0, val.value - 1 );
  }

  return val;
}
