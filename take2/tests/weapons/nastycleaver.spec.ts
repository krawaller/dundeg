import * as test from "tape";

import { BattleState, Attack } from '../../src/interfaces';
import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';
import { find_hero_attack_options } from '../../src/find/find_hero_attack_options';

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

  t.deepEqual(
    find_hero_attack_options(battle, {heroId: 'assaultingStrongWielder'}).nastyCleaver,
    <Attack>{ using: 'nastyCleaver', type: 'meelee', stat: 'STR' },
    'nasty cleaver offers STR attack'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'assaultingStrongWielder',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]},
      using: 'nastyCleaver'
    }).value,
    3,
    'nasty cleaver gives +1 damage when power die is 6'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'assaultingWeakWielder',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]},
      using: 'nastyCleaver',
    }).value,
    2,
    'nasty cleaver has no effect when power die isnt 6'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'defendingWielder',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]},
      using: 'nastyCleaver'
    }).value,
    2,
    'nasty cleaver has no effect when not assaulting'
  );

  t.end();
});
