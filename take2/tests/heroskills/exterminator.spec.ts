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

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'vermin',
      heroId: 'exterminator',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]}
    }).value,
    3,
    'exterminator gives 1 additional damage vs vermin'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'vermin',
      heroId: 'exterminator',
      heroATK: {value: 4, history:[]},
      monsterARM: {value: 4, history:[]}
    }).value,
    0,
    'exterminator has no effect if didnt do damage'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'nonvermin',
      heroId: 'exterminator',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]}
    }).value,
    2,
    'exterminator has no effect against non-vermin'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'vermin',
      heroId: 'defendingExterminator',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]}
    }).value,
    2,
    'defending exterminator has no effect'
  );

  t.end();
});
