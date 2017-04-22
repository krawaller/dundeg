import * as test from "tape";
import { logHasStr, makeHero, makeMonster , execUntil} from '../testutils';

import { BattleState } from '../../src/interfaces';

test('monster infect skill', t => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {HP: 200})
    },
    monsters: {
      infecter: makeMonster('megaRat',{target:'hero'}) // has infect, ATK = 5
    }
  };

  battle.heroes.hero.vars.defenceDice = [1,5]; // will block all dmg since DEF 5 >= ATK 5
  battle = execUntil(battle, ['flow','performMonsterAttack',{monsterId:'infecter'}]);
  t.ok(!battle.heroes.hero.states.infected, 'No infection caused if there was no damage');

  battle.heroes.hero.vars.defenceDice = [1,1]; // will take dmg since DEF 1 < ATK 5
  battle = execUntil(battle, ['flow','performMonsterAttack',{monsterId:'infecter'}]);
  t.ok(battle.heroes.hero.states.infected, 'if infecter did dmg then hero gets infected');
  t.ok(logHasStr(battle, 'infected'), 'infection message added to log');

  t.end();
});
