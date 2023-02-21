import * as test from 'tape'
import { makeHero } from '../testutils'

import { BattleState } from '../../src/interfaces'
import { calculate_hero_armour } from '../../src/calculate/calculate_hero_armour'

test('calc hero ARM', (t) => {
  const battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: {},
  }

  t.equal(
    calculate_hero_armour(battle, { heroId: 'hero' }).value,
    0,
    'heroes have no natural armour'
  )

  t.end()
})
