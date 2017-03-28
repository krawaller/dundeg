import * as test from "tape";
import { lastLogHasStr, makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_end_of_round_to_hero } from '../../src/apply/apply_end_of_round_to_hero';

test('the stunned hero state', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {}, {stunned: true})
    },
    monsters: {},
    log: []
  };

  let result = apply_end_of_round_to_hero(battle, {heroId: 'hero'});
  t.ok(!result.heroes.hero.states.stunned, 'stunned was removed')
  t.ok(lastLogHasStr(result, 'stunned'), 'message announced stun removal');

  t.end();
});
