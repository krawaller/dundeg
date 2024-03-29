import * as test from 'tape'
import { makeHero, makeMonster, execUntil } from '../testutils'

import { BattleState, Attack, FlowInstruction } from '../../src/interfaces'
import { find_hero_attack_options } from '../../src/find/find_hero_attack_options'
import { find_hero_quick_actions } from '../../src/find/find_hero_quick_actions'

import { items } from '../../src/library'

test('Luncheon Truncheon', (t) => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {}, {}, {}, ['luncheonTruncheon']),
    },
    monsters: {
      megarat: makeMonster('megaRat'), // val 1 filth
      nugbear: makeMonster('nugBear'), // val 1 goblin
      shambler: makeMonster('shambler'), // val 3 filth
      chicken: makeMonster('chickenWitch'), // val 2 goblin
      bruiser: makeMonster('backAlleyBruiser'), // val 1
    },
    log: [],
  }

  t.deepEqual(
    find_hero_attack_options(battle, { heroId: 'hero' })[
      items.luncheonTruncheon.actions.luncheonTruncheonAttack
    ],
    <Attack>{ using: 'luncheonTruncheon', type: 'meelee', stat: 'STR' },
    'luncheon truncheon offers STR attack'
  )

  const throwAction: FlowInstruction = [
    'apply',
    'luncheonTruncheonThrow',
    { heroId: 'hero' },
  ]

  t.deepEqual(
    find_hero_quick_actions(battle, { heroId: 'hero' })[
      items.luncheonTruncheon.actions.throwLuncheonTruncheon
    ],
    throwAction,
    'luncheon truncheon offers throw sausage action'
  )

  battle = execUntil(battle, throwAction)
  t.ok(
    !battle.heroes.hero.items.luncheonTruncheon,
    'hero lost sausage when he threw it'
  )
  t.ok(
    !battle.monsters.bruiser.states.dazed,
    'backAlleyBruiser isnt goblin or filth so he isnt dazed'
  )
  t.ok(
    !battle.monsters.chicken.states.dazed,
    'chickenGoblin is goblin but val 2 so he isnt dazed'
  )
  t.ok(
    !battle.monsters.shambler.states.dazed,
    'shambler is filth but val 3 so he isnt dazed'
  )
  t.ok(battle.monsters.nugbear.states.dazed, 'nugbear is dazed')
  t.ok(battle.monsters.megarat.states.dazed, 'megarat is dazed')

  t.ok(battle.log.length > 0, 'log was filled with some items after throw')

  t.end()
})
