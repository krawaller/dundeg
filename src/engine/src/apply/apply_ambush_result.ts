import { BattleState, HeroId, MonsterId } from '../interfaces'
import { deepCopy, addLog } from '../utils/helpers'
import { calculate_hero_stat } from '../calculate/calculate_hero_stat'

export interface AmbushResultSpec {
  heroId: HeroId
  monsterId: MonsterId
}

export function apply_ambush_result(
  battle: BattleState,
  { heroId, monsterId }: AmbushResultSpec
): BattleState {
  const ret = deepCopy(battle)
  const hero = ret.heroes[heroId]
  if (hero.vars.testOutcome) {
    addLog(ret, [
      { heroRef: heroId },
      'successfully avoids being ambushed by',
      { monsterRef: monsterId },
    ])
  } else {
    addLog(ret, [
      { heroRef: heroId },
      'is stunned by the ambush by',
      { monsterRef: monsterId },
    ])
    hero.states.stunned = true
  }
  return ret
}

// TODO - use apply state and apply log instead?
