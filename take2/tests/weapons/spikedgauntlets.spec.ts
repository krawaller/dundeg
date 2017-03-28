import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { find_hero_attack_options } from '../../src/utils/find_hero_attack_options';

test('spiked gauntlets', t => {
  const battle: BattleState = {
    heroes: {
      assaulter: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'assault'},
        states: {},
        items: { spikedGauntlet: 1 }
      },
      defender: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'defence' },
        states: {},
        items: { spikedGauntlet: 1 }
      }
    },
    monsters: {}
  };

  t.plan(2);

  const res1 = find_hero_attack_options(battle, {heroId: 'assaulter'});
  t.deepEqual(res1.spikedGauntlet, {
    using: 'spikedGauntlet',
    type: 'meelee',
    stat: 'STR'
  }, 'STR attack in assault mode');

  const res2 = find_hero_attack_options(battle, {heroId: 'defender'});
  t.deepEqual(res2.spikedGauntlet, {
    using: 'spikedGauntlet',
    type: 'meelee',
    stat: 'AGI'
  }, 'AGI attack in defence mode');
});
