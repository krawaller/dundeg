import { BattleState, HeroId, HeroStance, CalculationResult } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';
import { monsters } from '../library';
import { apply_damage_to_monster } from './apply_damage_to_monster';

interface ApplyDaemonsBloodInstr {
  heroId: HeroId,
  dice: number
}

export function apply_daemons_blood(battle: BattleState, {heroId,dice}:ApplyDaemonsBloodInstr): BattleState {
  let ret = deepCopy(battle);
  let monsterId = ret.heroes[heroId].vars.target;
  let monster = ret.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];
  monster.states.corroded = true;
  addLog(ret, [ {heroRef: heroId}, 'threw Daemon\'s Blood and corroded the armour of',{monsterRef: monsterId} ]);
  let monsterDMG: CalculationResult;
  if (blueprint.traits.weird || blueprint.traits.fungus){
    monsterDMG = {
      value: dice,
      history: [ ['Daemons Blood causes D6 roll VS fungus and weird', dice] ]
    }
  } else {
    dice = Math.ceil(dice/2);
    monsterDMG = {
      value: dice,
      history: [ ['Daemons Blood causes D3 roll damage', dice] ]
    }
  }
  return apply_damage_to_monster(ret, {monsterId, heroId, monsterDMG});
}
