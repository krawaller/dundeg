import * as test from "tape";
import { logHasStr, makeMonster, execUntil } from '../testutils';

import { BattleState } from '../../src/interfaces';

test('the skirmish monster skill', t => {
  let battle: BattleState = {
    heroes: {},
    monsters: {
      skirmisher: makeMonster('ratThing') // has skirmish skill
    },
    log: []
  };

  battle = execUntil(battle,['flow','roundEnd',{}]);
  t.ok(logHasStr(battle, 'skirmish'), 'skirmisher escape log was made');
  t.ok(battle.monsters.skirmisher.vars.escaped, 'skirmisher now marked as escaped');

  t.end();

});
