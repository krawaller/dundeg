import { BattleState, Attack, ItemName, CalculationResult } from '../interfaces';

import { monsters } from '../library';

interface CalculateMonsterArmourInstr { monsterId: string, using?: ItemName }

export function calculate_monster_armour (battle: BattleState, instr: CalculateMonsterArmourInstr) :CalculationResult {
  let monster = battle.monsters[instr.monsterId];
  let blueprint = monsters[monster.blueprint];
  let val = {
    history: [[blueprint.name, blueprint.stats.ARM]],
    value: blueprint.stats.ARM
  }

  if (monster.states.corroded){
    val.history.push(['corroded',0]);
    val.value = 0;
    return val; // nothing else matters, force to 0;
  }

  if (blueprint.traits.filth && instr.using === 'skinningKnife'){
    val.history.push(['skinning knife ignores 1 ARM VS filth', '-1']);
    val.value = Math.max( 0, val.value - 1 );
  }

  return val;
}
