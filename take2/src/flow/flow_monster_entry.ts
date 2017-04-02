import { BattleState, MonsterId, FlowInstruction } from '../interfaces';

export interface MonsterEntrySpec {
  monsterId: MonsterId
}

export function flow_monster_entry(battle: BattleState, {monsterId}:MonsterEntrySpec): FlowInstruction {
  
  return undefined;
}
