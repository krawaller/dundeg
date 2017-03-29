import * as test from "tape";
import { makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/library';
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack';

test('calculating monster attack', t => {
  const battle: BattleState = {
    heroes: {},
    monsters: {
      monster: makeMonster('slitherFish')
    }
  };

  t.equal(
    calculate_monster_attack(battle, {monsterId: 'monster'}).value,
    monsters.slitherFish.stats.ATK,
    'just normal base attack value'
  );

  t.end();

});

