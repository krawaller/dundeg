import * as test from "tape";
import { makeHero, makeMonster, lastLogHasStr, execUntil } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_dimwit_result } from '../../src/apply/apply_dimwit_result';
import { flow_monster_entry } from '../../src/flow/flow_monster_entry';


test('monster dimwit skill', t => {
  let result: BattleState, battle: BattleState = {
    heroes: {  },
    monsters: { monster: makeMonster('drunkenYokel') }, // has dimwit
    log: [],
    seed: 'dimwitting' // will roll 2,6,4 - means hung over, raging mad, nothing
  };

  result = execUntil(battle, ['flow','monsterEntry',{monsterId:'monster'}]);
  t.ok(result.monsters.monster.states.hungOver, 'monster got hung over');
  t.ok(!result.monsters.monster.states.ragingMad, 'monster isnt raging mad');
  t.ok(lastLogHasStr(result, 'hung'), 'msg acknowledges that monster is hung over');

  result = execUntil(battle, ['flow','monsterEntry',{monsterId:'monster'}]);
  t.ok(result.monsters.monster.states.ragingMad, 'monster got raging mad');
  t.ok(!result.monsters.monster.states.hungOver, 'monster isnt hung over');
  t.ok(lastLogHasStr(result, 'rag'), 'msg acknowledges that monster is raging mad');

  result = execUntil(battle, ['flow','monsterEntry',{monsterId:'monster'}]);
  t.ok(!result.monsters.monster.states.ragingMad, 'monster isnt raging mad');
  t.ok(!result.monsters.monster.states.hungOver, 'monster isnt hung over');
  t.ok(lastLogHasStr(result, 'sober'), 'msg acknowledges that monster is sober');

  t.end();

});
