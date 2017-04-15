import { BattleState, HeroId, FlowInstruction, FlowTest } from '../interfaces';

export interface InitiateBloodCurseSpec {
  heroId: HeroId
}

export function flow_bloodcurse(battle: BattleState, {heroId}:InitiateBloodCurseSpec): FlowInstruction {
  return ['flow','all',[
    <FlowInstruction>['flow','heroTargetChoice',{heroId}],
    <FlowTest>['flow','test',{
      heroId: heroId,
      line: [{heroRef: heroId},'tries to cast a Blood Curse!'],
      dice: 'attack',
      stat: 'MAG',
      success: ['apply','bloodCurseResult',{heroId}],
      failure: ['apply','bloodCurseResult',{heroId}]
    }],
  ]];
}
