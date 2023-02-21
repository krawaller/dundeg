import * as test from 'tape'
import { makeHero } from '../testutils'

import { BattleState } from '../../src/interfaces'
import { heroes } from '../../src/library'
import { calculate_hero_stat } from '../../src/calculate/calculate_hero_stat'

test('poisoned hero state', (t) => {
  const battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler', {}, { poisoned: true }) },
    monsters: {},
  }

  t.equal(
    calculate_hero_stat(battle, {
      heroId: 'hero',
      stat: 'CON',
      reason: '_testReason',
    }).value,
    heroes[battle.heroes.hero.blueprint].stats.CON - 1,
    'poisoned means 1 less CON'
  )

  t.end()
})
