import { BattleState, HeroId, FlowInstruction, FlowTest } from '../interfaces';

export interface InitiateWeakness {
  heroId: HeroId
}

export function flow_weakness(battle: BattleState, {heroId}:InitiateWeakness): FlowInstruction {
  return ['flow','all',[
    <FlowInstruction>['flow','heroTargetChoice',{heroId}],
    <FlowTest>['flow','test',{
      heroId: heroId,
      line: [{heroRef: heroId},'tries to find a Weakness!'],
      dice: 'attack',
      stat: 'PER',
      success: ['apply','weaknessInvocationResult',{heroId}],
      failure: ['apply','weaknessInvocationResult',{heroId}]
    }],
  ]];
}
