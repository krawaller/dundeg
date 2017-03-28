import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { calculate_hero_attack_options } from '../../src/calculate/calculate_hero_attack_options';

test('spiked gauntlets', t => {
  const battle: BattleState = {
    heroes: {
      assaulter: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'assault'},
        states: {},
        items: { spikedGauntlet: true }
      },
      defender: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'defence' },
        states: {},
        items: { spikedGauntlet: true }
      }
    },
    monsters: {}
  };

  t.plan(2);

  const res1 = calculate_hero_attack_options(battle, {heroId: 'assaulter'});
  t.deepEqual(res1.spikedGauntlet, {
    using: 'spikedGauntlet',
    type: 'meelee',
    stat: 'STR'
  }, 'STR attack in assault mode');

  const res2 = calculate_hero_attack_options(battle, {heroId: 'defender'});
  t.deepEqual(res2.spikedGauntlet, {
    using: 'spikedGauntlet',
    type: 'meelee',
    stat: 'AGI'
  }, 'AGI attack in defence mode');
});
