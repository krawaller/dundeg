import * as test from "tape";

import { BattleState } from '../../src/interfaces';

import { monsters } from '../../src/monsters';

import { calc } from '../../src/modes';

test('calculating monster armour', t => {
  const battle: BattleState = {
    heroes: {},
    monsters: {
      id1: {
        blueprint: 'slitherFish',
        vars: {},
        states: {}
      }
    }
  };

  t.plan(1);

  const res1 = calc.calc_monster_armour(battle, {id: 'id1'});
  t.equal(res1.value, monsters.slitherFish.stats.ARM, 'just normal base armour value');

});


test('calculating monster attack', t => {
  const battle: BattleState = {
    heroes: {},
    monsters: {
      id1: {
        blueprint: 'slitherFish',
        vars: {},
        states: {}
      }
    }
  };

  t.plan(1);

  const res1 = calc.calc_monster_attack(battle, {id: 'id1'});
  t.equal(res1.value, monsters.slitherFish.stats.ATK, 'just normal base attack value');

});