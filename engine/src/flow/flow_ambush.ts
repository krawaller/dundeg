import { BattleState, MonsterId, FlowInstruction } from '../interfaces';

export interface InitiateAmbushSpec {
  monsterId: MonsterId
}

export function flow_ambush(battle: BattleState, {monsterId}:InitiateAmbushSpec): FlowInstruction {
  return ['flow','all',[
    ['apply','log',{line:[{monsterRef:monsterId},'ambushes the heroes!'],type:'monsterAction'}],
    ['flow','eachHero',heroId=>{
      if (battle.heroes[heroId].skills.sixthSense){
        return <FlowInstruction>['apply','log',{line:[{heroRef:heroId},'has Sixth Sense and spots the ambush by',{monsterRef:monsterId}],type:'info'}];
      }
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
  ]];
}
