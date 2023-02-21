import { BattleState, HeroId, MonsterId } from '../interfaces'
import { deepCopy, addLog } from '../utils/helpers'

export interface DimwitResultSpec {
  monsterId: MonsterId
  result: 'hungOver' | 'ragingMad' | 'sober'
}

export function apply_dimwit_result(
  battle: BattleState,
  { monsterId, result }: DimwitResultSpec
): BattleState {
  const ret = deepCopy(battle)
  const monster = ret.monsters[monsterId]
  switch (result) {
    case 'hungOver':
      monster.states.hungOver = true
      addLog(
        ret,
        ['The Dimwit', { monsterRef: monsterId }, 'is hung over'],
        'monsterAction'
      )
      break
    case 'ragingMad':
      monster.states.ragingMad = true
      addLog(
        ret,
        ['The Dimwit', { monsterRef: monsterId }, 'is raging mad!'],
        'monsterAction'
      )
      break
    case 'sober':
      addLog(
        ret,
        ['The Dimwit', { monsterRef: monsterId }, 'is sober'],
        'monsterAction'
      )
      break
  }

  return ret
}
