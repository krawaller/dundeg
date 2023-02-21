import { BattleState, HeroId, ItemName } from '../interfaces'
import { deepCopy, addLog, removeAnItem } from '../utils/helpers'

export interface RemoveItemSpec {
  heroId: HeroId
  item: ItemName
}

export function apply_remove_item(
  battle: BattleState,
  { heroId, item }: RemoveItemSpec
): BattleState {
  const ret: BattleState = deepCopy(battle)
  removeAnItem(ret.heroes[heroId], item)
  return ret
}
