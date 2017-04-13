import * as test from "tape";
import { makeHero } from '../testutils';

import { BattleState, LogMessagePart, Question, FlowInstruction } from '../../src/interfaces';
import { flow_hero_offer_return_choice, HeroOfferReturnChoiceSpec } from '../../src/flow/flow_hero_return_choice';

test('flow hero return choice', t => {
  let result, battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler', {escaped: true}) },
    monsters: { },
  };

  result = <FlowInstruction>flow_hero_offer_return_choice(battle, {heroId: 'hero'});
  t.equal(result[0],'question','We got back a question');
  let q = <Question>result[1];
  t.deepEqual(Object.keys(q.options), ['yes','no'], 'we got these two options');
  t.ok(q.options['yes'], 'the return property has an instruction');
  t.ok(!q.options['no'], 'the stay prop has no instruction');

  delete battle.heroes.hero.vars.escaped;
  t.ok(
    !flow_hero_offer_return_choice(battle, {heroId: 'hero'}),
    'no choice if not escaped'
  );

  t.end();
});

