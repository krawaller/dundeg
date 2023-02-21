import * as test from 'tape'
import { makeMonster, makeHero, execUntil } from '../testutils'

import {
  BattleState,
  FlowPerformMonsterAttack,
  EvilAttack,
} from '../../src/interfaces'
import { monsters } from '../../src/library'
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack'

test('monster fierce state', (t) => {
  const startingHP = 10
  const defence = 2
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {
        HP: startingHP,
        defenceDice: [1, defence],
      }),
    },
    monsters: {
      fierce: makeMonster('_fierceTestMonster', { target: 'hero' }),
    },
    log: [],
  }
  const DMG = monsters[battle.monsters.fierce.blueprint].stats.ATK

  const attack: EvilAttack = { type: 'regular' }
  let result: BattleState
  const monsterId = 'fierce'

  battle.heroes.hero.vars.stance = 'assault'
  result = execUntil(battle, <FlowPerformMonsterAttack>[
    'flow',
    'performMonsterAttack',
    { monsterId, attack },
  ])
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG - defence),
    'Fierce makes no difference versus assaulting hero'
  )

  battle.heroes.hero.vars.stance = 'guard'
  result = execUntil(battle, <FlowPerformMonsterAttack>[
    'flow',
    'performMonsterAttack',
    { monsterId, attack },
  ])
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG + 2 - defence),
    'Fierce gives 2 extra atk versus defending hero'
  )

  t.end()
})
