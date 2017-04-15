import * as test from "tape";
import { lastLogHasStr, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_end_of_round_to_monster } from '../../src/apply/apply_end_of_round_to_monster';
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack';

test('the hung over monster state', t => {
  let battle: BattleState = {
    heroes: {},
    monsters: {
      monster: makeMonster('megaRat',{},{hungOver: true}) // atk 5
    },
    log: []
  };

  t.equal(
    calculate_monster_attack(battle, {monsterId: 'monster'}).value,
    3, 'attack is minus 2'
  );

  battle = apply_end_of_round_to_monster(battle, {monsterId: 'monster'});
  t.ok(!battle.monsters.monster.states.hungOver, 'hungOver was removed')
  t.ok(lastLogHasStr(battle, 'hung'), 'message announced hung over removal');

  t.end();
});
