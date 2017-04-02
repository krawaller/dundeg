import { BattleState, MonsterId, FlowInstruction } from '../interfaces';

export interface OfferRerollSpec {
  heroId
}

export function flow_offer_reroll(battle: BattleState, {heroId}:OfferRerollSpec): FlowInstruction {
  
  return undefined;
}
