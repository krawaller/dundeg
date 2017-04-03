import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';
import { apply_dice_removal } from './apply_dice_removal';

export interface EscapeOutcomeSpec {
  heroId: HeroId
  success: boolean
}

export function apply_escape_outcome_to_hero(battle: BattleState, {heroId, success}:EscapeOutcomeSpec): BattleState {
  let ret = deepCopy(battle);
  if (success){
    addLog(battle, [{heroRef: heroId}, 'successfully escapes the battle!'], 'action');
    ret.heroes[heroId].vars.escaped = true;
  } else {
    addLog(battle, [{heroRef: heroId}, 'fails to escape, and is now defenceless.'], 'action');
    ret.heroes[heroId].vars.failedEscape = true;
    apply_dice_removal(battle, {heroId: heroId, diceType: {attack:true, power: true, defence: true}});
  }
  return ret;
}
