import * as test from 'tape'
import { makeHero, makeMonster, execUntil, reply, makeRoll } from '../testutils'

import { BattleState, Attack, FlowInstruction } from '../../src/interfaces'
import { find_hero_actions } from '../../src/find/find_hero_actions'
import { apply_daemons_blood } from '../../src/apply/apply_daemons_blood'
import { items } from '../../src/library'

test('Daemons blood', (t) => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {}, {}, {}, ['daemonsBlood']),
    },
    monsters: {
      megarat: makeMonster('megaRat', { HP: 5 }),
      nacht: makeMonster('nachtDrekSlicer', { HP: 8 }),
    },
    log: [],
  }

  battle.seed = '5plsplspls!' // will roll 5;
  battle = execUntil(battle, ['flow', 'selectAction', { heroId: 'hero' }])
  battle = reply(battle, items.daemonsBlood.actions.throwDaemonsBlood)
  if (!battle.heroes.hero.vars.target)
    battle = reply(battle, battle.monsters.megarat.name)

  let result: BattleState

  //  ---------------- D3 Damage versus non-weird -----------------

  result = execUntil(battle, ['flow', 'executeAction', { heroId: 'hero' }])
  result = reply(result, makeRoll) // roll the die, no confirmation required since we have no luck
  t.ok(result.monsters.megarat.states.corroded, 'megarat became corroded')
  t.equal(
    result.monsters.megarat.vars.HP,
    2,
    'roll of 5 means 3 since it was a D3 dice'
  )
  t.ok(!result.heroes.hero.items.daemonsBlood, 'hero lost the daemons blood')

  //  ---------------- D5 Damage versus weird -----------------

  battle.seed = 'another5thanku' // will roll 5 again
  battle.heroes.hero.vars.target = 'nacht'
  result = execUntil(battle, ['flow', 'executeAction', { heroId: 'hero' }])

  result = reply(result, makeRoll) // roll the die, no confirmation required since we have no luck
  t.equal(
    result.monsters.nacht.vars.HP,
    3,
    'roll of 5 meant 5 since he is weird, D6 now'
  )

  t.end()
})
