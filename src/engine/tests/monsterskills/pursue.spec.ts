import * as test from 'tape'
import { makeHero, makeMonster, execUntil } from '../testutils'
import { misc } from '../../src/library'
import { BattleState } from '../../src/interfaces'

test('monster pursuer skill', (t) => {
  let result: BattleState,
    battle: BattleState = {
      heroes: { hero: makeHero('bloodsportBrawler', { stance: 'guard' }) },
      monsters: {
        monster: makeMonster('imperialHuntsman', { target: 'hero' }),
      },
      log: [],
    }

  result = execUntil(battle, ['flow', 'selectAction', { heroId: 'hero' }])
  t.ok(
    !result.question.options[misc.basicActions.escape],
    'Hero cannot escape because Pursuer!'
  )

  t.end()
})
