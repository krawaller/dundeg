import * as test from "tape";
import { makeHero, makeMonster, logMessageContains } from '../testutils';

import { BattleState, LogMessagePart, Question, FlowInstruction } from '../../src/interfaces';
import { flow_hero_offer_escape_choice, HeroOfferEscapeChoiceSpec } from '../../src/flow/flow_hero_escape_choice';

test('monster pursue skill', t => {
  let result, battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: {
      pursuer: makeMonster('imperialHuntsman'), // has Pursue
    }
  };

  battle.heroes.hero.vars.defenceDice = [2,2];
  battle.monsters.pursuer.vars.target = 'hero';
  result = flow_hero_offer_escape_choice(battle, {heroId: 'hero'});
  t.equal(result[1], 'log', 'we just got log msg');
  t.ok(logMessageContains(result[2].line, 'ursue'), 'log msg tells about pursue');

  delete battle.monsters.pursuer.vars.target;
  result = flow_hero_offer_escape_choice(battle, {heroId: 'hero'});
  t.ok(result[1] !== 'log', 'we did NOT get log msg');

  t.end();
});

