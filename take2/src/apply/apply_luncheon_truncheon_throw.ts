import { BattleState, HeroId, HeroStance } from '../interfaces';
import { deepCopy, removeAnItem, addLog } from '../utils/helpers';
import { find_standing_monsters } from '../find/find_standing_monsters';
import { monsters } from '../library';

interface ApplyLuncheonTruncheonThrowInstr {
  heroId: HeroId
}

export function apply_luncheon_truncheon_throw(battle: BattleState, {heroId}:ApplyLuncheonTruncheonThrowInstr): BattleState {
  let ret = deepCopy(battle);
  let hero = ret.heroes[heroId];
  addLog(ret, [{heroRef: heroId}, 'throws the Luncheon Truncheon amidst the enemies!'] );
  removeAnItem(hero, 'luncheonTruncheon');
  find_standing_monsters(ret).forEach(monsterId => {
    let monster = ret.monsters[monsterId];
    let blueprint = monsters[monster.blueprint];
    if ((!monster.states.dazed && blueprint.value === 1) && (blueprint.traits.goblin || blueprint.traits.filth)){
      monster.states.dazed = true;
      addLog(ret, [ {monsterRef: monsterId}, 'is dazed by the Luncheon Truncheon from', {heroRef: heroId} ] );
    }
  });
  return ret;
}
