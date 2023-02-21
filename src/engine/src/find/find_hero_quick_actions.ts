import { BattleState } from '../interfaces'

import { items, heroSkills } from '../library'

interface InstrJustHeroId {
  heroId: string
}

export function find_hero_quick_actions(
  battle: BattleState,
  { heroId }: InstrJustHeroId
): any {
  const ret = <any>{}
  const hero = battle.heroes[heroId]
  if (hero.items.luncheonTruncheon) {
    ret[items.luncheonTruncheon.actions.throwLuncheonTruncheon] = [
      'apply',
      'luncheonTruncheonThrow',
      { heroId: heroId },
    ]
  }
  return ret
}
