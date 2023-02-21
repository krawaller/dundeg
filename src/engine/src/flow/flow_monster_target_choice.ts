import {
  BattleState,
  MonsterId,
  FlowInstruction,
  HeroStatName,
  LogMessageLine,
  ApplyQuestion,
  ApplyMonsterTargetChoice,
} from '../interfaces'
import { find_party_stat } from '../find/find_party_stat'
import { monsters, heroes } from '../library'
import { isHeroAlive } from '../utils/helpers'

export interface MonsterTargetChoiceSpec {
  monsterId: MonsterId
}

export function flow_monster_target_choice(
  battle: BattleState,
  { monsterId }: MonsterTargetChoiceSpec
): FlowInstruction {
  const monster = battle.monsters[monsterId]
  if (isHeroAlive(battle.heroes[monster.vars.target])) {
    return undefined
  }
  const blueprint = monsters[monster.blueprint]
  const stat = <HeroStatName>blueprint.targets.substr(0, 3)
  const high = blueprint.targets[3] === '+'
  const party = find_party_stat(battle, {
    stat,
    reason: 'monsterTargetAcquisition',
    monsterId,
  })
  const prospects = party.ordered[high ? 0 : party.ordered.length - 1]
  if (prospects.heroes.length === 1) {
    return <ApplyMonsterTargetChoice>[
      'apply',
      'monsterTargetChoice',
      {
        monsterId,
        heroId: prospects.heroes[0],
        calculation: party.individual[prospects.heroes[0]],
      },
    ]
  } else {
    let line = <LogMessageLine>[
      { monsterRef: monsterId },
      'goes after ' + blueprint.targets + '.',
    ]
    const opts = {}
    prospects.heroes.forEach((heroId) => {
      line = line.concat([
        { heroRef: heroId },
        'has',
        party.individual[heroId],
        '. ',
      ])
      opts[heroes[battle.heroes[heroId].blueprint].name] = <
        ApplyMonsterTargetChoice
      >[
        'apply',
        'monsterTargetChoice',
        {
          monsterId: monsterId,
          heroId: heroId,
          calculation: party.individual[heroId],
          forced: true,
        },
      ]
    })
    line = line.concat(['Who should', { monsterRef: monsterId }, 'target?'])
    return <ApplyQuestion>[
      'apply',
      'question',
      {
        line: line,
        options: opts,
      },
    ]
  }
}
