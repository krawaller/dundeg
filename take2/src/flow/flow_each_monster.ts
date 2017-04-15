import { BattleState, FlowInstruction, MonsterId } from '../interfaces';
import { find_monsters } from '../find/find_monsters';

export type EachMonsterSpec = (monsterId: MonsterId) => FlowInstruction;

export function flow_each_monster(battle: BattleState, func: EachMonsterSpec): FlowInstruction {
  return ['flow','all',find_monsters(battle, {}).map(func)];
}
