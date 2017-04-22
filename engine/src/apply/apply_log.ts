import { BattleState, LogMessage } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export function apply_log(battle: BattleState, logMessage: LogMessage): BattleState {
  let ret = deepCopy(battle);
  addLog(ret, logMessage.line, logMessage.type);
  return ret;
}
