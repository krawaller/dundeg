import * as test from 'tape'
import { makeHero, makeMonster, lastLogHasStr, execUntil } from '../testutils'

import { BattleState, Attack, FlowInstruction } from '../../src/interfaces'
import { monsters } from '../../src/library'

test('monster evade skill', (t) => {
  let result: BattleState,
    battle: BattleState = {
      heroes: {
        hero: makeHero('bloodsportBrawler', {
          target: 'monster',
          attackDice: [2, 2],
        }),
      },
      monsters: {
        monster: makeMonster('harpy'), // has evade
      },
      log: [],
    }

  result = execUntil(battle, <FlowInstruction>[
    'flow',
    'performHeroAttack',
    { heroId: 'hero', attack: { type: 'meelee', stat: 'STR' } },
  ])
  t.ok(lastLogHasStr(result, 'evade'), 'log talks about evade')
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.harpy.stats.HP,
    'harpy wasnt damaged'
  )

  result = execUntil(battle, <FlowInstruction>[
    'flow',
    'performHeroAttack',
    { heroId: 'hero', attack: { type: 'ranged', stat: 'STR' } },
  ])
  t.ok(
    result.monsters.monster.vars.HP !== monsters.harpy.stats.HP,
    'harpy took damage as normal'
  )

  t.end()
})
