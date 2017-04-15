import * as test from "tape";
import { lastLogHasStr, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_end_of_round_to_monster } from '../../src/apply/apply_end_of_round_to_monster';
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack';

test('the raging mad monster state', t => {
  let battle: BattleState = {
    heroes: {},
    monsters: {
      monster: makeMonster('megaRat',{},{ragingMad: true}) // atk 5
    },
    log: []
  };

  t.equal(
    calculate_monster_attack(battle, {monsterId: 'monster'}).value,
    7, 'attack is plus 2'
  );

  battle = apply_end_of_round_to_monster(battle, {monsterId: 'monster'});
  t.ok(!battle.monsters.monster.states.ragingMad, 'ragingMad was removed')
  t.ok(lastLogHasStr(battle, 'rag'), 'message announced raging mad removal');

  t.end();
});
