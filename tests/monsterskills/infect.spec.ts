import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_wounds_to_hero } from '../../src/apply/apply_wounds_to_hero';

test('monster infect skill', t => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {HP: 20})
    },
    monsters: {
      infecter: makeMonster('megaRat'),
      noninfecter: makeMonster('manAtArms')
    },
    log: []
  };

  battle = apply_wounds_to_hero(battle, {
    heroId: 'hero',
    monsterId: 'infecter',
    wounds: {value: 0, history: []}
  });
  t.ok(!battle.heroes.hero.states.infected, 'No infection caused if there was no damage');

  battle = apply_wounds_to_hero(battle, {
    heroId: 'hero',
    monsterId: 'noninfecter',
    wounds: {value: 4, history: []}
  });
  t.ok(!battle.heroes.hero.states.infected, 'no infection if monster doesnt have infect');

  battle = apply_wounds_to_hero(battle, {
    heroId: 'hero',
    monsterId: 'infecter',
    wounds: {value: 4, history: []}
  });
  t.ok(battle.heroes.hero.states.infected, 'if infecter did dmg then hero gets infected');
  t.ok(lastLogHasStr(battle, 'infected'), 'infection message added to log');

  battle = apply_wounds_to_hero(battle, {
    heroId: 'hero',
    monsterId: 'infecter',
    wounds: {value: 4, history: []}
  });
  t.ok(!lastLogHasStr(battle, 'infected'), 'no extra infection msg when hero was already infected');

  t.end();
});
