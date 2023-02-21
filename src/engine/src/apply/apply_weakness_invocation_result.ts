import { BattleState, HeroId, HeroStance } from '../interfaces'
import { deepCopy, addLog } from '../utils/helpers'
import { calculate_hero_stat } from '../calculate/calculate_hero_stat'

export interface WeaknessInvocationResultSpec {
  heroId: HeroId
}

export function apply_weakness_invocation_result(
  battle: BattleState,
  { heroId }: WeaknessInvocationResultSpec
): BattleState {
  const ret = deepCopy(battle)
  const calc = calculate_hero_stat(ret, {
    heroId,
    stat: 'PER',
    reason: 'weakness',
  })
  const hero = ret.heroes[heroId]
  const monsterId = hero.vars.target
  if (hero.vars.testOutcome) {
    ret.monsters[monsterId].states.weakness = heroId
    addLog(
      ret,
      [
        { heroRef: heroId },
        'successfully finds a weakness on',
        { monsterRef: monsterId },
      ],
      'success'
    )
  } else {
    addLog(
      ret,
      [
        { heroRef: heroId },
        'failed to find a weakness on',
        { monsterRef: monsterId },
      ],
      'fail'
    )
  }
  return ret
}
