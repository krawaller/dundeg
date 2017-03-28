import { BattleState } from '../interfaces';
import { deepCopy } from '../utils/helpers';

interface EndOfRoundInstr {
  heroId: string
}

export function apply_end_of_round_to_hero (battle: BattleState, {heroId}: EndOfRoundInstr):BattleState {
  let ret = deepCopy(battle);
  let hero = ret.heroes.hero;
  if (hero.states.stunned){
    delete hero.states.stunned;
    ret.log.push( [{heroRef: heroId},'is no longer stunned'] );
  }
  return ret;
}
