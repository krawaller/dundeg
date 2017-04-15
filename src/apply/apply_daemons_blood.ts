import { BattleState, HeroId, HeroStance, CalculationResult } from '../interfaces';
import { deepCopy, addLog, removeAnItem } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';
import { monsters } from '../library';
import { apply_wounds_to_monster } from './apply_wounds_to_monster';

export interface DaemonsBloodSpec {
  heroId: HeroId
}

// works with single attack dice

export function apply_daemons_blood(battle: BattleState, {heroId}:DaemonsBloodSpec): BattleState {
  let ret = deepCopy(battle);
  let monsterId = ret.heroes[heroId].vars.target;
  let monster = ret.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];
  let dice = battle.heroes[heroId].vars.attackDice[0];
  monster.states.corroded = true;
  addLog(ret, [ {heroRef: heroId}, 'threw Daemon\'s Blood and corroded the armour of',{monsterRef: monsterId} ]);
  let wounds: CalculationResult;
  if (blueprint.traits.weird || blueprint.traits.fungus){
    wounds = {
      value: dice,
      history: [ ['Daemons Blood causes D6 roll VS fungus and weird', dice] ]
    }
  } else {
    dice = Math.ceil(dice/2);
    wounds = {
      value: dice,
      history: [ ['Daemons Blood causes D3 roll damage', dice] ]
    }
  }
  removeAnItem(ret.heroes[heroId], 'daemonsBlood');
  return apply_wounds_to_monster(ret, {monsterId, heroId, wounds});
}
