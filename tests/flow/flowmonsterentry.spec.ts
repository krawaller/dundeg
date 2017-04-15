import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';

import { BattleState, LogMessagePart, Question, FlowInstruction, FlowTarget } from '../../src/interfaces';
import { flow_monster_entry } from '../../src/flow/flow_monster_entry';

test('flow monster entry', t => {
  let battle: BattleState = {
    heroes: {},
    monsters: { monster: makeMonster('backAlleyBruiser') }
  };

  t.ok(
    !flow_monster_entry(battle, {monsterId: 'monster'}),
    'By default flowmonsterentry gives nothing'
  );

  t.end();
});

