import {
  BattleState,
  HeroId,
  FlowInstruction,
  HeroStatName,
  LogMessageLine,
  ApplyQuestion,
  ApplyHeroTargetChoice,
} from '../interfaces'
import { find_party_stat } from '../find/find_party_stat'
import { monsters, heroes } from '../library'
import { isHeroAlive } from '../utils/helpers'
import { find_monsters } from '../find/find_monsters'

export interface HeroTargetChoiceSpec {
  heroId: HeroId
  line: LogMessageLine
}

// TODO - no question if dont need target! also, hero's action could be taken into account? optional line in spec!

export function flow_hero_target_choice(
  battle: BattleState,
  { heroId, line }: HeroTargetChoiceSpec
): FlowInstruction {
  const { targettingMe, targettingOthers } = find_monsters(battle, {}).reduce(
    (mem, monsterId) => {
      mem[
        battle.monsters[monsterId].vars.target === heroId
          ? 'targettingMe'
          : 'targettingOthers'
      ].push(monsterId)
      return mem
    },
    { targettingMe: [], targettingOthers: [] }
  )
  const possibleIds = targettingMe.length ? targettingMe : targettingOthers
  const autoChoice = false
  if (autoChoice && possibleIds.length === 1) {
    // TODO - really? NO!
    return <ApplyHeroTargetChoice>[
      'apply',
      'heroTargetChoice',
      { heroId: heroId, monsterId: possibleIds[0] },
    ]
  } else {
    return <ApplyQuestion>[
      'apply',
      'question',
      {
        line: line || ['Which monster should', { heroRef: heroId }, 'target?'],
        options: possibleIds.reduce((mem, monsterId) => {
          mem[battle.monsters[monsterId].name] = <ApplyHeroTargetChoice>[
            'apply',
            'heroTargetChoice',
            { monsterId, heroId },
          ]
          return mem
        }, {}),
      },
    ]
  }
}
