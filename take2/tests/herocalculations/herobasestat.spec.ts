import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { heroes } from '../../src/library';
import { calculate_hero_stat } from '../../src/calculate/calculate_hero_stat';

test('calc basic hero stats', t => {
  const battle: BattleState = {
    heroes: {
      id1: {
        blueprint: 'bloodsportBrawler',
        vars: {},
        states: {},
        items: {}
      },
      id2: {
        blueprint: 'hinterLander',
        vars: {},
        states: {},
        items: {}
      }
    },
    monsters: {}
  };

  t.plan(2);

  const res1 = calculate_hero_stat(battle, {heroId: 'id1', stat: 'CON'});
  t.deepEqual(res1.value, heroes[battle.heroes.id1.blueprint].stats.CON, 'reads base CON stat correctly');

  const res2 = calculate_hero_stat(battle, {heroId: 'id2', stat: 'AGI'});
  t.deepEqual(res2.value, heroes[battle.heroes.id2.blueprint].stats.AGI, 'reads base AGI stat correctly');
});
