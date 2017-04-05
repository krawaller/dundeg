import { BattleState, HeroId, MonsterId, Attack } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';
import { monsters } from '../library';

export interface AttackResultSpec {
  heroId: HeroId,
  monsterId: MonsterId,
  success?: true,
  attack: Attack
}

export function apply_attack_result(battle: BattleState, {heroId,monsterId,attack,success}:AttackResultSpec): BattleState {
  let ret = deepCopy(battle);
  let hero = ret.heroes[heroId];
  let monster = ret.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];
  if(!success){
    addLog(ret,[{heroRef:heroId},'tries to attack',{monsterRef:monsterId},'with',{itemRef:attack.using},'but misses'],'fail');
  } else if (blueprint.skills.evade && hero.vars.attackDice[0] === hero.vars.attackDice[1]) {
    addLog(ret,[{monsterRef:monsterId},'evades (rolled double) the',{itemRef:attack.using},'attack by',{heroRef:heroId}],'fail');
  }
  return ret;
}
