import { BattleState, HeroId } from '../interfaces';
import { deepCopy } from '../utils/helpers';
import { find_monsters } from '../find/find_monsters';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';
import { apply_log } from './apply_log';

export interface DefenceOutcomeSpec {
  heroId: HeroId
}

export function apply_defence_outcome(battle: BattleState, {heroId}:DefenceOutcomeSpec): BattleState {
  let chargingMonsters = find_monsters(battle,{targetting: heroId});
  if (chargingMonsters.length){
    let ret:BattleState = deepCopy(battle);
    let hero = ret.heroes[heroId];
    let agi = calculate_hero_stat(ret, {heroId, stat:'AGI', reason:'defence'});
    let rolled = hero.vars.defenceDice[0] + hero.vars.defenceDice[1];
    if (rolled > agi.value){
      hero.vars.failedDefence = true;
      ret = apply_log(ret, {type: 'fail', line: [{heroRef:heroId},'has AGI',agi,'but rolled '+rolled+' so failed defence']});
    } else {
      apply_log(ret, {type: 'fail', line: [{heroRef:heroId},'has AGI',agi,'and rolled '+rolled+' so will defend']});
    }
    return ret;
  }
  return battle;
}
