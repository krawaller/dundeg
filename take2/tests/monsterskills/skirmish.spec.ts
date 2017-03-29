import * as test from "tape";
import { lastLogHasStr, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_end_of_round_to_monster } from '../../src/apply/apply_end_of_round_to_monster';

test('the skirmish monster skill', t => {
  let battle: BattleState = {
    heroes: {},
    monsters: {
      skirmisher: makeMonster('ratThing') // has skirmish skill
    },
    log: []
  };

  battle = apply_end_of_round_to_monster(battle, {monsterId: 'skirmisher'});
  t.ok(lastLogHasStr(battle, 'skirmish'), 'skirmisher escape log was made');
  t.ok(battle.monsters.skirmisher.vars.escaped, 'skirmisher now marked as escaped');

  t.end();

});
