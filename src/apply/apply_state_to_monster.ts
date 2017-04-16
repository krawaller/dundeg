import { BattleState, MonsterId, MonsterStateName } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface StateToMonsterSpec {
  monsterId: MonsterId
  state: MonsterStateName
  value: any
}

export function apply_state_to_monster(battle: BattleState, {monsterId, state, value}:StateToMonsterSpec): BattleState {
  let ret: BattleState = deepCopy(battle);
  ret.monsters[monsterId].states[state] = value || true;
  return ret;
}
