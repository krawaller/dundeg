import { BattleState, MonsterId, FlowInstruction } from '../interfaces';

export interface InitiateAmbushSpec {
  monsterId: MonsterId
}

export function flow_ambush(battle: BattleState, {monsterId}:InitiateAmbushSpec): FlowInstruction {
  return ['flow','eachHero',heroId=>{
    return <FlowInstruction>['flow','test',{
      heroId: heroId,
      reason: 'ambush',
      stat: 'PER',
      dice: 'defence',
      line: [{heroRef:heroId},'must test against PER to avoid ambush by',{monsterRef:monsterId}],
      success: ['apply', 'ambushResult', {heroId: heroId, monsterId: monsterId}],
      failure: ['apply', 'ambushResult', {heroId: heroId, monsterId: monsterId}]
    }];
  }]
}
