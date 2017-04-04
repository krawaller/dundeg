import * as test from "tape";
import { lastLogHasStr, makeHero } from '../testutils';

import { BattleState, HeroState } from '../../src/interfaces';
import { apply_escape_outcome_to_hero } from '../../src/apply/apply_escape_outcome';

test('apply escape outcome', t => {
  let hero, result, battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{attackDice:[1,2],defenceDice:[3,4],powerDie:5}) },
    monsters: {},
    log: []
  };

  result = apply_escape_outcome_to_hero(battle, {heroId: 'hero', success: true});
  hero =result.heroes.hero;
  t.ok( hero.vars.escaped, 'Hero escaped correctly' );
  t.ok( lastLogHasStr(result, 'success'), 'Escape message was added to log' );
  t.ok( !hero.vars.attackDice && !hero.vars.defenceDice && !hero.vars.powerDie, 'dice were removed correctly' );

  result = apply_escape_outcome_to_hero(battle, {heroId: 'hero', success: false});
  hero =result.heroes.hero;
  t.ok( hero.vars.failedEscape, 'Hero fail was recorded' );
  t.ok( lastLogHasStr(result, 'fail'), 'Fail message was added to log' );
  t.ok( !hero.vars.attackDice && !hero.vars.defenceDice && !hero.vars.powerDie, 'dice were removed correctly' );

  t.end();
});
