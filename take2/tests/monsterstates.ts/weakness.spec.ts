import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/monsters';
import { calc } from '../../src/calculate';

test('the Weakness state caused by Find Weakness skill', t => {
  const battle: BattleState = {
    heroes: {
      hero: {
        blueprint: 'bloodsportBrawler',
        skills: {}, vars: {}, items: {}
      }
    },
    monsters: {
      weakness: {
        blueprint: 'slitherFish',
        vars: {},
        states: {weakness: true}
      }
    }
  };

  t.plan(2);

  const input1 = {
    monsterId: 'weakness',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]},
    heroId: 'hero'
  }
  const result1 = calc.calc_damage_vs_monster(battle, input1);

  t.equal(result1.value, 3, 'weakness gives 1 additional damage');

  const input2 = {
    monsterId: 'weakness',
    heroATK: {value: 4, history:[]},
    monsterARM: {value: 4, history:[]},
    heroId: 'hero'
  }
  const result2 = calc.calc_damage_vs_monster(battle, input2);

  t.equal(result2.value, 0, 'weakness has no effect if didnt do damage');

});
