import { BattleState, CalculationResult, EvilAttack } from '../interfaces'
import { newCalc, addCalcStep } from '../utils/helpers'
import { calculate_hero_armour } from './calculate_hero_armour'
import { calculate_monster_attack } from './calculate_monster_attack'
import { calculate_hero_defence } from './calculate_hero_defence'

interface CalculateWoundsVsHeroSpec {
  monsterId: string
}

export function calculate_wounds_vs_hero(
  battle: BattleState,
  { monsterId }: CalculateWoundsVsHeroSpec
): CalculationResult {
  const ATK = calculate_monster_attack(battle, { monsterId })
  const heroId = battle.monsters[monsterId].vars.target
  const DEF = calculate_hero_defence(battle, { heroId, monsterId })
  const ARM = calculate_hero_armour(battle, { heroId, monsterId })

  let ret = newCalc(
    'Damage VS Hero',
    ['Attacking monster has ATK', ATK],
    ATK.value
  )
  ret = addCalcStep(ret, ['Subtract hero ARM ', ARM], (n) => n - ARM.value)
  ret = addCalcStep(ret, ['Subtract hero DEF', DEF], (n) => n - DEF.value)

  return ret
}
