import { BattleState, HeroId } from '../interfaces'
import { deepCopy } from '../utils/helpers'

export interface DiceRemovalSpec {
  heroId: HeroId
  diceType: {
    attack?: true
    defence?: true
    power?: true
  }
}

export function apply_dice_removal(
  battle: BattleState,
  { heroId, diceType }: DiceRemovalSpec
): BattleState {
  const ret = deepCopy(battle)
  const hero = ret.heroes[heroId]
  if (diceType['attack']) {
    delete hero.vars.attackDice
  }
  if (diceType['defence']) {
    delete hero.vars.defenceDice
  }
  if (diceType['power']) {
    delete hero.vars.powerDie
  }
  return ret
}
