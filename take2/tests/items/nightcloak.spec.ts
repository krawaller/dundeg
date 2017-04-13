import * as test from "tape";
import { makeHero, makeMonster, logMessageContains } from '../testutils';

import { BattleState, LogMessagePart, Question, FlowInstruction } from '../../src/interfaces';
import { flow_hero_offer_escape_choice, HeroOfferEscapeChoiceSpec } from '../../src/flow/flow_hero_escape_choice';

test('night cloak item', t => {
  let result, battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{},{},{},['nightCloak']) },
    monsters: {
      pursuer: makeMonster('imperialHuntsman'), // has Pursue
    }
  };

  battle.heroes.hero.vars.defenceDice = [2,2];
  result = flow_hero_offer_escape_choice(battle, {heroId: 'hero'});
  t.equal(result[0], 'question', 'we get question as usual');
  t.deepEqual(Object.keys(result[1].options), ['escape (PER)','escape (MAG)','remain'], 'we get extra option');

  battle.monsters.pursuer.vars.target = 'hero';
  result = flow_hero_offer_escape_choice(battle, {heroId: 'hero'});
  t.equal(result[0], 'question', 'we get question even when there is a pursuer');

  t.end();
});

