import { BattleState, FlowInstruction, HeroId, FlowDiceRoll, ApplyDaemonsBlood } from '../interfaces';

export interface ThrowDaemonsBloodSpec {
  heroId: HeroId
}

export function flow_daemons_blood(battle: BattleState, {heroId}:ThrowDaemonsBloodSpec): FlowInstruction {
  return ['flow','all',[
    <FlowInstruction>['flow','heroTargetChoice',{heroId}],
    <FlowDiceRoll>['flow','diceRoll',{heroId, diceTypes: {singleAttack:true} }],
    <ApplyDaemonsBlood>['apply','daemonsBlood',{heroId}]
  ]];
}
