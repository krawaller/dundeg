import { BattleState, FlowInstruction, HeroId } from '../interfaces'
import { find_heroes } from '../find/find_heroes'

export type EachEscapedHeroSpec = (heroId: HeroId) => FlowInstruction

export function flow_each_escaped_hero(
  battle: BattleState,
  func: EachEscapedHeroSpec
): FlowInstruction {
  return ['flow', 'all', find_heroes(battle, { group: 'escaped' }).map(func)]
}
