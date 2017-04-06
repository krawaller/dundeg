import * as test from "tape";
import { makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { calculate_hero_armour } from '../../src/calculate/calculate_hero_armour';

test('studded leather item', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{},{},{},['studdedLeather']) },
    monsters: {}
  };

  t.equal(
    calculate_hero_armour(battle, {heroId: 'hero'}).value,
    1, 'studded leather gives 1 armour'
  );

  t.end();
});

// WARNING - using this item in test for pierce monster skill, so update there too if this is corrected!
