import { BattleState, HeroId, FlowTarget, FlowInstruction } from '../interfaces';

export interface HeroOfferReturnChoiceSpec {
  heroId: HeroId
}

export function flow_hero_offer_return_choice(battle: BattleState, {heroId}:HeroOfferReturnChoiceSpec): FlowInstruction {
  if (battle.heroes[heroId].vars.escaped){
    return ['ask',{
      line: ['Should', {heroRef: heroId}, 'return to battle?'],
      options: {
        yes: ['apply', 'heroReturn', {heroId: heroId}],
        no: undefined
      }
    }]
  }
}
