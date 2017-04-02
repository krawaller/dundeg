import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface ReturnToBattleSpec {
  heroId: HeroId
}

export function apply_return_to_battle(battle: BattleState, {heroId}:ReturnToBattleSpec): BattleState {
  let ret = deepCopy(battle);
  delete ret.heroes[heroId].vars.escaped;
  addLog(ret, [{heroRef: heroId}, 'returns to the battle!']);
  return ret;
}
