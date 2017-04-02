import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';

interface ApplyAmbushResultInstr {
  heroId: HeroId,
  monsterId
}

export function apply_ambush_result(battle: BattleState, {heroId,monsterId}:ApplyAmbushResultInstr): BattleState {
  let ret = deepCopy(battle);
  let calc = calculate_hero_stat(ret, {heroId, stat: 'PER', reason: 'ambush'});
  let hero = ret.heroes[heroId];
  if (hero.vars.attackDice[0] + hero.vars.attackDice[1] <= calc.value){
    addLog(ret,[ 'With a PER of', calc, {heroRef:heroId}, 'successfully avoids being ambushed by', {monsterRef: monsterId} ]);
  } else {
    addLog(ret,[ 'A PER of', calc, 'means', {heroRef:heroId}, 'is stunned by the ambush by', {monsterRef: monsterId} ]);
    ret.heroes[heroId].states.stunned = true;
  }
  return ret;
}
