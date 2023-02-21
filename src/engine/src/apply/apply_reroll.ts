import { BattleState, HeroId } from '../interfaces'
import { deepCopy, addLog } from '../utils/helpers'
import { die } from '../utils/rand'

export interface RerollSpec {
  heroId: HeroId
  diceType: 'attack' | 'defence' | 'power'
  index: number
}

export function apply_reroll(
  battle: BattleState,
  { heroId, diceType, index }: RerollSpec
): BattleState {
  const ret: BattleState = deepCopy(battle)
  const hero = ret.heroes[heroId]
  let oldval, newval
  hero.vars.luck--
  const prop = diceType + 'Dice'
  oldval = hero.vars[prop][index]
  newval = hero.vars[prop][index] = die(battle.seed)
  addLog(
    ret,
    [
      { heroRef: heroId },
      `rerolled ${diceType} die that was ${oldval}', new val is ${newval}`,
    ],
    'action'
  )
  return ret
}
