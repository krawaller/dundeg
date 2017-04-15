import { BattleState, Question } from '../interfaces';
import { deepCopy } from '../utils/helpers';

export function apply_question(battle: BattleState, question:Question): BattleState {
  let ret = deepCopy(battle);
  ret.question = question;
  return ret;
}
