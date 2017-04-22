import { BattleState, MonsterId, FlowInstruction } from '../interfaces';
import { die } from '../utils/rand';

export interface InitiateDimwitSpec {
  monsterId: MonsterId
}

export function flow_dimwit(battle: BattleState, {monsterId}:InitiateDimwitSpec): FlowInstruction {
  let dieRoll = die(battle.seed);
  return <FlowInstruction>['apply','dimwitResult',{
      monsterId: monsterId,
      result: ['hungOver','hungOver','sober','sober','ragingMad','ragingMad'][ dieRoll - 1]
    }];
}
