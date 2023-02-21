import {
  BattleState,
  HeroId,
  MonsterId,
  CalculationResult,
} from '../interfaces'
import { deepCopy, addLog } from '../utils/helpers'
import { monsters } from '../library'

export interface TargetSelectionForMonsterSpec {
  heroId: HeroId
  calculation: CalculationResult
  monsterId: MonsterId
  forced?: boolean
}

export function apply_target_selection_for_monster(
  battle: BattleState,
  { monsterId, heroId, calculation, forced }: TargetSelectionForMonsterSpec
): BattleState {
  const ret = deepCopy(battle)
  const monster = ret.monsters[monsterId]
  const blueprint = monsters[monster.blueprint]
  monster.vars.target = heroId
  if (forced) {
    addLog(
      ret,
      [
        'The heroes manipulate',
        { monsterRef: monsterId },
        'to go after',
        { heroRef: heroId },
      ],
      'monsterAction'
    )
  } else {
    addLog(
      ret,
      [
        { monsterRef: monsterId },
        'targets ' + blueprint.targets + ' and goes after',
        { heroRef: heroId },
        'who has',
        calculation,
      ],
      'monsterAction'
    )
  }
  return ret
}
