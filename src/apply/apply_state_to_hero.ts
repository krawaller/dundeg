import { BattleState, HeroId, HeroStateName } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface StateToHeroSpec {
  heroId: HeroId
  state: HeroStateName
  value: any
  showLog?: true
}

export function apply_state_to_hero(battle: BattleState, {heroId, state, value, showLog}:StateToHeroSpec): BattleState {
  let ret: BattleState = deepCopy(battle);
  ret.heroes[heroId].states[state] = value || true;
  if (showLog){
    addLog(ret, [{heroRef: heroId}, 'becomes', state]);
  }
  return ret;
}
