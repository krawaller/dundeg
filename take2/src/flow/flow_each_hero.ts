import { BattleState, FlowInstruction, HeroId } from '../interfaces';
import { find_heroes } from '../find/find_heroes';

export type EachHeroSpec = (heroId: HeroId) => FlowInstruction;

export function flow_each_hero(battle: BattleState, func: EachHeroSpec): FlowInstruction {
  return ['flow','all',find_heroes(battle, {}).map(func)];
}
