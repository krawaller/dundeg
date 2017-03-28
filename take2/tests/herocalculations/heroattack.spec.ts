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

  let result = calculate_hero_attack(battle, {heroId: 'attackerHiPow'});
  t.deepEqual(result.value, 4, 'assaulting heroes use power if higher');

  result = calculate_hero_attack(battle, {heroId: 'attackerLoPow'});
  t.deepEqual(result.value, 3, 'assaulting heroes ignore power if lower');

  result = calculate_hero_attack(battle, {heroId: 'defender'});
  t.deepEqual(result.value, 5, 'defending heroes ignore power ');
});
