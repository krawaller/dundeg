import * as test from "tape";
import { makeHero } from '../testutils';

import { BattleState, LogMessagePart, Question, FlowInstruction } from '../../src/interfaces';
import { flow_hero_offer_stance_choice, HeroOfferStanceChoiceSpec } from '../../src/flow/flow_hero_stance_choice';

test('flow hero stance choice', t => {
  let result, battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: { },
  };

  result = <FlowInstruction>flow_hero_offer_stance_choice(battle, {heroId: 'hero'});
  t.equal(result[1],'question','We got back a question');
  let q = <Question>result[2];
  t.deepEqual(Object.keys(q.options), ['assault','guard'], 'we got these two options');

  battle.heroes.hero.vars.knockedOutBy = 'someone';
  t.ok(
    !flow_hero_offer_stance_choice(battle, {heroId: 'hero'}),
    'knocked out hero gets no choice'
  );

  battle.heroes.hero.vars.escaped = true;
  t.ok(
    !flow_hero_offer_stance_choice(battle, {heroId: 'hero'}),
    'escaped hero gets no choice'
  );

  t.end();
});

