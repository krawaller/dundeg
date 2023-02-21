import * as test from 'tape'
import { makeHero } from '../testutils'
import { BattleState } from '../../src/interfaces'
import { find_party_stat } from '../../src/find/find_party_stat'

test('find party stat', (t) => {
  const battle: BattleState = {
    heroes: {
      has8con: makeHero('hinterLander'),
      alsohas8: makeHero('infamousButcher'),
      has9con: makeHero('bloodsportBrawler'),
      another8: makeHero('soldierOfFortune', {}, { poisoned: true }),
      knocked: makeHero('carnivalDrifter', { knockedOutBy: 'someMonster' }),
      escaped: makeHero('angelOfDeath', { escaped: true }),
    },
  }

  const result = find_party_stat(battle, { stat: 'CON', reason: '_testReason' })
  t.equal(
    Object.keys(result.individual).length,
    4,
    'Only 4 heroes were included'
  )
  t.equal(result.stat, 'CON', 'stat name was bubbled correctly')
  t.equal(result.reason, '_testReason', 'testreason was bubbled correctly')
  t.equal(result.individual.has9con.value, 9, 'brawler got correct value')
  t.equal(result.individual.has8con.value, 8, 'hinterlander got correct value')
  t.equal(result.individual.alsohas8.value, 8, 'butcher got correct value')
  t.equal(result.individual.another8.value, 8, 'soldier got correct value')
  t.deepEqual(result.ordered, [
    { value: 9, heroes: ['has9con'] },
    { value: 8, heroes: ['has8con', 'alsohas8', 'another8'] },
  ])

  t.end()
})
