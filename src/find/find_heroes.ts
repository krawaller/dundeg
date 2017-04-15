import { BattleState, HeroId, StatCheckReason } from '../interfaces';

import { isHeroAlive } from '../utils/helpers';

interface FindHeroesSpec {
  reason?: StatCheckReason
}

export function find_heroes(battle: BattleState, {reason}:FindHeroesSpec = {}): HeroId[] {
  return Object.keys(battle.heroes).filter(heroId => isHeroAlive(battle.heroes[heroId]));
};
