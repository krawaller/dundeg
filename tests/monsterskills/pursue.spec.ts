import * as test from "tape";
import { makeHero, makeMonster, logHasStr, execUntil } from '../testutils';

import { BattleState, LogMessagePart, Question, FlowInstruction } from '../../src/interfaces';
import { flow_hero_offer_escape_choice, HeroOfferEscapeChoiceSpec } from '../../src/flow/flow_hero_escape_choice';

test('monster pursue skill', t => {
  let result, battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: {
      pursuer: makeMonster('imperialHuntsman'), // has Pursue
    },
    log: []
  };

  battle.heroes.hero.vars.defenceDice = [2,2];
  battle.monsters.pursuer.vars.target = 'hero';
  result = execUntil(battle,['flow','escapeChoice',{heroId:'hero'}]);
  t.ok(!result.question, 'we did not get offer to escape');
  t.ok(logHasStr(result, 'ursue'), 'log msg tells about pursue');

  delete battle.monsters.pursuer.vars.target;
  result = execUntil(battle,['flow','escapeChoice',{heroId:'hero'}]);
  t.ok(result.question, 'we did get offer to escape');

  t.end();
});

// TODO - does pursue take targetting into account?

