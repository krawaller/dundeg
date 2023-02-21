/*
Performs a full round for a single player. Initiated from flow_next_player
*/

import { BattleState, MonsterId, FlowInstruction } from '../interfaces'

export interface PlayerRoundSpec {
  heroId
}

export function flow_player_round(
  battle: BattleState,
  { heroId }: PlayerRoundSpec
): FlowInstruction {
  return [
    'flow',
    'all',
    [
      <FlowInstruction>['flow', 'stanceChoice', { heroId }],
      <FlowInstruction>['flow', 'selectAction', { heroId }],
      <FlowInstruction>['flow', 'battleDice', { heroId }],
      <FlowInstruction>['flow', 'bashPlayer', { heroId }],
      <FlowInstruction>['flow', 'executeAction', { heroId }],
      <FlowInstruction>['flow', 'nextPlayer', {}],
    ],
  ]
}
