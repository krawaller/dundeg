import * as test from 'tape'
import { makeHero } from '../testutils'

import {
  BattleState,
  LogMessagePart,
  Question,
  FlowInstruction,
} from '../../src/interfaces'
import {
  flow_offer_reroll,
  OfferRerollSpec,
} from '../../src/flow/flow_offer_reroll'

test('flow hero reroll choice', (t) => {
  let result,
    q,
    battle: BattleState = {
      heroes: {
        hero: makeHero('bloodsportBrawler', {
          luck: 777,
          attackDice: [7, 8],
          powerDice: [9],
        }),
      },
      monsters: {},
    }

  result = <FlowInstruction>flow_offer_reroll(battle, {
    heroId: 'hero',
    diceTypes: { attack: 2, power: 1 },
  })
  t.equal(result[1], 'question', 'We got back a question')
  q = <Question>result[2]
  t.deepEqual(
    Object.keys(q.options),
    ['accept', 'atk die with 7', 'atk die with 8', 'pow die with 9'],
    'we got these options'
  )
  t.deepEqual(
    q.options['atk die with 8'][2][0], // because we got a 'flow,all'
    <FlowInstruction>[
      'apply',
      'reroll',
      { heroId: 'hero', index: 1, diceType: 'attack' },
    ],
    'correct reroll instruction for second atk die'
  )
  t.deepEqual(
    q.options['pow die with 9'][2][0],
    <FlowInstruction>[
      'apply',
      'reroll',
      { heroId: 'hero', diceType: 'power', index: 0 },
    ],
    'correct reroll instruction for power die'
  )
  t.ok(!q.options['accept'], 'the accept prop has no instruction')

  delete battle.heroes.hero.vars.powerDice
  battle.heroes.hero.vars.attackDice = [666]
  result = <FlowInstruction>(
    flow_offer_reroll(battle, { heroId: 'hero', diceTypes: { attack: 1 } })
  )
  q = <Question>result[2]
  t.deepEqual(
    Object.keys(q.options),
    ['accept', 'atk die with 666'],
    'it doesnt bug when we have rolled just 1 atk'
  )

  delete battle.heroes.hero.vars.luck
  t.ok(
    !flow_offer_reroll(battle, {
      heroId: 'hero',
      diceTypes: { attack: 2, defence: 2, power: 1 },
    }),
    'no reroll option if out of luck'
  )

  t.end()
})
