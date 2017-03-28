import * as test from "tape";
import { makeMonster, makeHero } from '../testutils';
import { BattleState, Attack } from '../../src/interfaces';
import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';

test('the Exterminator hero skill', t => {
  const battle: BattleState = {
    heroes: {
      rager: makeHero('bloodsportBrawler',{stance:'assault'},{},{rage: true}),
      defendingRager: makeHero('bloodsportBrawler',{stance:'defence'},{},{rage: true}),
    },
    monsters: {
      monster: makeMonster('slitherFish')
    }
  };

  t.plan(4);

  const input1 = {
    monsterId: 'monster',
    heroId: 'rager',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]},
    attack: <Attack>{stat: 'STR', using: 'nastyCleaver', type: 'meelee'}
  }
  const result1 = calculate_damage_vs_monster(battle, input1);
  t.equal(result1.value, 3, 'rage gives 1 additional damage in assault');

  const input2 = {
    monsterId: 'monster',
    heroId: 'rager',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]},
    attack: <Attack>{stat: 'AGI', using:'nastyCleaver', type: 'meelee'}
  }
  const result2 = calculate_damage_vs_monster(battle, input2);
  t.equal(result2.value, 2, 'rage has no effect when attack isnt using STR');

  const input3 = {
    monsterId: 'monster',
    heroId: 'rager',
    heroATK: {value: 4, history:[]},
    monsterARM: {value: 4, history:[]},
    attack: <Attack>{stat: 'STR', using:'nastyCleaver', type: 'meelee'}
  }
  const result3 = calculate_damage_vs_monster(battle, input3);

  t.equal(result3.value, 0, 'rage has no effect when no damage was done');

  const input4 = {
    monsterId: 'monster',
    heroId: 'defendingRager',
    heroATK: {value: 6, history:[]},
    monsterARM: {value: 4, history:[]},
    attack: <Attack>{stat: 'STR', using:'nastyCleaver', type: 'meelee'}
  }
  const result4 = calculate_damage_vs_monster(battle, input4);

  t.equal(result4.value, 2, 'rage has no effect when not in assault mode');
});
