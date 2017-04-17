/*
Start a new round
*/

import { BattleState, FlowInstruction } from '../interfaces';

export function flow_new_round(battle: BattleState,spec:any): FlowInstruction {
  return <FlowInstruction>['apply','question',{
    line: ['A new round begins'], // TODO - round number?
    options: {
      continue: undefined // TODO - finish! :D
    }
  }];
}

