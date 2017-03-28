import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { heroes } from '../../src/library';
import { calculate_hero_stat } from '../../src/calculate/calculate_hero_stat';

test('poisoned heroes', t => {
  const battle: BattleState = {
    heroes: {
      id1: {
        blueprint: 'bloodsportBrawler',
        vars: {},
        states: { poisoned: true },
        items: {}
      }
    },
    monsters: {}
  };

  t.plan(1);

  const res1 = calculate_hero_stat(battle, {heroId: 'id1', stat: 'CON'});
  t.deepEqual(res1.value, heroes[battle.heroes.id1.blueprint].stats.CON - 1, 'poisoned means 1 less CON');

});