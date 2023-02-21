import * as test from 'tape'
import { makeMonster, makeHero, execUntil } from '../testutils'
import { BattleState, FlowPerformHeroAttack } from '../../src/interfaces'
import { monsters } from '../../src/library'
import { calculate_monster_armour } from '../../src/calculate/calculate_monster_armour'

test('corroded monsters', (t) => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {
        target: 'corroded',
        attackDice: [1, 3],
      }),
    },
    monsters: {
      corroded: makeMonster('slitherFish', {}, { corroded: true }),
    },
    log: [],
  }

  const result: BattleState = execUntil(battle, <FlowPerformHeroAttack>[
    'flow',
    'performHeroAttack',
    {
      heroId: 'hero',
      attack: { type: 'special', stat: 'STR' },
    },
  ])
  t.equal(
    result.monsters.corroded.vars.HP,
    monsters.slitherFish.stats.HP - 3,
    'corroded means arm is 0'
  )

  t.ok(
    monsters[battle.monsters.corroded.blueprint].stats.ARM,
    'monster would have had armour otherwise'
  )

  t.end()
})
