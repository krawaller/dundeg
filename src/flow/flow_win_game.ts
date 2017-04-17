/*
Start a new round
*/

import { BattleState, FlowInstruction } from '../interfaces';

export function flow_win_game(battle: BattleState,spec:any): FlowInstruction {
  return <FlowInstruction>['apply','question',{
    line: ['GAME OVER U WIN'], 
    options: {
      finish: undefined // TODO - finish! :D
    }
  }];
}

