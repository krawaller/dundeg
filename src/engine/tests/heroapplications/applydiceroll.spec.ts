import * as test from 'tape'
import { makeHero } from '../testutils'

import { BattleState } from '../../src/interfaces'
import { apply_dice_roll } from '../../src/apply/apply_dice_roll'

test('apply dice roll to hero', (t) => {
  const battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: {},
    log: [],
  }

  let result: BattleState, dice

  result = apply_dice_roll(battle, { heroId: 'hero', diceTypes: { attack: 2 } })
  dice = result.heroes.hero.vars.attackDice
  t.equal(dice.length, 2, 'hero got attack dice')
  t.ok(!result.heroes.hero.vars.defenceDice, 'hero did NOT get defence die')
  t.ok(!result.heroes.hero.vars.powerDice, 'hero did NOT get power')
  dice.forEach((d, n) => {
    t.equal(typeof d, 'number', 'attack die ' + n + ' is number')
    t.ok(d >= 1, 'die is 1 or over')
    t.ok(d <= 6, 'die is 6 or lower')
  })

  result = apply_dice_roll(battle, { heroId: 'hero', diceTypes: { attack: 1 } })
  dice = result.heroes.hero.vars.attackDice
  t.equal(dice.length, 1, 'hero got single attack dice')
  t.ok(!result.heroes.hero.vars.defenceDice, 'hero did NOT get defence die')
  t.ok(!result.heroes.hero.vars.powerDice, 'hero did NOT get power')
  dice.forEach((d, n) => {
    t.equal(typeof d, 'number', 'attack die ' + n + ' is number')
    t.ok(d >= 1, 'die is 1 or over')
    t.ok(d <= 6, 'die is 6 or lower')
  })

  result = apply_dice_roll(battle, {
    heroId: 'hero',
    diceTypes: { defence: 2 },
  })
  dice = result.heroes.hero.vars.defenceDice
  t.equal(dice.length, 2, 'hero got defence dice')
  t.ok(!result.heroes.hero.vars.attackDice, 'hero did NOT get attack die')
  t.ok(!result.heroes.hero.vars.powerDice, 'hero did NOT get power')
  dice.forEach((d, n) => {
    t.equal(typeof d, 'number', 'defence die ' + n + ' is number')
    t.ok(d >= 1, 'die is 1 or over')
    t.ok(d <= 6, 'die is 6 or lower')
  })

  result = apply_dice_roll(battle, { heroId: 'hero', diceTypes: { power: 2 } }) // TODO - use seed to know number
  dice = result.heroes.hero.vars.powerDice[0]
  t.ok(!result.heroes.hero.vars.attackDice, 'hero did NOT get attack die')
  t.ok(!result.heroes.hero.vars.defenceDice, 'hero did NOT get defence')
  t.equal(typeof dice, 'number', 'power die is number')
  t.ok(dice >= 1, 'die is 1 or over')
  t.ok(dice <= 6, 'die is 6 or lower')
  t.end()
})
