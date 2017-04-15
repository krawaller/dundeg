import { BattleState, MonsterId } from '../interfaces';

import { isMonsterAlive } from '../utils/helpers';

export interface FindMonsterSpec {

};

export function find_monsters(battle: BattleState, spec: FindMonsterSpec): MonsterId[] {
  return Object.keys(battle.monsters).filter(monsterId => isMonsterAlive(battle.monsters[monsterId]));
};
