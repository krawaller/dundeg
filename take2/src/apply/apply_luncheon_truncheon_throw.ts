import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy, removeAnItem, addLog } from '../utils/helpers';
import { find_monsters } from '../find/find_monsters';
import { monsters } from '../library';

export interface LuncheonTruncheonThrowSpec {
  heroId: HeroId
}

export function apply_luncheon_truncheon_throw(battle: BattleState, {heroId}:LuncheonTruncheonThrowSpec): BattleState {
  let ret = deepCopy(battle);
  let hero = ret.heroes[heroId];
  addLog(ret, [{heroRef: heroId}, 'throws the Luncheon Truncheon amidst the enemies!'] );
  removeAnItem(hero, 'luncheonTruncheon');
  find_monsters(ret,{}).forEach(monsterId => {
    let monster = ret.monsters[monsterId];
    let blueprint = monsters[monster.blueprint];
    if ((!monster.states.dazed && blueprint.value === 1) && (blueprint.traits.goblin || blueprint.traits.filth)){
      monster.states.dazed = true;
      addLog(ret, [ {monsterRef: monsterId}, 'is dazed by the Luncheon Truncheon from', {heroRef: heroId} ] );
    }
  });
  return ret;
}
