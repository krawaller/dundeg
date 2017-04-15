import * as test from "tape";
import { makeHero, makeMonster, calcRes } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { calculate_damage_vs_hero } from '../../src/calculate/calculate_damage_vs_hero';

test('calculating damage vs hero', t => {
  const battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: { monster: makeMonster('slitherFish') }
  };

  t.equal(
    calculate_damage_vs_hero(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      monsterATK: calcRes(6),
      heroARM: calcRes(1),
      heroDEF: calcRes(2)
    }).value,
    3,
    'by default it is ATK - ARM - DEF'
  )

  t.end();
});
