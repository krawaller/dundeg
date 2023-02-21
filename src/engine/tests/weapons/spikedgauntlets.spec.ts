import * as test from 'tape'
import { makeHero, execUntil, reply } from '../testutils'

import { BattleState } from '../../src/interfaces'

import { items } from '../../src/library'

test('spiked gauntlets', (t) => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {}, {}, {}, ['spikedGauntlet']),
    },
    monsters: {},
  }

  battle.heroes.hero.vars.stance = 'assault'
  battle = execUntil(battle, ['flow', 'selectAction', { heroId: 'hero' }])
  t.ok(
    !battle.question.options[
      items.spikedGauntlet.actions.spikedGauntletAttackDefence
    ],
    'defence opt not available in assault'
  )
  battle = reply(
    battle,
    items.spikedGauntlet.actions.spikedGauntletAttackAssault
  )
  t.deepEqual(
    battle.heroes.hero.vars.action[2].attack,
    { using: 'spikedGauntlet', type: 'meelee', stat: 'STR' },
    'STR attack in assault mode'
  )

  battle.heroes.hero.vars.stance = 'guard'
  delete battle.question // why need to do this?!
  battle = execUntil(battle, ['flow', 'selectAction', { heroId: 'hero' }])
  t.ok(
    !battle.question.options[
      items.spikedGauntlet.actions.spikedGauntletAttackAssault
    ],
    'assault opt not available in defence'
  )
  battle = reply(
    battle,
    items.spikedGauntlet.actions.spikedGauntletAttackDefence
  )
  t.deepEqual(
    battle.heroes.hero.vars.action[2].attack,
    { using: 'spikedGauntlet', type: 'meelee', stat: 'AGI' },
    'AGI attack in defence mode'
  )

  t.end()
})
