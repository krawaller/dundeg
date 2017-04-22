import * as test from "tape";
import { makeHero, makeMonster, execUntil, reply, makeRoll } from '../testutils';

import { BattleState, FlowInstruction } from '../../src/interfaces';
import { find_hero_actions } from '../../src/find/find_hero_actions';

import { items } from '../../src/library';

test('flash bomb item', t => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{},{},{},['flashBomb']), // AGI 8
      hero2: makeHero('angelOfDeath') // AGI 8
    },
    monsters: {
      monster: makeMonster('slimeCorpse'),
      monster2: makeMonster('slitherFish')
    },
    log: [],
    seed: 'flashbombing' // will roll 3 5 6 4
  };

  battle = execUntil(battle, ['flow','selectAction',{heroId:'hero'}]);
  battle = reply(battle, items.flashBomb.actions.throwFlashBomb);

  battle = execUntil(battle, ['flow','executeAction',{heroId:'hero'}]);
  battle = reply(battle, makeRoll); // roll for blind test for 1st hero, will pass
  battle = reply(battle, makeRoll); // roll for blind test for 2nd hero, will fail
  t.ok(battle.monsters.monster.states.dazed, 'first monster was dazed');
  t.ok(battle.monsters.monster2.states.dazed, 'second monster was dazed');
  t.ok(!battle.heroes.hero.states.blinded, 'first hero wasnt blinded');
  t.ok(battle.heroes.hero2.states.blinded, 'second hero was blinded');
  t.ok(!battle.heroes.hero.items.flashBomb, 'hero lost the flash bomb after throwing it');

  t.end();
});
