import * as test from "tape";
import { makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { find_hero_attack_options } from '../../src/find/find_hero_attack_options';

test('spiked gauntlets', t => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {stance:'assault'}, {}, {}, ['spikedGauntlet'])
    },
    monsters: {}
  };

  t.deepEqual(
    find_hero_attack_options(battle, {heroId: 'hero'}).spikedGauntlet,
    { using: 'spikedGauntlet', type: 'meelee', stat: 'STR' },
    'STR attack in assault mode'
  );

  battle.heroes.hero.vars.stance = 'defence';
  t.deepEqual(
    find_hero_attack_options(battle, {heroId: 'hero'}).spikedGauntlet,
    { using: 'spikedGauntlet', type: 'meelee', stat: 'AGI' },
    'AGI attack in defence mode'
  );

  t.end();
});
