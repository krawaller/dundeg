import * as test from 'tape'
import { makeHero, makeMonster, execUntil } from '../testutils'

import { monsters, items } from '../../src/library'

import {
  BattleState,
  Attack,
  FlowPerformHeroAttack,
} from '../../src/interfaces'
import { find_hero_attack_options } from '../../src/find/find_hero_attack_options'

test('Nasty Cleaver', (t) => {
  let result: BattleState,
    battle: BattleState = {
      heroes: {
        hero: makeHero(
          'bloodsportBrawler',
          {
            target: 'monster',
            stance: 'assault',
            powerDice: [6],
            attackDice: [1, 2],
          },
          {},
          {},
          ['nastyCleaver']
        ),
      },
      monsters: {
        monster: makeMonster('swampTroll'), // HP 12, ARM 0
      },
      log: [],
    }

  const attack: Attack = { using: 'nastyCleaver', type: 'meelee', stat: 'STR' }

  t.deepEqual(
    find_hero_attack_options(battle, { heroId: 'hero' })[
      items.nastyCleaver.actions.nastyCleaverAttack
    ],
    attack,
    'nasty cleaver offers STR meelee attack'
  )

  result = execUntil(battle, <FlowPerformHeroAttack>[
    'flow',
    'performHeroAttack',
    { heroId: 'hero', attack },
  ])
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.swampTroll.stats.HP - (6 + 1),
    'nasty cleaver gives +1 damage when power die is 6'
  )

  battle.heroes.hero.vars.powerDice = [5]
  result = execUntil(battle, <FlowPerformHeroAttack>[
    'flow',
    'performHeroAttack',
    { heroId: 'hero', attack },
  ])
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.swampTroll.stats.HP - 5,
    'nasty cleaver has no effect when power die isnt 6'
  )

  battle.heroes.hero.vars.powerDice = [6]
  battle.heroes.hero.vars.stance = 'guard'
  result = execUntil(battle, <FlowPerformHeroAttack>[
    'flow',
    'performHeroAttack',
    { heroId: 'hero', attack },
  ])
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.swampTroll.stats.HP - 2, // 2 is highest attack die
    'nasty cleaver has no effect when not assaulting'
  )

  t.end()
})

// TODO - how is nasty cleaver updated?
