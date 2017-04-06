import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { calculate_hero_armour } from '../../src/calculate/calculate_hero_armour';

test('monster pierce skill', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{},{},{},['studdedLeather']) },
    monsters: { monster: makeMonster('imperialHuntsman') } // has Pierce(1)
  };

  t.equal(
    calculate_hero_armour(battle, {heroId: 'hero',monsterId:'monster'}).value,
    0, 'pierce negates studded leather'
  );

  t.end();
});
