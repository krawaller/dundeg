import * as test from 'tape'
import { makeHero, makeMonster, execUntil } from '../testutils'

import {
  BattleState,
  FlowPerformHeroAttack,
  Attack,
} from '../../src/interfaces'
import { monsters, items } from '../../src/library'
import { calculate_monster_armour } from '../../src/calculate/calculate_monster_armour'
import { find_hero_attack_options } from '../../src/find/find_hero_attack_options'

test('skinning knife', (t) => {
  let result: BattleState,
    battle: BattleState = {
      heroes: {
        hero: makeHero('bloodsportBrawler', { attackDice: [1, 3] }, {}, {}, [
          'skinningKnife',
        ]),
      },
      monsters: {
        nonfilth: makeMonster('manAtArms'),
        filth: makeMonster('slitherFish'),
      },
      log: [],
    }

  const attack: Attack = { using: 'skinningKnife', type: 'meelee', stat: 'AGI' }

  t.deepEqual(
    find_hero_attack_options(battle, { heroId: 'hero' })[
      items.skinningKnife.actions.skinningKnifeAttack
    ],
    attack,
    'skinning knife offers AGI attack'
  )

  battle.heroes.hero.vars.target = 'nonfilth'
  result = execUntil(battle, <FlowPerformHeroAttack>[
    'flow',
    'performHeroAttack',
    { heroId: 'hero', attack },
  ])
  t.equal(
    result.monsters.nonfilth.vars.HP,
    monsters.manAtArms.stats.HP - (3 - monsters.manAtArms.stats.ARM),
    'normal attack since target wasnt filth'
  )

  battle.heroes.hero.vars.target = 'filth'
  result = execUntil(battle, <FlowPerformHeroAttack>[
    'flow',
    'performHeroAttack',
    { heroId: 'hero', attack },
  ])
  t.equal(
    result.monsters.filth.vars.HP,
    monsters.slitherFish.stats.HP - (3 - (monsters.slitherFish.stats.ARM - 1)),
    'deducts 1 ARM versus filth'
  )

  t.end()
})
