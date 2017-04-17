/*
Start a new round
*/

import { BattleState, FlowInstruction } from '../interfaces';

export function flow_lose_game(battle: BattleState,spec:any): FlowInstruction {
  return <FlowInstruction>['apply','question',{
    line: ['GAME OVER U LOSE'], 
    options: {
      finish: undefined // TODO - finish! :D
    }
  }];
}

