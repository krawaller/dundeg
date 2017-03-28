import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_damage_to_hero } from '../../src/apply/apply_damage_to_hero';

test('apply damage to hero', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {HP: 20})
    },
    monsters: {
      infecter: makeMonster('megaRat'),
      noninfecter: makeMonster('manAtArms')
    },
    log: []
  };

  t.plan(5);

  let result = apply_damage_to_hero(battle, {
    heroId: 'hero',
    monsterId: 'infecter',
    heroDMG: {value: 0, history: []}
  });
  t.ok(!result.heroes.hero.states.infected, 'No infection caused if there was no damage');

  result = apply_damage_to_hero(result, {
    heroId: 'hero',
    monsterId: 'noninfecter',
    heroDMG: {value: 4, history: []}
  });
  t.ok(!result.heroes.hero.states.infected, 'no infection if monster doesnt have infect');

  result = apply_damage_to_hero(result, {
    heroId: 'hero',
    monsterId: 'infecter',
    heroDMG: {value: 4, history: []}
  });
  t.ok(result.heroes.hero.states.infected, 'if infecter did dmg then hero gets infected');
  t.ok(lastLogHasStr(result, 'infected'), 'infection message added to log');

  result = apply_damage_to_hero(result, {
    heroId: 'hero',
    monsterId: 'infecter',
    heroDMG: {value: 4, history: []}
  });
  t.ok(!lastLogHasStr(result, 'infected'), 'no extra infection msg when hero was already infected');
});
