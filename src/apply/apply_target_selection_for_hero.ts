import { BattleState, HeroId, MonsterId } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface HeroTargetSelectionSpec {
  heroId: HeroId
  monsterId: MonsterId
}

export function apply_target_selection_for_hero(battle: BattleState, {heroId, monsterId}:HeroTargetSelectionSpec): BattleState {
  let ret = deepCopy(battle);
  ret.heroes[heroId].vars.target = monsterId;
  addLog(ret, [{heroRef: heroId}, 'targets', {monsterRef: monsterId}], 'action');
  return ret;
}
