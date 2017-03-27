import * as test from "tape";

import { BattleState } from '../../src/interfaces';

import { monsters } from '../../src/monsters';
import { heroes } from '../../src/heroes';

import { calc } from '../../src/modes';

test('blessed heroes', t => {
  const battle: BattleState = {
    heroes: {
      id1: {
        blueprint: 'bloodsportBrawler',
        vars: {},
        states: { blessed: true },
        items: {}
      }
    },
    monsters: {}
  };

  t.plan(1);

  const res1 = calc.calc_hero_stat(battle, {id: 'id1', stat: 'MRL'});
  t.deepEqual(res1.value, heroes[battle.heroes.id1.blueprint].stats.MRL + 1, 'blessed means 1 extra MRL');

});