import { BattleState, LogMessage } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export function apply_round_start(battle: BattleState, logMessage: LogMessage): BattleState {
  let ret: BattleState = deepCopy(battle);
  ret.round = (ret.round || 0) + 1;
  return ret;
}
