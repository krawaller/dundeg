import { BattleState, LogMessage } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

import { apply_log } from './apply_log';

export function apply_round_start(battle: BattleState, logMessage: LogMessage): BattleState {
  let ret: BattleState = deepCopy(battle);
  ret.round = (ret.round || 0) + 1;
  ret = apply_log(ret, {line:['Round '+ret.round+' begins!'],type: 'info'})
  return ret;
}
