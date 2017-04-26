import { BattleState, FlowInstruction } from '../interfaces';

export function flow_begin_battle(battle: BattleState, spec:any): FlowInstruction {
  return ['flow','all',[
    ['flow','eachMonster', monsterId => ['flow','monsterEntry',{monsterId}]],
    ['flow','newRound',{}]
  ]];
}
