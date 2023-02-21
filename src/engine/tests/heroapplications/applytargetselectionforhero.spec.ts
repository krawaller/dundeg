import * as test from 'tape'
import { lastLogHasStr, makeHero } from '../testutils'

import { BattleState } from '../../src/interfaces'
import { apply_target_selection_for_hero } from '../../src/apply/apply_target_selection_for_hero'

test('apply stance choice to hero', (t) => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: {},
    log: [],
  }

  battle = apply_target_selection_for_hero(battle, {
    heroId: 'hero',
    monsterId: 'foo',
  })
  t.equal(battle.heroes.hero.vars.target, 'foo', 'Hero got correct target')
  t.ok(lastLogHasStr(battle, 'target'), 'Correct message was added to log')

  t.end()
})
