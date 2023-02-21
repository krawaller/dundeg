import * as test from 'tape'
import {
  makeHero,
  makeMonster,
  execUntil,
  reply,
  makeRoll,
  replyTo,
} from '../testutils'

import { BattleState } from '../../src/interfaces'
import { items } from '../../src/library'

test('flow player round', (t) => {
  const startingHP = 10
  let battle: BattleState = {
    heroes: {
      hero: makeHero('infamousButcher', { HP: startingHP }, {}, {}, [
        'spikedGauntlet',
      ]),
    },
    monsters: {
      monster: makeMonster('slimeCorpse', { target: 'hero' }),
      monster2: makeMonster('nugBear', { target: 'hero' }),
    }, // ATK 4
    seed: 'playerroundnpm', //  1 5 1 1 5 ( ATK DEF POW )
  }

  // Initiate round
  battle = execUntil(battle, ['flow', 'playerRound', { heroId: 'hero' }])

  // Choose stance
  battle = reply(battle, 'assault')

  // Choose action
  battle = reply(
    battle,
    items.spikedGauntlet.actions.spikedGauntletAttackAssault
  )

  // Choose target (as part of registerATtack)
  battle = reply(battle, battle.monsters.monster.name)

  // Roll battle dice
  battle = replyTo(battle, makeRoll, ['nextPlayer'])

  // Escape choice (since double def roll) --- NO MORE
  // battle = replyTo(battle, 'remain', ['nextPlayer']);

  // Take hit from both monsters // TODO - test defence choice too? where?
  battle
  battle

  // Player does his thing, no question
  battle

  t.equal(
    battle.stack[0][1],
    'nextPlayer',
    'We have reached end of the round, now go to next player!'
  )

  t.end()
})
