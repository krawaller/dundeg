import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { calculate_hero_defence } from '../../src/calculate/calculate_hero_defence';

test('calculate hero defence', t => {
  const battle: BattleState = {
    heroes: {
      defenderHiPow: makeHero('bloodsportBrawler',{stance: 'defence', powerDice: 4, defenceDice: [1,3]}),
      defenderLoPow: makeHero('bloodsportBrawler',{stance: 'defence', powerDice: 2, defenceDice: [1,3]}),
      failedDefenderNoPick: makeHero('bloodsportBrawler',{stance: 'defence', powerDice: 4, defenceDice: [1,3], failedDefence: true}),
      failedDefenderPick: makeHero('bloodsportBrawler',{stance: 'defence', powerDice: 2, defenceDice: [1,3], failedDefence: true, usePowForDefence: true}),
      assaulter: makeHero('bloodsportBrawler',{stance: 'assault', powerDice: 6, defenceDice: [5,2]}),
    },
    monsters: {
      monster: makeMonster('slitherFish')
    }
  };

  t.equal(
    calculate_hero_defence(battle, {heroId: 'defenderHiPow'}).value,
    4, 'defending heroes use power if higher'
  );

  t.equal(
    calculate_hero_defence(battle, {heroId: 'defenderLoPow'}).value,
    3, 'defending heroes ignore power if lower'
  );
  
  t.equal(
    calculate_hero_defence(battle, {heroId: 'assaulter'}).value,
    5, 'assaulting heroes ignore power'
  );

  t.equal(
    calculate_hero_defence(battle, {heroId: 'failedDefenderNoPick'}).value,
    0, 'failed defenders have no defence'
  );

  t.equal(
    calculate_hero_defence(battle, {heroId: 'failedDefenderPick'}).value,
    2, 'failed defenders can choose to use power dice once'
  );

  t.end();
});

