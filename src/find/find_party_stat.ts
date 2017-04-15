import { BattleState, PartyStatCheck, HeroStatName, StatCheckReason, MonsterId } from '../interfaces';

import { find_heroes } from './find_heroes';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';

interface FindPartyStatInstr { stat: HeroStatName, reason: StatCheckReason, monsterId?: MonsterId }

export function find_party_stat (battle: BattleState, {stat,reason}: FindPartyStatInstr): PartyStatCheck {
  let all = find_heroes(battle).reduce((mem,heroId)=> {
    let calc = calculate_hero_stat(battle, {heroId, reason, stat});
    mem.indiv[heroId] = calc;
    if (!mem.byVal[calc.value]){
      mem.byVal[calc.value] = [];
      mem.foundVals.push(calc.value);
    }
    mem.byVal[calc.value] = mem.byVal[calc.value] || [];
    mem.byVal[calc.value].push(heroId);
    return mem;
  }, {indiv:{},byVal:{},foundVals:[]});
  return {
    individual: all.indiv,
    stat, reason,
    ordered: all.foundVals.sort().reverse().map(val => ({
      value: val,
      heroes: all.byVal[val]
    }))
  };

}