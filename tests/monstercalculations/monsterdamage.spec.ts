import * as test from "tape";
import { makeMonster, makeHero } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';

test('calculating damage vs monster', t => {
  const battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: { monster: makeMonster('slitherFish') }
  };

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]},
      heroId: 'hero'
    }).value,
    2,
    'by default it is ATK - ARM'
  );

  t.end();
});
