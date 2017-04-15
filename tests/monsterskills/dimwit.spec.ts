import * as test from "tape";
import { makeHero, makeMonster, lastLogHasStr } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_dimwit_result } from '../../src/apply/apply_dimwit_result';
import { flow_monster_entry } from '../../src/flow/flow_monster_entry';


test('monster dimwit skill', t => {
  let battle: BattleState = {
    heroes: {  },
    monsters: { monster: makeMonster('drunkenYokel') }, // has dimwit
    log: []
  };

  let flow = flow_monster_entry(battle, {monsterId: 'monster'});
  t.equal( flow[1], 'dimwitResult', 'we got a dimwit flow fix' );

  let result = apply_dimwit_result(battle, {monsterId: 'monster', result: 'hungOver'});
  t.ok(result.monsters.monster.states.hungOver, 'monster got hung over');
  t.ok(!result.monsters.monster.states.ragingMad, 'monster isnt raging mad');
  t.ok(lastLogHasStr(result, 'hung'), 'msg acknowledges that monster is hung over');

  result = apply_dimwit_result(battle, {monsterId: 'monster', result: 'ragingMad'});
  t.ok(result.monsters.monster.states.ragingMad, 'monster got raging mad');
  t.ok(!result.monsters.monster.states.hungOver, 'monster isnt hung over');
  t.ok(lastLogHasStr(result, 'rag'), 'msg acknowledges that monster is raging mad');

  result = apply_dimwit_result(battle, {monsterId: 'monster', result: 'sober'});
  t.ok(!result.monsters.monster.states.ragingMad, 'monster isnt raging mad');
  t.ok(!result.monsters.monster.states.hungOver, 'monster isnt hung over');
  t.ok(lastLogHasStr(result, 'sober'), 'msg acknowledges that monster is sober');

  t.end();

});
