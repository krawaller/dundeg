import * as test from "tape";
import { lastLogHasStr, makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_stance_choice_to_hero } from '../../src/apply/apply_stance_choice_to_hero';

test('apply stance choice to hero', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: {},
    log: []
  };

  battle = apply_stance_choice_to_hero(battle, {heroId: 'hero', stance: 'defence'});
  t.equal( battle.heroes.hero.vars.stance, 'defence', 'Hero adopted stance correctly' );
  t.ok( lastLogHasStr(battle, 'defence'), 'Correct message was added to log' );

  t.end();
});
