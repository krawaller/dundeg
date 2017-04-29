/*
Start a new round
*/

import { BattleState, FlowInstruction } from '../interfaces';

export function flow_new_round(battle: BattleState, spec:any): FlowInstruction {
  return <FlowInstruction>['flow','all',[
    ['apply','roundStart',{}],
    ['flow','eachEscapedHero', (heroId)=><FlowInstruction>['flow','returnChoice',{heroId}] ],
    ['flow','eachMonster', (monsterId)=> <FlowInstruction>['flow','monsterTargetChoice',{monsterId}]],
    ['flow','nextPlayer',{}]
  ]];
}
