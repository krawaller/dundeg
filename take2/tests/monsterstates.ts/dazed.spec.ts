import * as test from "tape";
import { lastLogHasStr, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_end_of_round_to_monster } from '../../src/apply/apply_end_of_round_to_monster';
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack';

test('the dazed monster state', t => {
  const battle: BattleState = {
    heroes: {},
    monsters: {
      monster: makeMonster('megaRat',{},{dazed: true}) // atk - 5
    },
    log: []
  };

  let atk = calculate_monster_attack(battle, {monsterId: 'monster'});
  t.equal(atk.value, 2, 'attack is halved for monsters when dazed');

  let result = apply_end_of_round_to_monster(battle, {monsterId: 'monster'});
  t.ok(!result.monsters.monster.states.dazed, 'dazed was removed')
  t.ok(lastLogHasStr(result, 'dazed'), 'message announced stun removal');

  t.end();
});
