import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface ApplyReturnToHeroSpec {
  heroId: HeroId
}

export function apply_return_to_hero(battle: BattleState, {heroId}:ApplyReturnToHeroSpec): BattleState {
  let ret = deepCopy(battle);
  delete ret.heroes[heroId].vars.escaped;
  addLog(ret, [{heroRef: heroId}, 'returns to the battle!']);
  return ret;
}
