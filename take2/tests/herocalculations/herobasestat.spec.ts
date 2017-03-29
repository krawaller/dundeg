import * as test from "tape";
import { makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { heroes } from '../../src/library';
import { calculate_hero_stat } from '../../src/calculate/calculate_hero_stat';

test('calc basic hero stats', t => {
  const battle: BattleState = {
    heroes: {
      brawler: makeHero('bloodsportBrawler'),
      lander: makeHero('hinterLander')
    },
    monsters: {}
  };

  t.equal(
    calculate_hero_stat(battle, {heroId: 'brawler', stat: 'CON', reason: '_testReason'}).value,
    heroes[battle.heroes.brawler.blueprint].stats.CON,
    'reads base CON stat correctly'
  );

  t.equal(
    calculate_hero_stat(battle, {heroId: 'lander', stat: 'AGI', reason: '_testReason'}).value,
    heroes[battle.heroes.lander.blueprint].stats.AGI,
    'reads base AGI stat correctly'
  );

  t.end();
});
