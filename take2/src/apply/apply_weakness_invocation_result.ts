import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';

interface ApplyWeaknessInvocationResultInstr {
  heroId: HeroId
}

export function apply_weakness_invocation_result(battle: BattleState, {heroId}:ApplyWeaknessInvocationResultInstr): BattleState {
  let ret = deepCopy(battle);
  let calc = calculate_hero_stat(ret, {heroId, stat: 'PER', reason: 'weakness'});
  let hero = ret.heroes[heroId];
  let monsterId = hero.vars.target;
  if (hero.vars.attackDice[0] + hero.vars.attackDice[1] <= calc.value){
    ret.monsters[monsterId].states.weakness = heroId;
    ret.log.push([ 'With a PER of', calc, {heroRef:heroId}, 'successfully finds a weakness on', {monsterRef: monsterId} ]);
  } else {
    ret.log.push([ 'A PER of', calc, 'means', {heroRef:heroId}, 'failed to find a weakness on', {monsterRef: monsterId} ]);
  }
  return ret;
}
