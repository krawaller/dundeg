import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';

export interface WeaknessInvocationResultSpec {
  heroId: HeroId,
  success: boolean
}

export function apply_weakness_invocation_result(battle: BattleState, {heroId,success}:WeaknessInvocationResultSpec): BattleState {
  let ret = deepCopy(battle);
  let calc = calculate_hero_stat(ret, {heroId, stat: 'PER', reason: 'weakness'});
  let hero = ret.heroes[heroId];
  let monsterId = hero.vars.target;
  if (success){
    ret.monsters[monsterId].states.weakness = heroId;
    addLog(ret, [ {heroRef:heroId}, 'successfully finds a weakness on', {monsterRef: monsterId} ], 'success');
  } else {
    addLog(ret, [ {heroRef:heroId}, 'failed to find a weakness on', {monsterRef: monsterId}, 'fail' ]);
  }
  return ret;
}
