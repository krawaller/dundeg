import { BattleState, HeroId, MonsterId, CalculationResult } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';
import { monsters } from '../library';

export interface TargetSelectionForMonsterSpec {
  heroId: HeroId,
  calculation: CalculationResult,
  monsterId: MonsterId
}

export function apply_target_selection_for_monster(battle: BattleState, {monsterId, heroId, calculation}:TargetSelectionForMonsterSpec): BattleState {
  let ret = deepCopy(battle);
  let monster = ret.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];
  monster.vars.target = heroId;
  addLog(ret, [{monsterRef: monsterId}, 'targets '+blueprint.targets+' and goes after', {heroRef: heroId}, 'who has', calculation], 'monsterAction');
  return ret;
}
