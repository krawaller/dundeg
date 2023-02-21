import * as test from 'tape'
import {
  makeHero,
  makeMonster,
  logMessageContains,
  execUntil,
  reply,
  lastLogHasStr,
} from '../testutils'
import { items, misc } from '../../src/library'
import {
  BattleState,
  LogMessagePart,
  Question,
  FlowInstruction,
} from '../../src/interfaces'

test('night cloak item', (t) => {
  const cloak = items.nightCloak

  let result,
    battle: BattleState = {
      heroes: {
        hero: makeHero('bloodsportBrawler', {}, {}, {}, ['nightCloak']),
      },
      monsters: {
        pursuer: makeMonster('imperialHuntsman', { target: 'hero' }), // has Pursue
      },
    }

  battle.heroes.hero.vars.stance = 'assault'
  result = execUntil(battle, ['flow', 'selectAction', { heroId: 'hero' }])
  t.ok(
    !result.question.options[cloak.actions.nightCloakEscapeAGI],
    'Hero cannot escape with AGI because assaulting'
  )
  t.ok(
    !result.question.options[cloak.actions.nightCloakEscapeMAG],
    'Hero cannot escape with MAG because assaulting'
  )

  battle.heroes.hero.vars.stance = 'guard'
  result = execUntil(battle, ['flow', 'selectAction', { heroId: 'hero' }])
  t.ok(
    !result.question.options[misc.basicActions.escape],
    'Hero doesnt get normal escape option'
  )
  t.ok(
    result.question.options[cloak.actions.nightCloakEscapeAGI],
    'Hero can escape with AGI, even though Pursuer'
  )
  t.ok(
    result.question.options[cloak.actions.nightCloakEscapeMAG],
    'Hero can escape with MAG, even though Pursuer'
  )

  t.end()
})
