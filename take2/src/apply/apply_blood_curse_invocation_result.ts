import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';

interface ApplyBloodCurseInvocationResultInstr {
  heroId: HeroId
}

export function apply_blood_curse_invocation_result(battle: BattleState, {heroId}:ApplyBloodCurseInvocationResultInstr): BattleState {
  let ret = deepCopy(battle);
  let calc = calculate_hero_stat(ret, {heroId, stat: 'MAG', reason: 'bloodCurse'});
  let hero = ret.heroes[heroId];
  let monsterId = hero.vars.target;
  if (hero.vars.attackDice[0] + hero.vars.attackDice[1] <= calc.value){
    hero.vars.bloodCurseLink = monsterId;
    ret.monsters[monsterId].states.bloodCurse = heroId;
    ret.log.push([ 'With a MAG of', calc, {heroRef:heroId}, 'successfully casts a blood curse on', {monsterRef: monsterId} ]);
  } else {
    ret.log.push([ 'A MAG of', calc,'means',{heroRef:heroId}, 'failed to cast a blood curse on', {monsterRef: monsterId} ]);
  }
  return ret;
}
