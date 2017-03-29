import { BattleState, HeroId, MonsterId } from '../interfaces';
import { deepCopy } from '../utils/helpers';

interface ApplyTargetSelectionToMonsterInstr {
  heroId: HeroId,
  monsterId: MonsterId
}

export function apply_target_selection_to_monster(battle: BattleState, {monsterId, heroId}:ApplyTargetSelectionToMonsterInstr): BattleState {
  let ret = deepCopy(battle);
  ret.monsters[monsterId].vars.target = heroId;
  ret.log.push([{monsterRef: monsterId}, 'targets', {heroRef: heroId}]);
  return ret;
}
