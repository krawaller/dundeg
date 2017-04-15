import * as test from "tape";
import { makeHero, makeMonster, execUntil, reply, makeRoll } from '../testutils';

import { BattleState, Attack, FlowInstruction } from '../../src/interfaces';
import { find_hero_actions } from '../../src/find/find_hero_actions';
import { apply_daemons_blood } from '../../src/apply/apply_daemons_blood';

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

  let action: FlowInstruction = ['flow','daemonsBlood',{heroId:'hero'}];

  t.deepEqual(
    find_hero_actions(battle, {heroId: 'hero'}).daemonsBlood,
    action,
    'daemons blood offers action'
  );

  battle.seed = '5plsplspls!' // will roll 5;
  battle = execUntil(battle, action); // will now ask for target
  battle = reply(battle, 'megaRat');
  battle = reply(battle, makeRoll); // roll the die, no confirmation required since we have no luck
  t.ok(
    battle.monsters.megarat.states.corroded,
    'megarat became corroded'
  );
  t.equal(
    battle.monsters.megarat.vars.HP,
    2, 'roll of 5 means 3 since it was a D3 dice'
  );
  t.ok(
    !battle.heroes.hero.items.daemonsBlood,
    'hero lost the daemons blood'
  );

  battle.seed = 'another5thanku' // will roll 5 again
  battle = execUntil(battle, action); // will now ask for target
  battle = reply(battle, 'nachtDrekSlicer');
  battle = reply(battle, makeRoll); // roll the die, no confirmation required since we have no luck
  t.equal(
    battle.monsters.nacht.vars.HP,
    3, 'roll of 5 meant 5 since he is weird, D6 now'
  );

  t.end();
});
