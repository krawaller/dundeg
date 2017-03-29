import * as test from "tape";
import { makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/library';
import { calculate_monster_armour } from '../../src/calculate/calculate_monster_armour';

test('calculating monster armour', t => {
  const battle: BattleState = {
    heroes: {},
    monsters: { monster: makeMonster('slitherFish') }
  };

  t.equal(
    calculate_monster_armour(battle, {monsterId: 'monster'}).value,
    monsters.slitherFish.stats.ARM,
    'just normal base armour value'
  );

  t.end();

});
