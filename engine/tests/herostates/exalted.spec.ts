import * as test from "tape";
import { makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { heroes } from '../../src/library';
import { calculate_hero_stat } from '../../src/calculate/calculate_hero_stat';

test('exalted hero state', t => {
  const battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{},{exalted:true}) },
    monsters: {}
  };

  t.equal(
    calculate_hero_stat(battle, {heroId: 'hero', stat: 'MAG', reason: '_testReason'}).value,
    heroes[battle.heroes.hero.blueprint].stats.MAG + 1,
    'exalted means 1 extra MAG'
  );

  t.end();

});