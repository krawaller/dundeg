import * as test from 'tape'
import { makeMonster, makeHero, execUntil } from '../testutils'

import {
  BattleState,
  Attack,
  FlowPerformHeroAttack,
} from '../../src/interfaces'

import { monsters } from '../../src/library'

test('the rage hero skill', (t) => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero(
        'bloodsportBrawler',
        { attackDice: [1, 3], target: 'monster' },
        {},
        { rage: true }
      ),
    },
    monsters: {
      monster: makeMonster('slitherFish', { target: 'hero' }), // HP - 3, ARM - 2
    },
    log: [],
  }

  let result: BattleState
  const heroId = 'hero'
  const DMG = 3 // highest attack die

  battle.heroes.hero.vars.stance = 'assault'
  result = execUntil(battle, <FlowPerformHeroAttack>[
    'flow',
    'performHeroAttack',
    { heroId, attack: { type: 'meelee', stat: 'STR' } },
  ])
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.slitherFish.stats.HP - (DMG + 1 - monsters.slitherFish.stats.ARM),
    'rage gives 1 additional damage for STR attacks in assault'
  )

  result = execUntil(battle, <FlowPerformHeroAttack>[
    'flow',
    'performHeroAttack',
    { heroId, attack: { type: 'meelee', stat: 'AGI' } },
  ])
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.slitherFish.stats.HP - (DMG - monsters.slitherFish.stats.ARM),
    'rage has no effect when attack isnt using STR'
  )

  battle.heroes.hero.vars.attackDice = [1, 1]
  result = execUntil(battle, <FlowPerformHeroAttack>[
    'flow',
    'performHeroAttack',
    { heroId, attack: { type: 'meelee', stat: 'STR' } },
  ])
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.slitherFish.stats.HP,
    'rage has no effect when no damage was done (slitherfish has 1 ARM)'
  )

  battle.heroes.hero.vars.attackDice = [1, 3]
  battle.heroes.hero.vars.stance = 'guard'
  result = execUntil(battle, <FlowPerformHeroAttack>[
    'flow',
    'performHeroAttack',
    { heroId, attack: { type: 'meelee', stat: 'STR' } },
  ])
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.slitherFish.stats.HP - (DMG - monsters.slitherFish.stats.ARM),
    'rage has no effect when not in assault mode'
  )

  battle.heroes.hero.vars.stance = 'assault'
  battle.monsters.monster.vars.target = 'someoneElse'
  result = execUntil(battle, <FlowPerformHeroAttack>[
    'flow',
    'performHeroAttack',
    { heroId, attack: { type: 'meelee', stat: 'STR' } },
  ])
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.slitherFish.stats.HP - (DMG - monsters.slitherFish.stats.ARM),
    'rage has no effect when target wasnt targetting attacker'
  )

  t.end()
})
