import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';
import { apply_dice_removal } from './apply_dice_removal';

export interface EscapeOutcomeSpec {
  heroId: HeroId
}

export function apply_escape_outcome_to_hero(battle: BattleState, {heroId}:EscapeOutcomeSpec): BattleState {
  let ret = deepCopy(battle);
  ret = apply_dice_removal(ret, {heroId: heroId, diceType: {attack:true, power: true, defence: true}});
  let hero = ret.heroes[heroId];
  if (hero.vars.testOutcome){
    addLog(ret, [{heroRef: heroId}, 'successfully escapes the battle!'], 'action');
    hero.vars.escaped = true;
  } else {
    addLog(ret, [{heroRef: heroId}, 'fails to escape, and is now defenceless.'], 'action');
    hero.vars.failedEscape = true;
  }
  return ret;
}
