import * as test from "tape";
import { makeHero, makeMonster, lastLogHasStr } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { find_monster_entry_skills } from '../../src/find/find_monster_entry_skills';
import { apply_ambush_result } from '../../src/apply/apply_ambush_result';

test('monster ambush skill', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') }, // brawler has PER 6
    monsters: { ambusher: makeMonster('shambler') },
    log: []
  };

  t.deepEqual(
    find_monster_entry_skills(battle).ambush,
    ['ambusher'],
    'ambusher monsters correctly identified'
  );

  battle.heroes.hero.vars.attackDice = [1,5]; // will succeed
  battle = apply_ambush_result(battle, {heroId: 'hero', monsterId: 'ambusher'});
  t.ok( lastLogHasStr(battle, 'avoid'), 'log tells story of success in avoiding ambush');
  t.ok( !battle.heroes.hero.states.stunned, 'hero wasnt stunned' );

  battle.heroes.hero.vars.attackDice = [3,4]; // will fail
  battle = apply_ambush_result(battle, {heroId: 'hero', monsterId: 'ambusher'});
  t.ok( lastLogHasStr(battle, 'stun'), 'log tells you are now stunned');
  t.ok( battle.heroes.hero.states.stunned, 'hero was stunned' );

  t.end();

});
