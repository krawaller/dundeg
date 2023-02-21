import { BattleState, MonsterId, FlowInstruction } from '../interfaces'
import { calculate_hero_stat } from '../calculate/calculate_hero_stat'

export interface InitiateAmbushSpec {
  monsterId: MonsterId
}

export function flow_ambush(
  battle: BattleState,
  { monsterId }: InitiateAmbushSpec
): FlowInstruction {
  return [
    'flow',
    'all',
    [
      [
        'apply',
        'log',
        {
          line: [{ monsterRef: monsterId }, 'ambushes the heroes!'],
          type: 'monsterAction',
        },
      ],
      [
        'flow',
        'eachHero',
        (heroId) => {
          if (battle.heroes[heroId].skills.sixthSense) {
            return <FlowInstruction>[
              'apply',
              'log',
              {
                line: [
                  { heroRef: heroId },
                  'has Sixth Sense and spots the ambush by',
                  { monsterRef: monsterId },
                ],
                type: 'info',
              },
            ]
          }
          const PER = calculate_hero_stat(battle, {
            heroId,
            stat: 'PER',
            reason: 'ambush',
          })
          return <FlowInstruction>[
            'flow',
            'test',
            {
              heroId: heroId,
              reason: 'ambush',
              stat: 'PER',
              dice: 'defence',
              line: [
                { heroRef: heroId },
                'must test against PER',
                PER,
                'to avoid ambush by',
                { monsterRef: monsterId },
              ],
              success: [
                'apply',
                'ambushResult',
                { heroId: heroId, monsterId: monsterId },
              ],
              failure: [
                'apply',
                'ambushResult',
                { heroId: heroId, monsterId: monsterId },
              ],
            },
          ]
        },
      ],
    ],
  ]
}
