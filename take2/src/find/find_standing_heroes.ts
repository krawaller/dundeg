import { BattleState, HeroId } from '../interfaces';

import { isHeroAlive } from '../utils/helpers';

export function find_standing_heroes(battle: BattleState): HeroId[] {
  return Object.keys(battle.heroes).filter(heroId => isHeroAlive(battle.heroes[heroId]));
};
