import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { apply_damage_to_hero } from '../../src/apply/apply_damage_to_hero';

test('apply damage to hero', t => {
  const battle: BattleState = {
    heroes: {
      hero: {
        blueprint: 'bloodsportBrawler',
        vars: { HP: 7 }
      }
    },
    monsters: {
      monster: {
        blueprint: 'slitherFish',
        vars: {},
        states: {}
      }
    }
  };
  const instr = {
    heroId: 'hero',
    monsterId: 'monster',
    heroDMG: {value: 4, history: []}
  }

  t.plan(2);

  const result = apply_damage_to_hero(battle, instr);
  t.equal(result.heroes.hero.vars.HP, 3, 'dmg was deducted from HP');

  const result2 = apply_damage_to_hero(result, instr);
  t.equal(result2.heroes.hero.vars.HP, 0, 'HP was floored at 0');
});
