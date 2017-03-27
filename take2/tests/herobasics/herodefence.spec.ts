import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { calc } from '../../src/calculate';

test('calculate hero defence', t => {
  const battle: BattleState = {
    heroes: {
      defenderHiPow: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'defence', POW: 4, defenceDice: [1,3] },
        states: {},
        items: {}
      },
      defenderLoPow: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'defence', POW: 2, defenceDice: [1,3] },
        states: {},
        items: {}
      },
      failedDefenderNoPick: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'defence', POW: 4, defenceDice: [1,3], failedDefence: true },
        states: {},
        items: {}
      },
      failedDefenderPick: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'defence', POW: 2, defenceDice: [1,3], failedDefence: true, usePowForDefence: true },
        states: {},
        items: {}
      },
      assaulter: {
        blueprint: 'hinterLander',
        vars: { stance: 'assault', POW: 6, defenceDice: [5,2] },
        states: {},
        items: {}
      }
    },
    monsters: {
      monster: {
        blueprint: 'slitherFish',
        vars: {},
        states: {}
      }
    }
  };

  t.plan(5);

  const res1 = calc.calc_hero_defence(battle, {heroId: 'defenderHiPow'});
  t.deepEqual(res1.value, 4, 'defending heroes use power if higher');

  const res2 = calc.calc_hero_defence(battle, {heroId: 'defenderLoPow'});
  t.deepEqual(res2.value, 3, 'defending heroes ignore power if lower');

  const res3 = calc.calc_hero_defence(battle, {heroId: 'assaulter'});
  t.deepEqual(res3.value, 5, 'assaulting heroes ignore power ');

  const res4 = calc.calc_hero_defence(battle, {heroId: 'failedDefenderNoPick'});
  t.deepEqual(res4.value, 0, 'failed defenders have no defence');

  const res5 = calc.calc_hero_defence(battle, {heroId: 'failedDefenderPick'});
  t.deepEqual(res5.value, 2, 'failed defenders can choose to use power dice once');
});

