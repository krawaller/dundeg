import { BattleState, CalculationResult, MonsterBase } from '../interfaces'
import { monsters } from '../library'
import { deepCopy } from '../utils/helpers'

export interface MonsterIntroductionSpec {
  monsterId: string
  monsterType: MonsterBase
}

export function apply_introduction_to_monster(
  battle: BattleState,
  { monsterId, monsterType }: MonsterIntroductionSpec
): BattleState {
  if (battle.monsters[monsterId]) {
    throw 'Already a monster existing with that Id'
  }
  const ret = deepCopy(battle)
  const blueprint = monsters[monsterType]
  const already = Object.keys(ret.monsters).filter(
    (mId) => ret.monsters[mId].blueprint === monsterType
  )
  ret.monsters[monsterId] = {
    blueprint: monsterType,
    name: blueprint.name + (already.length ? ' #' + (already.length + 1) : ''),
    vars: {
      HP: blueprint.stats.HP,
    },
  }
  return ret
}
