import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';

import { BattleState, LogMessagePart, Question, FlowInstruction, FlowTarget } from '../../src/interfaces';
import { flow_hero_target_choice, HeroTargetChoiceSpec } from '../../src/flow/flow_hero_target_choice';

test('flow hero target choice', t => {
  const battle: BattleState = {
    heroes: {
      disturbed: makeHero('bloodsportBrawler'),
      undisturbed: makeHero('hinterLander')
    },
    monsters: {
      disturbing: makeMonster('slitherFish',{target: 'disturbed'}),
      alsoDisturbing: makeMonster('megaRat',{target: 'disturbed'}),
      notDisturbing: makeMonster('ghoulTroll'),
      dead: makeMonster('manAtArms',{killedBy: 'someHero', target: 'disturbed'}),
      escaped: makeMonster('slimeCorpse',{escaped: true})
    }
  };

  let result, q;

  result = flow_hero_target_choice(battle, {heroId: 'disturbed'});
  t.equal(result[1], 'question', 'we got a question');
  q = <Question>result[2];
  t.deepEqual(Object.keys(q.options), ['slitherFish', 'megaRat']);

  result = flow_hero_target_choice(battle, {heroId: 'undisturbed'});
  t.equal(result[1], 'question', 'we got a question');
  q = <Question>result[2];
  t.deepEqual(Object.keys(q.options), ['slitherFish', 'megaRat', 'ghoulTroll']);

  delete battle.monsters.alsoDisturbing;
  result = flow_hero_target_choice(battle, {heroId: 'disturbed'});
  t.equal(result[0], 'apply');
  t.equal(result[1], 'heroTargetChoice');
  t.equal(result[2].heroId, 'disturbed');
  t.equal(result[2].monsterId, 'disturbing', 'when just 1 monster we automatically select that');

  t.end();
});

