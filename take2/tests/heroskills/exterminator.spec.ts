import * as test from "tape";

import { BattleState } from '../../src/interfaces';

import { monsters } from '../../src/monsters';

import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';



test('the Exterminator hero skill', t => {
  const battle: BattleState = {
    heroes: {
      exterminator: {
        blueprint: 'bloodsportBrawler',
        skills: { exterminator: true },
        vars: { stance: 'assault' }
      },
      defendingExterminator: {
        blueprint: 'bloodsportBrawler',
        skills: { exterminator: true },
        vars: { stance: 'defence' }
      }
    },
    monsters: {
      vermin: {
        blueprint: 'slitherFish',
        states: {},
      },
      nonvermin: {
        blueprint: 'manAtArms',
        states: {}
      }
    }
  };

  t.plan(4);

  const input1 = {
    monsterId: 'vermin',
    heroId: 'exterminator',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]}
  }
  const result1 = calculate_damage_vs_monster(battle, input1);
  t.equal(result1.value, 3, 'exterminator gives 1 additional damage vs vermin');

  const input2 = {
    monsterId: 'vermin',
    heroId: 'exterminator',
    heroATK: {value: 4, history:[]},
    monsterARM: {value: 4, history:[]}
  }
  const result2 = calculate_damage_vs_monster(battle, input2);
  t.equal(result2.value, 0, 'exterminator has no effect if didnt do damage');

  const input3 = {
    monsterId: 'nonvermin',
    heroId: 'exterminator',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]}
  }
  const result3 = calculate_damage_vs_monster(battle, input3);

  t.equal(result3.value, 2, 'exterminator has no effect against non-vermin');

  const input4 = {
    monsterId: 'vermin',
    heroId: 'defendingExterminator',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]}
  }
  const result4 = calculate_damage_vs_monster(battle, input4);

  t.equal(result4.value, 2, 'defending exterminator has no effect');
});
