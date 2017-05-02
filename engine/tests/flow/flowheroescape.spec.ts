import * as test from "tape";
import { makeHero, makeMonster, logMessageContains, lastLogHasStr, reply, execUntil } from '../testutils';
import { misc } from '../../src/library';
import { BattleState, LogMessagePart, Question, FlowInstruction } from '../../src/interfaces';

test('flow hero escape', t => {
  let result:BattleState, battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: { monster: makeMonster('slimeCorpse') },
    log: []
  };

  battle.heroes.hero.vars.stance = 'assault';
  result = execUntil(battle, ['flow','selectAction',{heroId:'hero'}]);
  t.ok(!result.question.options[misc.basicActions.escape], 'Hero cannot escape because assaulting');

  battle.heroes.hero.vars.stance = 'guard';
  battle = execUntil(battle, ['flow','selectAction',{heroId:'hero'}]);
  battle = reply(battle, misc.basicActions.escape); // make Battle from now on have escape selected

  result = execUntil(battle, ['flow','executeAction',{heroId:'hero'}]);
  t.ok(result.heroes.hero.vars.escaped, 'Hero escaped directly since no monsters were targetting him');

  battle.monsters.monster.vars.target = 'hero';
  battle.seed = 'willescape'; // 1,3 means will succeed
  result = execUntil(battle, ['flow','executeAction',{heroId:'hero'}]);
  result = reply(result,'roll');
  t.ok(result.heroes.hero.vars.escaped, 'Hero escaped!');
  t.ok(lastLogHasStr(result,'escape'), 'Log acknowledges successful escape');

  battle.seed = 'cannotescape'; // 6,4 means will fail
  result = execUntil(battle, ['flow','executeAction',{heroId:'hero'}]);
  result = reply(result,'roll');
  t.ok(!result.heroes.hero.vars.escaped, 'Hero did not escape');
  t.ok(lastLogHasStr(result,'fail'), 'Log acknowledges failed escape');

  battle.monsters.monster.states.dazed = true;
  result = execUntil(battle, ['flow','executeAction',{heroId:'hero'}]);
  t.ok(result.heroes.hero.vars.escaped, 'Hero escaped automatically because monster wasnt active');

  t.end();
});

