import * as test from "tape";
import { makeHero } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { heroes } from '../../src/library';
import { calculate_hero_stat } from '../../src/calculate/calculate_hero_stat';

test('calc basic hero stats', t => {
  const battle: BattleState = {
    heroes: {
      id1: makeHero('bloodsportBrawler'),
      id2: makeHero('hinterLander')
    },
    monsters: {}
  };

  t.plan(2);

  let result = calculate_hero_stat(battle, {heroId: 'id1', stat: 'CON'});
  t.deepEqual(result.value, heroes[battle.heroes.id1.blueprint].stats.CON, 'reads base CON stat correctly');

  result = calculate_hero_stat(battle, {heroId: 'id2', stat: 'AGI'});
  t.deepEqual(result.value, heroes[battle.heroes.id2.blueprint].stats.AGI, 'reads base AGI stat correctly');
});
