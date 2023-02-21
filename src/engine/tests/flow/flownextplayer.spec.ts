import * as test from 'tape'
import { makeHero, step, justReply, next } from '../testutils'
import { heroes } from '../../src/library'
import { BattleState, FlowInstruction } from '../../src/interfaces'

test('flow next player', (t) => {
  const battle: BattleState = {
    heroes: {
      brawler: makeHero('bloodsportBrawler'), // PER 6
      drifter: makeHero('carnivalDrifter'), // PER 7
      soldier: makeHero('soldierOfFortune'), // PER 7
      angel: makeHero('angelOfDeath'), // PER 8
    },
    monsters: {},
  }
  let result: BattleState

  /* ---- TODO: this test is too naïve, we need to clean it up

  // -------------- TEST SINGLE UPCOMING PLAYER ---------------

  result = step(battle, ['flow','nextPlayer',{}]); // TODO - message!
  t.equal(result.stack[0][1], 'all');
  t.equal(result.stack[0][2][0][1], 'log', 'we added a log message first');
  t.deepEqual(
    result.stack[0][2][1],
    ['flow','playerRound',{heroId:'angel'}],
    'highest perception player goes next, which is angel'
  );

// -------------- TEST MULTIPLE UPCOMING PLAYERS ---------------

  battle.heroes.angel.vars.hasActed = true;
  result = step(battle, ['flow','nextPlayer',{}]);
  t.equal(
    result.stack[0][1],
    'question',
    'now we were asked a question, because we got a tie!'
  );
  t.deepEqual(
    Object.keys(result.stack[0][2].options).sort(),
    [heroes.carnivalDrifter.name, heroes.soldierOfFortune.name],
    'We got to choose between drifter and soldier'
  )
  result = next(result); // to register question
  result = justReply(result, heroes.soldierOfFortune.name);
  t.deepEqual(
    result.stack[0],
    ['flow','playerRound',{heroId:'soldier'}],
    'if we select soldier, it becomes his turn to act'
  );

  // -------------- TEST NO MORE UPCOMING PLAYERS ---------------

  battle.heroes.angel.vars.hasActed = true;
  battle.heroes.brawler.vars.hasActed = true;
  battle.heroes.drifter.vars.hasActed = true;
  battle.heroes.soldier.vars.hasActed = true;
  result = step(battle, ['flow','nextPlayer',{}]);
  t.deepEqual(
    result.stack[0],
    <FlowInstruction>['flow','roundEnd',{}],
    'since no heroes remaining, go to round end'
  );

  */

  t.end()
})
