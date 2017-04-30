import * as test from "tape";
import { lastLogHasStr, makeHero } from '../testutils';

import { BattleState, HeroState } from '../../src/interfaces';
import { apply_escape_outcome_to_hero } from '../../src/apply/apply_escape_outcome';

test('apply escape outcome', t => {
  let hero, result, battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{attackDice:[1,2],defenceDice:[3,4],powerDice:[5]}) },
    monsters: {},
    log: []
  };

  battle.heroes.hero.vars.testOutcome = 4; // succeeded
  result = apply_escape_outcome_to_hero(battle, {heroId: 'hero'});
  hero =result.heroes.hero;
  t.ok( hero.vars.escaped, 'Hero escaped correctly' );
  t.ok( lastLogHasStr(result, 'success'), 'Escape message was added to log' );
  t.ok( !hero.vars.attackDice && !hero.vars.defenceDice && !hero.vars.powerDie, 'dice were removed correctly' );

  battle.heroes.hero.vars.testOutcome = 0; // failed
  result = apply_escape_outcome_to_hero(battle, {heroId: 'hero'});
  hero =result.heroes.hero;
  t.ok( hero.vars.failedEscape, 'Hero fail was recorded' );
  t.ok( lastLogHasStr(result, 'fail'), 'Fail message was added to log' );
  t.ok( !hero.vars.attackDice && !hero.vars.defenceDice && !hero.vars.powerDie, 'dice were removed correctly' );

  t.end();
});
