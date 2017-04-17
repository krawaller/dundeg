/*
Ends the current battle round. Initiated from flow_next_player.
Responsible for triggering end-of-round cleanup, as well as triggerign new round or endgame.
*/

import { BattleState, MonsterId, FlowInstruction, FlowTarget, DiceSpec, ApplyQuestion } from '../interfaces';

export function flow_round_end(battle: BattleState,spec:any): FlowInstruction {
  return undefined;
}

// TODO - finish! :D