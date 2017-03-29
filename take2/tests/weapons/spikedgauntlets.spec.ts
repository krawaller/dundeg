import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { find_hero_attack_options } from '../../src/find/find_hero_attack_options';

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

  t.deepEqual(
    find_hero_attack_options(battle, {heroId: 'assaulter'}).spikedGauntlet,
    { using: 'spikedGauntlet', type: 'meelee', stat: 'STR' },
    'STR attack in assault mode'
  );

  t.deepEqual(
    find_hero_attack_options(battle, {heroId: 'defender'}).spikedGauntlet,
    { using: 'spikedGauntlet', type: 'meelee', stat: 'AGI' },
    'AGI attack in defence mode'
  );

  t.end();
});
