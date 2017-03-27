import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { calc } from '../../src/calculate';

test('calc hero ARM', t => {
  const battle: BattleState = {
    heroes: {
      hero: {
        blueprint: 'bloodsportBrawler',
        vars: {},
        states: {},
        items: {}
      }
    },
    monsters: {}
  };

  t.plan(1);

  const result = calc.calc_hero_armour(battle, {heroId: 'hero'});
  t.deepEqual(result.value, 0, 'heroes have no natural armour');
});