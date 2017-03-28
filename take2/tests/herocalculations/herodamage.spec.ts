import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { calculate_damage_vs_hero } from '../../src/calculate/calculate_damage_vs_hero';

test('calculating damage vs hero', t => {
  const battle: BattleState = {
    heroes: {
      hero: {
        blueprint: 'bloodsportBrawler',
        skills: {}, items: {}, vars: {}
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
