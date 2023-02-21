import * as test from 'tape'
import { makeMonster, makeHero, execUntil } from '../testutils'

import {
  BattleState,
  EvilAttack,
  FlowPerformMonsterAttack,
} from '../../src/interfaces'
import { monsters } from '../../src/library'
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack'

test('horde monster skill', (t) => {
  const startingHP = 10
  const DEF = 2
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {
        HP: startingHP,
        defenceDice: [1, DEF],
      }),
    },
    monsters: {
      nacht: makeMonster('nachtDrekSlicer', { target: 'hero' }), // Has horde(weird)
      rat: makeMonster('ratThing'), // has weird
      slither: makeMonster('slitherFish'), // doesnt have weird
    },
    log: [],
  }
  let result: BattleState

  const monsterId = 'nacht'
  const attack: EvilAttack = { type: 'regular' }
  const ATK = monsters.nachtDrekSlicer.stats.ATK

  result = execUntil(battle, <FlowPerformMonsterAttack>[
    'flow',
    'performMonsterAttack',
    { monsterId, attack },
  ])
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (ATK + 1 - DEF),
    'got 1 extra since ratThing is weird'
  )

  battle.monsters.rat.vars.killedBy = 'foo'
  result = execUntil(battle, <FlowPerformMonsterAttack>[
    'flow',
    'performMonsterAttack',
    { monsterId, attack },
  ])
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (ATK - DEF),
    'no extra for dead monster'
  )

  delete battle.monsters.rat.vars.killedBy
  battle.monsters.rat.vars.escaped = true
  result = execUntil(battle, <FlowPerformMonsterAttack>[
    'flow',
    'performMonsterAttack',
    { monsterId, attack },
  ])
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (ATK - DEF),
    'no extra for escaped monster'
  )

  delete battle.monsters.rat
  result = execUntil(battle, <FlowPerformMonsterAttack>[
    'flow',
    'performMonsterAttack',
    { monsterId, attack },
  ])
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (ATK - DEF),
    'no extra if no other weirdos'
  )

  t.end()
})
