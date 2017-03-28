import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { calculate_hero_defence } from '../../src/calculate/calculate_hero_defence';

test('calculate hero defence', t => {
  const battle: BattleState = {
    heroes: {
      defenderHiPow: makeHero('bloodsportBrawler',{stance: 'defence', POW: 4, defenceDice: [1,3]}),
      defenderLoPow: makeHero('bloodsportBrawler',{stance: 'defence', POW: 2, defenceDice: [1,3]}),
      failedDefenderNoPick: makeHero('bloodsportBrawler',{stance: 'defence', POW: 4, defenceDice: [1,3], failedDefence: true}),
      failedDefenderPick: makeHero('bloodsportBrawler',{stance: 'defence', POW: 2, defenceDice: [1,3], failedDefence: true, usePowForDefence: true}),
      assaulter: makeHero('bloodsportBrawler',{stance: 'assault', POW: 6, defenceDice: [5,2]}),
    },
    monsters: {
      monster: makeMonster('slitherFish')
    }
  };

  t.plan(5);

  const res1 = calculate_hero_defence(battle, {heroId: 'defenderHiPow'});
  t.deepEqual(res1.value, 4, 'defending heroes use power if higher');

  const res2 = calculate_hero_defence(battle, {heroId: 'defenderLoPow'});
  t.deepEqual(res2.value, 3, 'defending heroes ignore power if lower');

  const res3 = calculate_hero_defence(battle, {heroId: 'assaulter'});
  t.deepEqual(res3.value, 5, 'assaulting heroes ignore power ');

  const res4 = calculate_hero_defence(battle, {heroId: 'failedDefenderNoPick'});
  t.deepEqual(res4.value, 0, 'failed defenders have no defence');

  const res5 = calculate_hero_defence(battle, {heroId: 'failedDefenderPick'});
  t.deepEqual(res5.value, 2, 'failed defenders can choose to use power dice once');
});

