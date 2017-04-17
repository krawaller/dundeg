/*
Performs a full round for a single player. Initiated from flow_next_player
*/

import { BattleState, MonsterId, FlowInstruction, FlowTarget, DiceSpec, ApplyQuestion } from '../interfaces';

export interface PlayerRoundSpec {
  heroId
}

export function flow_player_round(battle: BattleState, {heroId}:PlayerRoundSpec): FlowInstruction {
  return undefined;
}

// TODO - finish! :D