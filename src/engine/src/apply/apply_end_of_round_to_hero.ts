import { BattleState } from '../interfaces'
import { deepCopy, addLog } from '../utils/helpers'

export interface EndOfRoundHeroSpec {
  heroId: string
}

export function apply_end_of_round_to_hero(
  battle: BattleState,
  { heroId }: EndOfRoundHeroSpec
): BattleState {
  const ret: BattleState = deepCopy(battle)
  const hero = ret.heroes[heroId]
  delete hero.vars.hasActed
  delete hero.vars.action
  delete hero.vars.failedDefence
  delete hero.vars.usedPowerDice
  delete hero.vars.unarmed
  if (hero.states.stunned) {
    delete hero.states.stunned
    addLog(ret, [{ heroRef: heroId }, 'is no longer stunned'])
  }
  return ret
}
