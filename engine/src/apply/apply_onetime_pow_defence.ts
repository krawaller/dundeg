import { BattleState, HeroId } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface OneTimePowDefenceSpec {
  heroId: HeroId
  when: 'before' | 'after'
  index?: number
}

export function apply_onetime_pow_defence(battle: BattleState, {when, heroId, index}: OneTimePowDefenceSpec): BattleState {
  let ret:BattleState = deepCopy(battle);
  let hero = ret.heroes[heroId];
  if (when === 'before'){
    if (!hero.vars.usedPowerDice){ // TODO - elsewhere
      hero.vars.usedPowerDice = hero.vars.powerDice.map(d=>false);
    }
    hero.vars.usedPowerDice[index] = true;
    hero.vars.usePowForDefence = index;
  } else {
    delete hero.vars.usePowForDefence;
  }
  return ret;
}

