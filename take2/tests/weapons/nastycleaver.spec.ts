import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';
import { find_hero_attack_options } from '../../src/utils/find_hero_attack_options';

test('Nasty Cleaver', t => {
  const battle: BattleState = {
    heroes: {
      assaultingStrongWielder: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'assault', POW: 6 },
        states: {}, skills: {},
        items: { nastyCleaver: 1 }
      },
      assaultingWeakWielder: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'assault', POW: 5 },
        states: {}, skills: {},
        items: { nastyCleaver: 1 }
      },
      defendingWielder: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'defence', POW: 6 },
        states: {}, skills: {},
        items: { nastyCleaver: 1 }
      }
    },
    monsters: {
      monster: { blueprint: 'manAtArms', states: {}, vars: {} }
    }
  };

  t.plan(4);

  const attacks = find_hero_attack_options(battle, {heroId: 'assaultingStrongWielder'});
  t.deepEqual(attacks.nastyCleaver, {
    using: 'nastyCleaver',
    type: 'meelee',
    stat: 'STR'
  }, 'nasty cleaver offers STR attack');


  const input1 = {
    monsterId: 'monster',
    heroId: 'assaultingStrongWielder',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]},
    using: 'nastyCleaver'
  }
  const result1 = calculate_damage_vs_monster(battle, input1);
  t.equal(result1.value, 3, 'nasty cleaver gives +1 damage when power die is 6');

  const input2 = {
    monsterId: 'monster',
    heroId: 'assaultingWeakWielder',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]},
    using: 'nastyCleaver',
  }
  const result2 = calculate_damage_vs_monster(battle, input2);
  t.equal(result2.value, 2, 'nasty cleaver has no effect when power die isnt 6');

  const input3 = {
    monsterId: 'monster',
    heroId: 'defendingWielder',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]},
    using: 'nastyCleaver'
  }
  const result3 = calculate_damage_vs_monster(battle, input3);
  t.equal(result3.value, 2, 'nasty cleaver has no effect when not assaulting');
});
