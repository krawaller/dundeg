import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/monsters';
import { calculate_monster_armour } from '../../src/calculate/calculate_monster_armour';

test('corroded monsters', t => {
  const battle: BattleState = {
    heroes: {},
    monsters: {
      corroded: {
        blueprint: 'slitherFish',
        vars: {},
        states: { corroded: true }
      }
    }
  };

  t.plan(2);

  const res2 = calculate_monster_armour(battle, {monsterId: 'corroded'});
  t.equal(res2.value, 0, 'corroded means arm is 0');
  t.ok( monsters[battle.monsters.corroded.blueprint].stats.ARM, 'monster would have had armour otherwise' );
});
