import * as test from 'tape'
import { lastLogHasStr, makeHero } from '../testutils'

import { BattleState } from '../../src/interfaces'
import { apply_return_to_battle } from '../../src/apply/apply_return_to_battle'

test('apply stance choice to hero', (t) => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler', { escaped: true }) },
    monsters: {},
    log: [],
  }

  battle = apply_return_to_battle(battle, { heroId: 'hero' })
  t.ok(!battle.heroes.hero.vars.escaped, 'Hero has returned')
  t.ok(lastLogHasStr(battle, 'return'), 'Correct message was added to log')

  t.end()
})
