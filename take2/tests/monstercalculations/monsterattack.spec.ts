import * as test from "tape";
import { makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/library';
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack';

test('calculating monster attack', t => {
  const battle: BattleState = {
    heroes: {},
    monsters: {
      id1: makeMonster('slitherFish')
    }
  };

  t.plan(1);

  const res1 = calculate_monster_attack(battle, {monsterId: 'id1'});
  t.equal(res1.value, monsters.slitherFish.stats.ATK, 'just normal base attack value');

});

