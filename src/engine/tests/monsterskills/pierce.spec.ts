import * as test from 'tape'
import { makeHero, makeMonster, execUntil } from '../testutils'

import { BattleState } from '../../src/interfaces'

test('monster pierce skill', (t) => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero(
        'bloodsportBrawler',
        { HP: 5, failedDefence: true },
        {},
        {},
        ['studdedLeather']
      ),
    }, // leather gives ARM 1
    monsters: { monster: makeMonster('imperialHuntsman', { target: 'hero' }) }, // has Pierce(1), ATK=4
  }

  battle = execUntil(battle, [
    'flow',
    'performMonsterAttack',
    { monsterId: 'monster' },
  ])
  t.equal(
    battle.heroes.hero.vars.HP,
    1,
    'hero took 4 dmg in spite of having 1 armour'
  )

  t.end()
})
