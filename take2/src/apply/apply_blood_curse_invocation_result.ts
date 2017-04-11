import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';

export interface BloodCurseSpec {
  heroId: HeroId,
  success: boolean
}

export function apply_blood_curse_invocation_result(battle: BattleState, {heroId,success}:BloodCurseSpec): BattleState {
  let ret = deepCopy(battle);
  let hero = ret.heroes[heroId];
  let monsterId = hero.vars.target;
  if (success){
    hero.vars.bloodCurseLink = monsterId;
    ret.monsters[monsterId].states.bloodCurse = heroId;
    addLog(ret, [ {heroRef:heroId}, 'successfully casts a blood curse on', {monsterRef: monsterId}, 'success']);
  } else {
    addLog(ret, [ {heroRef:heroId}, 'failed to cast a blood curse on', {monsterRef: monsterId} ], 'fail');
  }
  return ret;
}
// TODO - change to test!