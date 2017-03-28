import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { apply_damage_to_hero } from '../../src/apply/apply_damage_to_hero';

test('apply damage to hero', t => {
  const battle: BattleState = {
    heroes: {
      hero: {
        blueprint: 'bloodsportBrawler',
        vars: { HP: 7 },
        states: {}
      }
    },
    monsters: {
      infecter: {
        blueprint: 'megaRat',
        vars: {},
        states: {}
      },
      noninfecter: {
        blueprint: 'manAtArms',
        vars: {},
        states: {}
      }
    }
  };

  t.plan(3);

  const result = apply_damage_to_hero(battle, {
    heroId: 'hero',
    monsterId: 'infecter',
    heroDMG: {value: 0, history: []}
  });
  t.ok(!result.heroes.hero.states.infected, 'No infection caused if there was no damage');

  const result2 = apply_damage_to_hero(result, {
    heroId: 'hero',
    monsterId: 'noninfecter',
    heroDMG: {value: 4, history: []}
  });
  t.ok(!result2.heroes.hero.states.infected, 'no infection if monster doesnt have infect');

  const result3 = apply_damage_to_hero(result, {
    heroId: 'hero',
    monsterId: 'infecter',
    heroDMG: {value: 4, history: []}
  });
  t.ok(result3.heroes.hero.states.infected, 'if infecter did dmg then hero gets infected');
});
