import { BattleState, MonsterId } from '../interfaces';

import { isMonsterAlive } from '../utils/helpers';

export function find_standing_monsters(battle: BattleState): MonsterId[] {
  return Object.keys(battle.monsters).filter(monsterId => isMonsterAlive(battle.monsters[monsterId]));
};
