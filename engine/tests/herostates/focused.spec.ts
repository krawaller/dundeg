import * as test from "tape";
import { makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { heroes } from '../../src/library';
import { calculate_hero_stat } from '../../src/calculate/calculate_hero_stat';

test('focused hero state', t => {
  const battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{},{focused: true}) },
    monsters: {}
  };

  t.equal(
    calculate_hero_stat(battle, {heroId: 'hero', stat: 'PER', reason: '_testReason'}).value,
    heroes[battle.heroes.hero.blueprint].stats.PER +1,
    'focused means 1 more PER'
  );

  t.end();

});