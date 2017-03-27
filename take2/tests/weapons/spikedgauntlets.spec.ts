import * as test from "tape";

import { BattleState } from '../../src/interfaces';

import { heroes } from '../../src/heroes';

import { calc } from '../../src/modes';

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

  const res1 = calc.calc_hero_attack_options(battle, {id: 'assaulter'});
  t.deepEqual(res1.spikedGauntlet, {
    using: 'spikedGauntlet',
    type: 'meelee',
    stat: 'STR'
  }, 'STR attack in assault mode');

  const res2 = calc.calc_hero_attack_options(battle, {id: 'defender'});
  t.deepEqual(res2.spikedGauntlet, {
    using: 'spikedGauntlet',
    type: 'meelee',
    stat: 'AGI'
  }, 'AGI attack in defence mode');
});