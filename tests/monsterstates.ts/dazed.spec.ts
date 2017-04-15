import * as test from "tape";
import { lastLogHasStr, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_end_of_round_to_monster } from '../../src/apply/apply_end_of_round_to_monster';
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack';

test('the dazed monster state', t => {
  let battle: BattleState = {
    heroes: {},
    monsters: {
      monster: makeMonster('megaRat',{},{dazed: true}) // atk - 5
    },
    log: []
  };

  t.equal(
    calculate_monster_attack(battle, {monsterId: 'monster'}).value,
    2, 'attack is halved for monsters when dazed'
  );

  battle = apply_end_of_round_to_monster(battle, {monsterId: 'monster'});
  t.ok(!battle.monsters.monster.states.dazed, 'dazed was removed')
  t.ok(lastLogHasStr(battle, 'dazed'), 'message announced stun removal');

  t.end();
});
