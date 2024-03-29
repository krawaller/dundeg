import {
  BattleState,
  HeroId,
  FlowInstruction,
  ApplyQuestion,
  ApplyReturnToBattle,
} from '../interfaces'

export interface HeroOfferReturnChoiceSpec {
  heroId: HeroId
}

export function flow_hero_offer_return_choice(
  battle: BattleState,
  { heroId }: HeroOfferReturnChoiceSpec
): FlowInstruction {
  console.log('maybe return choice for', heroId, battle.heroes[heroId])
  if (battle.heroes[heroId].vars.escaped) {
    return <ApplyQuestion>[
      'apply',
      'question',
      {
        line: ['Should', { heroRef: heroId }, 'return to battle?'],
        options: {
          yes: <ApplyReturnToBattle>[
            'apply',
            'returnToBattle',
            { heroId: heroId },
          ],
          no: undefined,
        },
      },
    ]
  }
}
