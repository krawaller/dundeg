import * as test from "tape";
import { makeHero, makeMonster, logMessageContains } from '../testutils';

import { BattleState, LogMessagePart, Question, FlowInstruction } from '../../src/interfaces';
import { flow_hero_offer_escape_choice, HeroOfferEscapeChoiceSpec } from '../../src/flow/flow_hero_escape_choice';

test('flow hero escape choice', t => {
  let result, battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: {},
    log: []
  };

  battle.heroes.hero.vars.defenceDice = [1,2];
  result = flow_hero_offer_escape_choice(battle, {heroId: 'hero'});
  t.equal(result[1], 'log', 'we just got log msg');
  t.ok(logMessageContains(result[2].line, 'cannot'), 'log msg tells hero cannot escape');

  battle.heroes.hero.vars.knockedOutBy = 'someone';
  result = flow_hero_offer_escape_choice(battle, {heroId: 'hero'});
  t.ok(!result, 'knocked out heroes get nothing' );

  delete battle.heroes.hero.vars.knockedOutBy;
  battle.heroes.hero.vars.defenceDice = [2,2];
  result = flow_hero_offer_escape_choice(battle, {heroId: 'hero'});
  t.equal(result[0], 'question', 'we get question about escaping');

  t.end();
});

