import { BattleState, MonsterId, HeroId } from '../interfaces';

import { isMonsterAlive } from '../utils/helpers';

export interface FindMonsterSpec {
  targetting?: HeroId
};

export function find_monsters(battle: BattleState, {targetting}: FindMonsterSpec): MonsterId[] {
  return Object.keys(battle.monsters).filter(monsterId => (
    isMonsterAlive(battle.monsters[monsterId])
    && (!targetting || battle.monsters[monsterId].vars.target === targetting)
  ));
};
