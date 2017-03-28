import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';

import { monsters } from '../../src/library';

import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';



test('the Exterminator hero skill', t => {
  const battle: BattleState = {
    heroes: {
      exterminator: makeHero('bloodsportBrawler',{stance: 'assault'},{},{exterminator:true}),
      defendingExterminator: makeHero('bloodsportBrawler',{stance: 'defence'},{},{exterminator:true}),
    },
    monsters: {
      vermin: makeMonster('slitherFish'),
      nonvermin: makeMonster('manAtArms')
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
