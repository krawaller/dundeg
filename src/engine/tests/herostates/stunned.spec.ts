import * as test from 'tape'
import {
  lastLogHasStr,
  makeMonster,
  makeHero,
  execUntil,
  reply,
  makeRoll,
} from '../testutils'

import { BattleState, FlowInstruction } from '../../src/interfaces'
import { apply_end_of_round_to_hero } from '../../src/apply/apply_end_of_round_to_hero'

test('the stunned hero state', (t) => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler', {}, { stunned: true }) },
    monsters: { monster: makeMonster('nachtDrekSlicer', { target: 'hero' }) },
    log: [],
  }

  battle.heroes.hero.vars.action = <FlowInstruction>[
    'flow',
    'performHeroAttack',
  ]
  let result: BattleState = execUntil(battle, <FlowInstruction>[
    'flow',
    'battleDice',
    { heroId: 'hero' },
  ])
  result = reply(result, makeRoll)
  t.ok(
    !result.heroes.hero.vars.powerDice,
    'didnt roll power die since we are stunned'
  )

  battle = apply_end_of_round_to_hero(battle, { heroId: 'hero' })
  t.ok(!battle.heroes.hero.states.stunned, 'stunned was removed')
  t.ok(lastLogHasStr(battle, 'stunned'), 'message announced stun removal')

  t.end()
})
