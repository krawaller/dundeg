import { BattleState, HeroId, MonsterId, FlowInstruction } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface ActionSelectionSpec {
  heroId: HeroId
  action: FlowInstruction
}

export function apply_action_selection(battle: BattleState, {heroId, action}:ActionSelectionSpec): BattleState {
  let ret: BattleState = deepCopy(battle);
  ret.heroes[heroId].vars.action = action;
  ret.heroes[heroId].vars.hasActed = true; // TODO - maybe not here?
  return ret;
}
