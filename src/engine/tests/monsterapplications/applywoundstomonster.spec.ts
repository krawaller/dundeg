import * as test from 'tape'
import { lastLogHasStr, makeHero, makeMonster } from '../testutils'

import { BattleState, LogMessagePart } from '../../src/interfaces'
import {
  apply_wounds_to_monster,
  WoundMonsterSpec,
} from '../../src/apply/apply_wounds_to_monster'

test('apply wounds to monster', (t) => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: { monster: makeMonster('slitherFish', { HP: 7 }) },
    log: [],
  }
  const blow: WoundMonsterSpec = {
    heroId: 'hero',
    monsterId: 'monster',
    wounds: { title: 'test', value: 4, history: [] },
    attack: { type: 'special' },
  }
  const failedBlow: WoundMonsterSpec = {
    heroId: 'hero',
    monsterId: 'monster',
    wounds: { title: 'test', value: 0, history: [] },
    attack: { type: 'special' },
  }

  battle = apply_wounds_to_monster(battle, failedBlow)
  t.equal(
    battle.monsters.monster.vars.HP,
    7,
    'failed blow deals no wounds to hero HP'
  )
  t.ok(lastLogHasStr(battle, 'took'), 'got msg')

  battle = apply_wounds_to_monster(battle, blow)
  t.equal(battle.monsters.monster.vars.HP, 3, 'dmg was deducted from HP')
  t.ok(lastLogHasStr(battle, 'took'), 'got msg')

  battle = apply_wounds_to_monster(battle, blow)
  t.equal(battle.monsters.monster.vars.HP, 0, 'HP was floored at 0')
  t.ok(
    lastLogHasStr(battle, 'knocked'),
    'msg acknowledges that hero was knocked out'
  )
  t.equal(
    battle.monsters.monster.vars.killedBy,
    'hero',
    'hero got the kill correctly'
  )

  t.end()
})
