import * as test from "tape";
import { lastLogHasStr, makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_end_of_round_to_hero } from '../../src/apply/apply_end_of_round_to_hero';

test('the stunned hero state', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler', {}, {stunned: true}) },
    monsters: {},
    log: []
  };

  battle = apply_end_of_round_to_hero(battle, {heroId: 'hero'});
  t.ok(!battle.heroes.hero.states.stunned, 'stunned was removed')
  t.ok(lastLogHasStr(battle, 'stunned'), 'message announced stun removal');

  t.end();
});
