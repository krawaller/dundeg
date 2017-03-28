import * as test from "tape";
import { makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/library';
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack';

test('horde monster skill', t => {
  const battle: BattleState = {
    heroes: {},
    monsters: {
      nacht: makeMonster('nachtDrekSlicer'),
      rat: makeMonster('ratThing'),
      slither: makeMonster('slitherFish')
    }
  };

  t.plan(4);

  let res1 = calculate_monster_attack(battle, {monsterId: 'nacht'});
  t.equal(res1.value, monsters.nachtDrekSlicer.stats.ATK + 1, 'got 1 extra since ratThing is weird');

  battle.monsters.rat.vars.killedBy = 'foo';

  const res2 = calculate_monster_attack(battle, {monsterId: 'nacht'});
  t.equal(res2.value, monsters.nachtDrekSlicer.stats.ATK, 'no extra for dead monster');

  delete battle.monsters.rat.vars.killedBy;
  battle.monsters.rat.vars.escaped = true;

  const res3 = calculate_monster_attack(battle, {monsterId: 'nacht'});
  t.equal(res3.value, monsters.nachtDrekSlicer.stats.ATK, 'no extra for escaped monster');

  delete battle.monsters.rat;

  const res4 = calculate_monster_attack(battle, {monsterId: 'nacht'});
  t.equal(res4.value, monsters.nachtDrekSlicer.stats.ATK, 'no extra when no other weirdo');

});

