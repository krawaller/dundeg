import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { apply_damage_to_hero } from '../../src/apply/apply_damage_to_hero';

test('the drain monster skill', t => {
  const battle: BattleState = {
    heroes: {
      hero: {
        blueprint: 'bloodsportBrawler',
        vars: { HP: 3 }
      }
    },
    monsters: {
      drainer: {
        blueprint: 'ghoulTroll', // has drain
        vars: { drained: 2 },
        states: {}
      }
    }
  };
  const instr = {
    heroId: 'hero',
    monsterId: 'drainer',
    heroDMG: {value: 4, history: []}
  }

  t.plan(1);

  const result = apply_damage_to_hero(battle, instr);
  t.equal(result.monsters.drainer.vars.drained, 5, 'the 3 dealt dmg was added to drained');

});
