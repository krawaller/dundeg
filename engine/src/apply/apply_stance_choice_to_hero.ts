import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface ApplyStanceChoiceToHeroSpec {
  heroId: HeroId
  stance: HeroStance
}

export function apply_stance_choice_to_hero(battle: BattleState, {heroId, stance}:ApplyStanceChoiceToHeroSpec): BattleState {
  let ret = deepCopy(battle);
  ret.heroes[heroId].vars.stance = stance;
  addLog(ret, [{heroRef: heroId}, 'adopts the ' + stance + ' stance']);
  return ret;
}
