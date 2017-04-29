import { BattleState, FlowInstruction } from '../interfaces';

export function flow_begin_battle(battle: BattleState, spec:any): FlowInstruction {
  return ['flow','all',[
    //['flow','eachMonster', monsterId => ['apply','introduceMonster',{monsterId}]],
    ['apply','log',{line:['The battle begins!'],type:'info'}],
    ['flow','eachMonster', monsterId => ['flow','monsterEntry',{monsterId}]],
    ['flow','newRound',{}]
  ]];
}
