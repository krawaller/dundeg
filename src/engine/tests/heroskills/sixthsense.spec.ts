import * as test from 'tape'
import { makeHero } from '../testutils'
import { BattleState } from '../../src/interfaces'
import { heroes } from '../../src/library'
import { calculate_hero_stat } from '../../src/calculate/calculate_hero_stat'

test('sixth sense hero skill', (t) => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler'),
      hasSixthSense: makeHero('hinterLander', {}, {}, { sixthSense: true }),
    },
    monsters: {},
  }

  t.equal(
    calculate_hero_stat(battle, {
      heroId: 'hero',
      stat: 'PER',
      reason: 'ambush',
    }).value,
    heroes[battle.heroes.hero.blueprint].stats.PER + 1,
    'got +1 from friends with sixthsense'
  )

  t.end()
})
