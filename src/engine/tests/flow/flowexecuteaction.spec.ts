import * as test from 'tape'
import { makeHero, step } from '../testutils'

import { BattleState, FlowInstruction } from '../../src/interfaces'

test('flow execute action', (t) => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: {},
  }

  const action: FlowInstruction = [
    'flow',
    'throwShrapnelBomb',
    { heroId: 'hero' },
  ]

  battle.heroes.hero.vars.action = action

  battle = step(battle, ['flow', 'executeAction', { heroId: 'hero' }])

  t.deepEqual(battle.stack[0], action, 'Action is now on the stack')

  t.end()
})
