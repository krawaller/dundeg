import { BattleState, HeroId, StatCheckReason } from '../interfaces';

import { isHeroAlive } from '../utils/helpers';

interface FindHeroesInstr {
  reason?: StatCheckReason
}

export function find_standing_heroes(battle: BattleState, {reason}:FindHeroesInstr = {}): HeroId[] {
  return Object.keys(battle.heroes).filter(heroId => isHeroAlive(battle.heroes[heroId]));
};
