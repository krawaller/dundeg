import { BattleState, MonsterId, HeroId } from '../interfaces'
import { monsters } from '../library'
import { isMonsterAlive } from '../utils/helpers'
import { calculate_monster_attack } from '../calculate/calculate_monster_attack'

export interface FindMonsterSpec {
  targetting?: HeroId
  active?: true
  pursuer?: true
  weakenedBy?: HeroId
}

export function find_monsters(
  battle: BattleState,
  { targetting, active, pursuer, weakenedBy }: FindMonsterSpec
): MonsterId[] {
  return Object.keys(battle.monsters).filter((monsterId) => {
    const mon = battle.monsters[monsterId]
    const blueprint = monsters[mon.blueprint]
    return (
      isMonsterAlive(mon) &&
      (!targetting || mon.vars.target === targetting) &&
      (!active ||
        (!mon.states.dazed &&
          calculate_monster_attack(battle, { monsterId }).value > 0)) &&
      (!pursuer ||
        (blueprint.skills.pursue && !mon.states.dazed && !mon.states.hexed)) &&
      (!weakenedBy || mon.states.weakness === weakenedBy)
    )
  })
}
