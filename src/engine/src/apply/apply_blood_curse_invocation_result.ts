import { BattleState, HeroId, HeroStance } from '../interfaces'
import { deepCopy, addLog } from '../utils/helpers'
import { calculate_hero_stat } from '../calculate/calculate_hero_stat'

export interface BloodCurseSpec {
  heroId: HeroId
}

export function apply_blood_curse_invocation_result(
  battle: BattleState,
  { heroId }: BloodCurseSpec
): BattleState {
  const ret = deepCopy(battle)
  const hero = ret.heroes[heroId]
  const monsterId = hero.vars.target
  if (hero.vars.testOutcome) {
    hero.vars.bloodCurseLink = monsterId
    ret.monsters[monsterId].states.bloodCurse = heroId
    addLog(ret, [
      { heroRef: heroId },
      'successfully casts a blood curse on',
      { monsterRef: monsterId },
      'success',
    ])
  } else {
    addLog(
      ret,
      [
        { heroRef: heroId },
        'failed to cast a blood curse on',
        { monsterRef: monsterId },
      ],
      'fail'
    )
  }
  return ret
}
