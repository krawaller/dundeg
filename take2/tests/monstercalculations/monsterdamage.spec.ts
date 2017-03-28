import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';

test('calculating damage vs monster', t => {
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
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]},
    heroId: 'hero'
  }
  const result = calculate_damage_vs_monster(battle, input);

  t.plan(1);
  t.equal(result.value, 2, 'by default it is ATK - ARM');
});
