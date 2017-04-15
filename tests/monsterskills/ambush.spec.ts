import * as test from "tape";
import { makeHero, makeMonster, lastLogHasStr, execUntil, reply, makeRoll } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_ambush_result } from '../../src/apply/apply_ambush_result';
import { flow_monster_entry } from '../../src/flow/flow_monster_entry';

test('monster ambush skill', t => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler'), // PER 6
      hero2: makeHero('hinterLander') // PER 9
    },
    monsters: { ambusher: makeMonster('shambler') },
    log: [],
    seed: 'ambushohno' // will roll 5 4 2 3
  };

  battle = execUntil(battle, ['flow','monsterEntry',{monsterId:'ambusher'}]);
  battle = reply(battle, makeRoll); // brawler rolls, will fail because 5+4 > 6
  t.ok( battle.heroes.hero.states.stunned, 'brawler was stunned' );
  battle = reply(battle, makeRoll); // hinterLander rolls, will succeed because 2+3 < 9
  t.ok( !battle.heroes.hero2.states.stunned, 'hinterLander was not stunned' );

  t.end();

});
