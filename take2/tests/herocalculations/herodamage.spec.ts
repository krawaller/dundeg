import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { calculate_damage_vs_hero } from '../../src/calculate/calculate_damage_vs_hero';

test('calculating damage vs hero', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler')
    },
    monsters: {
      monster: makeMonster('slitherFish')
    }
  };
  const input = {
    monsterId: 'monster',
    heroId: 'hero',
    monsterATK: {value: 6, history:[]},
    heroARM: {value: 1, history:[]},
    heroDEF: {value: 2, history:[]}
  }
  const result = calculate_damage_vs_hero(battle, input);

  t.plan(1);
  t.equal(result.value, 3, 'by default it is ATK - ARM - DEF');
});
