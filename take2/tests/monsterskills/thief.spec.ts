import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { apply_damage_to_hero } from '../../src/apply/apply_damage_to_hero';

test('the thief skill', t => {
  const battle: BattleState = {
    heroes: {
      hero: {
        blueprint: 'bloodsportBrawler',
        vars: { HP: 7, gold: 7 }
      }
    },
    monsters: {
      monster: {
        blueprint: 'ratThing', // has thief
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

  t.plan(3);

  const result = apply_damage_to_hero(battle, instr);
  t.equal(result.heroes.hero.vars.HP, 7, 'dmg was NOT deducted from HP');
  t.equal(result.heroes.hero.vars.gold, 3, 'dmg was deducted from gold instead');

  const result2 = apply_damage_to_hero(result, instr);
  t.equal(result.heroes.hero.vars.gold, 0, 'gp dmg was floored at 0');
});
