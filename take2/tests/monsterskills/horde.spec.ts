import * as test from "tape";
import { makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/library';
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack';

test('horde monster skill', t => {
  const battle: BattleState = {
    heroes: {},
    monsters: {
      nacht: makeMonster('nachtDrekSlicer'), // Has horde(weird)
      rat: makeMonster('ratThing'), // has weird
      slither: makeMonster('slitherFish') // doesnt have weird
    }
  };

  t.equal(
    calculate_monster_attack(battle, {monsterId: 'nacht'}).value,
    monsters.nachtDrekSlicer.stats.ATK + 1,
    'got 1 extra since ratThing is weird'
  );

  battle.monsters.rat.vars.killedBy = 'foo';
  t.equal(
    calculate_monster_attack(battle, {monsterId: 'nacht'}).value,
    monsters.nachtDrekSlicer.stats.ATK,
    'no extra for dead monster'
  );

  delete battle.monsters.rat.vars.killedBy;
  battle.monsters.rat.vars.escaped = true;
  t.equal(
    calculate_monster_attack(battle, {monsterId: 'nacht'}).value,
    monsters.nachtDrekSlicer.stats.ATK,
    'no extra for escaped monster'
  );

  delete battle.monsters.rat;
  t.equal(
    calculate_monster_attack(battle, {monsterId: 'nacht'}).value,
    monsters.nachtDrekSlicer.stats.ATK,
    'no extra when no other weirdo'
  );

  t.end();

});

