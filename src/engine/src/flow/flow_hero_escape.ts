import {
  BattleState,
  HeroId,
  FlowTarget,
  FlowInstruction,
  LogMessage,
  Question,
  ApplyQuestion,
  Test,
} from '../interfaces'
import { monsters } from '../library'
import { find_monsters } from '../find/find_monsters'
import { calculate_hero_stat } from '../calculate/calculate_hero_stat'

export interface HeroEscapeSpec {
  heroId: HeroId
  how?: 'cloakAGI' | 'cloakMAG'
}

export function flow_hero_escape(
  battle: BattleState,
  { heroId, how }: HeroEscapeSpec
): FlowInstruction {
  // TODO - active monsters!
  const hero = battle.heroes[heroId]
  if (hero.vars.knockedOutBy) {
    // TODO - should not be here?
    return
  }
  const dice = hero.vars.defenceDice
  const targetters = find_monsters(battle, { targetting: heroId, active: true })
  if (!targetters.length) {
    return [
      'flow',
      'all',
      [
        <FlowInstruction>[
          'apply',
          'log',
          {
            type: 'success',
            line: [
              { heroRef: heroId },
              'wasn\t targetted by active (non-dazed, ATT>0) monster so escape is automatically successful!',
            ],
          },
        ],
        <FlowInstruction>['apply', 'escapeOutcome', { heroId }],
      ],
    ]
  }
  return <FlowInstruction>[
    'flow',
    'test',
    <Test>{
      line: [
        { heroRef: heroId },
        'must make a test against AGI',
        calculate_hero_stat(battle, { heroId, stat: 'AGI', reason: 'escape' }),
        'to escape',
      ],
      reason: 'escape',
      stat: how === 'cloakMAG' ? 'MAG' : 'AGI',
      dice: 'attack',
      heroId: heroId,
      success: ['apply', 'escapeOutcome', { heroId }],
      failure: [
        'apply',
        'log',
        {
          type: 'success',
          line: [{ heroRef: heroId }, 'fails to escape the battle.'],
        },
      ],
    },
  ]
}
