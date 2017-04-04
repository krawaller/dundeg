import { BattleState, HeroId, MonsterId } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';

export interface AmbushResultSpec {
  heroId: HeroId,
  monsterId: MonsterId,
  avoided?: true
}

export function apply_ambush_result(battle: BattleState, {heroId,monsterId,avoided}:AmbushResultSpec): BattleState {
  let ret = deepCopy(battle);
  if (avoided){
    addLog(ret,[{heroRef:heroId}, 'successfully avoids being ambushed by', {monsterRef: monsterId} ]);
  } else {
    addLog(ret,[{heroRef:heroId}, 'is stunned by the ambush by', {monsterRef: monsterId} ]);
    ret.heroes[heroId].states.stunned = true;
  }
  return ret;
}
