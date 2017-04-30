import { BattleState, HeroId, FlowTarget, FlowInstruction, ApplyQuestion, ApplyStanceChoice } from '../interfaces';
import { isHeroAlive } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';

export interface HeroOfferStanceChoiceSpec {
  heroId: HeroId
}

export function flow_hero_offer_stance_choice(battle: BattleState, {heroId}:HeroOfferStanceChoiceSpec): FlowInstruction {
  if (isHeroAlive(battle.heroes[heroId])){
    return <ApplyQuestion>['apply','question',{
      line: ['Select stance for', {heroRef:heroId}],
      options: {
        assault: <ApplyStanceChoice>['apply', 'stanceChoice' ,{heroId: heroId, stance: 'assault'}],
        guard: <ApplyStanceChoice>['apply', 'stanceChoice', {heroId: heroId, stance: 'guard'}]
      }
    }];
  }
}
