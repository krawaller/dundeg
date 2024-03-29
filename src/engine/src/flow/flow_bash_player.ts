/*
Part of flow_player_round.
Loops through all monsters, make those that target this player perform their attack.
*/

import { BattleState, HeroId, FlowInstruction } from '../interfaces'

import { find_monsters } from '../find/find_monsters'

export interface BashPlayerSpec {
  heroId: HeroId
}

export function flow_bash_player(
  battle: BattleState,
  { heroId }: BashPlayerSpec
): FlowInstruction {
  if (battle.heroes[heroId].vars.escaped) {
    return undefined
  }
  const attackers = find_monsters(battle, { targetting: heroId })
  if (attackers.length) {
    return [
      'flow',
      'all',
      attackers.map(
        (monsterId) =>
          <FlowInstruction>['flow', 'initiateMonsterAttack', { monsterId }]
      ),
    ]
  }
  return undefined
}
