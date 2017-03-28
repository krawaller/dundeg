import * as test from "tape";
import { makeHero } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { heroes } from '../../src/library';
import { calculate_hero_stat } from '../../src/calculate/calculate_hero_stat';

test('blessed heroes', t => {
  const battle: BattleState = {
    heroes: {
      id1: makeHero('bloodsportBrawler',{},{blessed: true})
    },
    monsters: {}
  };

  t.plan(1);

  const res1 = calculate_hero_stat(battle, {heroId: 'id1', stat: 'MRL'});
  t.deepEqual(res1.value, heroes[battle.heroes.id1.blueprint].stats.MRL + 1, 'blessed means 1 extra MRL');

});