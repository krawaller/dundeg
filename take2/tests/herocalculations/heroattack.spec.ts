import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { calculate_hero_attack } from '../../src/calculate/calculate_hero_attack';

test('calculate hero attack', t => {
  const battle: BattleState = {
    heroes: {
      attackerHiPow: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'assault', POW: 4, attackDice: [1,3] },
        states: {},
        items: {}
      },
      attackerLoPow: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'assault', POW: 2, attackDice: [1,3] },
        states: {},
        items: {}
      },
      defender: {
        blueprint: 'hinterLander',
        vars: { stance: 'defence', POW: 6, attackDice: [5,2] },
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

  t.plan(3);

  const res1 = calculate_hero_attack(battle, {heroId: 'attackerHiPow'});
  t.deepEqual(res1.value, 4, 'assaulting heroes use power if higher');

  const res2 = calculate_hero_attack(battle, {heroId: 'attackerLoPow'});
  t.deepEqual(res2.value, 3, 'assaulting heroes ignore power if lower');

  const res3 = calculate_hero_attack(battle, {heroId: 'defender'});
  t.deepEqual(res3.value, 5, 'defending heroes ignore power ');
});
