import * as test from "tape";
import { makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { heroes } from '../../src/library';
import { calculate_hero_stat } from '../../src/calculate/calculate_hero_stat';

test('blessed hero state', t => {
  const battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{},{blessed: true}) },
    monsters: {}
  };

  t.equal(
    calculate_hero_stat(battle, {heroId: 'hero', stat: 'MRL', reason: '_testReason'}).value,
    heroes[battle.heroes.hero.blueprint].stats.MRL + 1,
    'blessed means 1 extra MRL'
  );

  t.end();

});