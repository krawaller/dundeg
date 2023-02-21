import * as test from 'tape'
import { makeHero } from '../testutils'

import { BattleState, Test } from '../../src/interfaces'
import { apply_register_test_outcome } from '../../src/apply/apply_register_test_outcome'

test('apply reroll', (t) => {
  let result: BattleState,
    battle: BattleState = {
      heroes: { hero: makeHero('bloodsportBrawler') }, // CON 9
      monsters: {},
      log: [],
    }

  const test = <Test>{
    stat: 'CON',
    heroId: 'hero',
    dice: 'attack',
    reason: 'monsterTargetAcquisition',
  }

  battle.heroes.hero.vars.attackDice = [5, 6] // gonna fail
  result = apply_register_test_outcome(battle, test)
  t.equal(result.heroes.hero.vars.testOutcome, 0, 'fail gets 0')

  test.dice = 'defence'
  battle.heroes.hero.vars.defenceDice = [3, 4] // gonna succeed
  result = apply_register_test_outcome(battle, test)
  t.equal(result.heroes.hero.vars.testOutcome, 4, 'success gets highest die')

  t.end()
})
