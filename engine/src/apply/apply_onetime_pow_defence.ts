import { BattleState, HeroId } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface OneTimePowDefenceSpec {
  heroId: HeroId
  when: 'before' | 'after'
}

export function apply_onetime_pow_defence(battle: BattleState, {when, heroId}: OneTimePowDefenceSpec): BattleState {
  let ret:BattleState = deepCopy(battle);
  if (when === 'before'){
    ret.heroes[heroId].vars.usePowForDefence = true;
  } else {
    delete ret.heroes[heroId].vars.usePowForDefence;
    ret.heroes[heroId].vars.hasUsedPowForDefence = true;
  }
  return ret;
}

