import { BattleState, HeroId } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface RerollSpec {
  heroId: HeroId
  diceType: 'attack' | 'defence' | 'power'
  second?: true
}

export function apply_reroll (battle:BattleState, {heroId,diceType,second}: RerollSpec): BattleState {
  let ret = deepCopy(battle);
  let hero = ret.heroes[heroId];
  let oldval, newval
  hero.vars.luck--;
  if (diceType === 'power'){
    oldval = hero.vars.powerDie;
    newval = hero.vars.powerDie = Math.floor(Math.random()*6)+1;
    addLog(ret, [{heroRef: heroId}, 'rerolled power die that was '+oldval+', new val is '+newval], 'action');
  } else {
    let prop = diceType + 'Dice';
    let idx = second ? 1 : 0;
    oldval = hero.vars[prop][idx];
    newval = hero.vars[prop][idx] = Math.floor(Math.random()*6)+1;
    addLog(ret, [{heroRef: heroId}, `rerolled ${second ? 'second ' : ''}${diceType} die that was ${oldval}', new val is ${newval}`], 'action');
  }
  return ret;
}
