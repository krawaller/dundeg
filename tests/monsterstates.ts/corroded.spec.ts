import * as test from "tape";
import { makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/library';
import { calculate_monster_armour } from '../../src/calculate/calculate_monster_armour';

test('corroded monsters', t => {
  const battle: BattleState = {
    heroes: {},
    monsters: {
      corroded: makeMonster('slitherFish',{},{corroded:true})
    }
  };

  t.equal(
    calculate_monster_armour(battle, {monsterId: 'corroded'}).value,
    0, 'corroded means arm is 0'
  );

  t.ok( monsters[battle.monsters.corroded.blueprint].stats.ARM, 'monster would have had armour otherwise' );

  t.end();
});
