import * as test from "tape";

import { BattleState, Attack } from '../../src/interfaces';

import { monsters } from '../../src/monsters';

import { calc } from '../../src/calculate';



test('the Exterminator hero skill', t => {
  const battle: BattleState = {
    heroes: {
      rager: {
        blueprint: 'bloodsportBrawler',
        skills: { rage: true },
        vars: { stance: 'assault' }
      },
      defendingRager: {
        blueprint: 'bloodsportBrawler',
        skills: { rage: true },
        vars: { stance: 'defence' }
      }
    },
    monsters: {
      monster: {
        blueprint: 'slitherFish',
        states: {},
      }
    }
  };

  t.plan(4);

  const input1 = {
    monsterId: 'monster',
    heroId: 'rager',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]},
    attack: <Attack>{stat: 'STR', using:'foo', type: 'meelee'}
  }
  const result1 = calc.calc_damage_vs_monster(battle, input1);
  t.equal(result1.value, 3, 'rage gives 1 additional damage in assault');

  const input2 = {
    monsterId: 'monster',
    heroId: 'rager',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]},
    attack: <Attack>{stat: 'AGI', using:'foo', type: 'meelee'}
  }
  const result2 = calc.calc_damage_vs_monster(battle, input2);
  t.equal(result2.value, 2, 'rage has no effect when attack isnt using STR');

  const input3 = {
    monsterId: 'monster',
    heroId: 'rager',
    heroATK: {value: 4, history:[]},
    monsterARM: {value: 4, history:[]},
    attack: <Attack>{stat: 'STR', using:'foo', type: 'meelee'}
  }
  const result3 = calc.calc_damage_vs_monster(battle, input3);

  t.equal(result3.value, 0, 'rage has no effect when no damage was done');

  const input4 = {
    monsterId: 'monster',
    heroId: 'defendingRager',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]},
    attack: <Attack>{stat: 'STR', using:'foo', type: 'meelee'}
  }
  const result4 = calc.calc_damage_vs_monster(battle, input4);

  t.equal(result4.value, 2, 'rage has no effect when not in assault mode');
});
