import { BattleState, Attack, ItemName, CalculationResult, HeroId, MonsterId } from '../interfaces';

import { monsters } from '../library';

interface CalculateMonsterArmourInstr { monsterId: MonsterId, using?: ItemName, heroId?: HeroId }

export function calculate_monster_armour (battle: BattleState, {monsterId, using, heroId}: CalculateMonsterArmourInstr) :CalculationResult {
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

  if (blueprint.traits.filth && using === 'skinningKnife'){
    val.history.push(['skinning knife ignores 1 ARM VS filth', '-1']);
    val.value = Math.max( 0, val.value - 1 );
  }

  if (using === 'shrapnelBomb' && hero.vars.attackDice[0] === 6){
    val.history.push(['Shrapnel bomb deals piercing dmg when die was 6', '0']);
    val.value = 0;
  }

  return val;
}
