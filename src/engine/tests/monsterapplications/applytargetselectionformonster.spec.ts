import * as test from 'tape'
import { lastLogHasStr, makeHero, makeMonster } from '../testutils'

import { BattleState } from '../../src/interfaces'
import { apply_target_selection_for_monster } from '../../src/apply/apply_target_selection_for_monster'

test('apply target selection to monster', (t) => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: { monster: makeMonster('slitherFish') },
    log: [],
  }

  battle = apply_target_selection_for_monster(battle, {
    monsterId: 'monster',
    heroId: 'hero',
    calculation: { title: 'testing', history: [], value: 'foo' },
  })
  t.equal(
    battle.monsters.monster.vars.target,
    'hero',
    'Monster is now targetting hero'
  )
  t.ok(lastLogHasStr(battle, 'targets'), 'Targetting message was added to log')

  t.end()
})
