import { BattleState, HeroId, StatCheckReason, HeroGroup } from '../interfaces'

import { isHeroAlive } from '../utils/helpers'

interface FindHeroesSpec {
  reason?: StatCheckReason
  group?: HeroGroup
}

export function find_heroes(
  battle: BattleState,
  { reason, group }: FindHeroesSpec = {}
): HeroId[] {
  let ret = Object.keys(battle.heroes)
  if (group === 'escaped') {
    return ret.filter((heroId) => battle.heroes[heroId].vars.escaped)
  }
  ret = ret.filter((heroId) => isHeroAlive(battle.heroes[heroId]))
  if (group === 'notActed') {
    ret = ret.filter((heroId) => !battle.heroes[heroId].vars.hasActed)
  }
  return ret
}
