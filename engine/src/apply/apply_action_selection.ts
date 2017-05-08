import { BattleState, HeroId, MonsterId, FlowInstruction } from '../interfaces';
import { PerformHeroAttackSpec } from '../flow/flow_perform_hero_attack';
import { deepCopy, addLog } from '../utils/helpers';

export interface ActionSelectionSpec {
  heroId: HeroId
  action: FlowInstruction
}

export function apply_action_selection(battle: BattleState, {heroId, action}:ActionSelectionSpec): BattleState {
  let ret: BattleState = deepCopy(battle);
  ret.heroes[heroId].vars.action = action;
  ret.heroes[heroId].vars.hasActed = true; // TODO - maybe not here?
  if (action[1] === 'performHeroAttack' && (<PerformHeroAttackSpec>action[2]).attack.type === 'unarmed'){
    ret.heroes[heroId].vars.unarmed = true;
    ret = addLog(ret, ['Because',{heroRef:heroId},'uses an unarmed attack, POW will count as halved this round'],'info');
  }
  return ret;
}
