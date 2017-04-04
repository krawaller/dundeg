import * as test from "tape";
import { makeHero, makeMonster, lastLogHasStr } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_ambush_result } from '../../src/apply/apply_ambush_result';
import { flow_monster_entry } from '../../src/flow/flow_monster_entry';

test('monster ambush skill', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: { ambusher: makeMonster('shambler') },
    log: []
  };

  battle = apply_ambush_result(battle, {heroId: 'hero', monsterId: 'ambusher', avoided: true});
  t.ok( lastLogHasStr(battle, 'avoid'), 'log tells story of success in avoiding ambush');
  t.ok( !battle.heroes.hero.states.stunned, 'hero wasnt stunned' );

  battle = apply_ambush_result(battle, {heroId: 'hero', monsterId: 'ambusher'});
  t.ok( lastLogHasStr(battle, 'stun'), 'log tells you are now stunned');
  t.ok( battle.heroes.hero.states.stunned, 'hero was stunned' );

  let result = flow_monster_entry(battle, {monsterId: 'ambusher'});
  t.equal( result[0], 'eachHero', 'we got an ambushtest for each hero' );

  t.end();

});
