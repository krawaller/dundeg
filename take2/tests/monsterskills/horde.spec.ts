import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/library';
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack';

test('horde monster skill', t => {
  const battle: BattleState = {
    heroes: {},
    monsters: {
      nacht: {
        blueprint: 'nachtDrekSlicer', // has horde(weird)
        vars: {},
        states: {}
      },
      rat: {
        blueprint: 'ratThing', // has weird
        vars: {},
        states: {}
      },
      slither: {
        blueprint: 'slitherFish', // no weird
        vars: {},
        states: {}
      }
    }
  };

  t.plan(3);

  const res1 = calculate_monster_attack(battle, {monsterId: 'nacht'});
  t.equal(res1.value, monsters.nachtDrekSlicer.stats.ATK + 1, 'got 1 extra since ratThing is weird');

  battle.monsters.rat.vars.killedBy = 'foo';

  const res2 = calculate_monster_attack(battle, {monsterId: 'nacht'});
  t.equal(res2.value, monsters.nachtDrekSlicer.stats.ATK, 'no extra for dead monster');

  delete battle.monsters.rat;

  const res3 = calculate_monster_attack(battle, {monsterId: 'nacht'});
  t.equal(res3.value, monsters.nachtDrekSlicer.stats.ATK, 'no extra when no other weirdo');

});

