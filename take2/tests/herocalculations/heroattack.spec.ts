import * as test from "tape";
import { makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { calculate_hero_attack } from '../../src/calculate/calculate_hero_attack';

test('calculate hero attack', t => {
  const battle: BattleState = {
    heroes: {
      attackerHiPow: makeHero('bloodsportBrawler',{ stance: 'assault', powerDie: 4, attackDice: [1,3] }),
      attackerLoPow: makeHero('bloodsportBrawler',{ stance: 'assault', powerDie: 2, attackDice: [1,3] }),
      defender: makeHero('hinterLander',{ stance: 'defence', powerDie: 6, attackDice: [5,2] })
    },
    monsters: { }
  };

  t.equal(
    calculate_hero_attack(battle, {heroId: 'attackerHiPow'}).value,
    4, 'assaulting heroes use power if higher'
  );

  t.equal(
    calculate_hero_attack(battle, {heroId: 'attackerLoPow'}).value,
    3, 'assaulting heroes ignore power if lower'
  );

  t.equal(
    calculate_hero_attack(battle, {heroId: 'defender'}).value,
    5, 'defending heroes ignore power '
  );

  t.end();
});
