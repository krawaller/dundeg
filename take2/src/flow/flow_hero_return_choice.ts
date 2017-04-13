import { BattleState, HeroId, FlowInstruction, FlowQuestion, ApplyReturnToBattle } from '../interfaces';

export interface HeroOfferReturnChoiceSpec {
  heroId: HeroId
}

export function flow_hero_offer_return_choice(battle: BattleState, {heroId}:HeroOfferReturnChoiceSpec): FlowInstruction {
  if (battle.heroes[heroId].vars.escaped){
    return <FlowQuestion>['flow','question',{
      line: ['Should', {heroRef: heroId}, 'return to battle?'],
      options: {
        yes: <ApplyReturnToBattle>['apply', 'returnToBattle', {heroId: heroId}],
        no: undefined
      }
    }];
  }
}
