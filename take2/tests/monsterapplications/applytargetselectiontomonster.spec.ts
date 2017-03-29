import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_target_selection_to_monster } from '../../src/apply/apply_target_selection_to_monster';

test('apply target selection to monster', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler')
    },
    monsters: {
      monster: makeMonster('slitherFish')
    },
    log: []
  };

  let result = apply_target_selection_to_monster(battle, {monsterId: 'monster', heroId: 'hero'});
  t.equal( result.monsters.monster.vars.target, 'hero', 'Monster is now targetting hero' );
  t.ok( lastLogHasStr(result, 'targets'), 'Targetting message was added to log' );

  t.end();
});