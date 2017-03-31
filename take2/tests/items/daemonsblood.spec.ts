import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';

import { BattleState, Attack } from '../../src/interfaces';
import { find_hero_actions } from '../../src/find/find_hero_actions';
import { apply_daemons_blood } from '../../src/apply/apply_daemons_blood';

// TODO - dice as state in hero since could've been rerolled?

test('Daemons blood', t => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{target: 'megarat'},{},{},['daemonsBlood'])
    },
    monsters: {
      megarat: makeMonster('megaRat',{HP:5}),
      nacht: makeMonster('nachtDrekSlicer',{HP:8})
    },
    log: []
  };

  t.ok(
    find_hero_actions(battle, {heroId: 'hero'}).daemonsBlood,
    'daemons blood offers action' // TODO - what does it look like?
  );

  battle = apply_daemons_blood(battle,{heroId:'hero',dice:5});
  t.ok(
    battle.monsters.megarat.states.corroded,
    'megarat became corroded'
  );
  t.equal(
    battle.monsters.megarat.vars.HP,
    2, 'roll of 5 means 3 since it was a D3 dice'
  );

  battle.heroes.hero.vars.target = 'nacht';
  battle = apply_daemons_blood(battle,{heroId:'hero',dice:5});
  t.equal(
    battle.monsters.nacht.vars.HP,
    3, 'roll of 5 meant 5 since he is weird, D6 now'
  );

  t.end();
});
