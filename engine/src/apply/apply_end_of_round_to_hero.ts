import { BattleState } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface EndOfRoundHeroSpec {
  heroId: string
}

export function apply_end_of_round_to_hero (battle: BattleState, {heroId}: EndOfRoundHeroSpec):BattleState {
  let ret:BattleState = deepCopy(battle);
  let hero = ret.heroes[heroId];
  delete hero.vars.hasActed;
  delete hero.vars.action;
  if (hero.states.stunned){
    delete hero.states.stunned;
    addLog(ret, [{heroRef: heroId},'is no longer stunned'] );
  }
  return ret;
}
