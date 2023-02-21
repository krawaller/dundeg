import { BattleState, HeroId, FlowInstruction, FlowTest } from '../interfaces'

export interface FlashBombSpec {
  heroId: HeroId
}

export function flow_flash_bomb(
  battle: BattleState,
  { heroId }: FlashBombSpec
): FlowInstruction {
  return [
    'flow',
    'all',
    [
      [
        'apply',
        'log',
        { type: 'action', line: [{ heroRef: heroId }, 'throws a Flash Bomb!'] },
      ],
      [
        'flow',
        'eachHero',
        (hId) =>
          <FlowTest>[
            'flow',
            'test',
            {
              heroId: hId,
              stat: 'AGI',
              line: [{ heroRef: hId }, 'must pass AGI test or become blinded'],
              dice: 'defence',
              success: undefined,
              failure: [
                'apply',
                'stateToHero',
                { heroId: hId, state: 'blinded' },
              ],
            },
          ],
      ],
      [
        'flow',
        'eachMonster',
        (monsterId) =>
          <FlowInstruction>[
            'flow',
            'all',
            [
              [
                'apply',
                'log',
                {
                  type: 'success',
                  line: [
                    { monsterRef: monsterId },
                    'is dazed by the Flash Bomb from',
                    { heroRef: heroId },
                  ],
                },
              ],
              ['apply', 'stateToMonster', { monsterId, state: 'dazed' }],
              <FlowInstruction>[
                'apply',
                'removeItem',
                { heroId, item: 'flashBomb' },
              ],
            ],
          ],
      ],
    ],
  ]
}
