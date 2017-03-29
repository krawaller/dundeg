import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy } from '../utils/helpers';

interface ApplyStanceChoiceToHeroInstr {
  heroId: HeroId
  stance: HeroStance
}

export function apply_stance_choice_to_hero(battle: BattleState, {heroId, stance}:ApplyStanceChoiceToHeroInstr): BattleState {
  let ret = deepCopy(battle);
  ret.heroes[heroId].vars.stance = stance;
  ret.log.push([{heroRef: heroId}, 'adopts the ' + stance + ' stance']);
  return ret;
}
