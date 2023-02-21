import {
  BattleState,
  PartyStatCheck,
  HeroStatName,
  StatCheckReason,
  MonsterId,
  HeroGroup,
} from '../interfaces'

import { find_heroes } from './find_heroes'
import { calculate_hero_stat } from '../calculate/calculate_hero_stat'

interface FindPartyStatInstr {
  stat: HeroStatName
  reason: StatCheckReason
  group?: HeroGroup
  monsterId?: MonsterId // because when monster is looking for target, we might want to know who is asking
}

export function find_party_stat(
  battle: BattleState,
  { stat, reason, group }: FindPartyStatInstr
): PartyStatCheck {
  const all = find_heroes(battle, { reason, group }).reduce(
    (mem, heroId) => {
      const calc = calculate_hero_stat(battle, { heroId, reason, stat })
      mem.indiv[heroId] = calc
      if (!mem.byVal[calc.value]) {
        mem.byVal[calc.value] = []
        mem.foundVals.push(calc.value)
      }
      mem.byVal[calc.value] = mem.byVal[calc.value] || []
      mem.byVal[calc.value].push(heroId)
      return mem
    },
    { indiv: {}, byVal: {}, foundVals: [] }
  )
  return {
    individual: all.indiv,
    stat,
    reason,
    ordered: all.foundVals
      .sort()
      .reverse()
      .map((val) => ({
        value: val,
        heroes: all.byVal[val],
      })),
  }
}
