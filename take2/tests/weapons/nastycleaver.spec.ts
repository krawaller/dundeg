import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';

import { BattleState, Attack } from '../../src/interfaces';
import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';
import { find_hero_attack_options } from '../../src/find/find_hero_attack_options';

test('Nasty Cleaver', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{stance:'assault',powerDie:6},{},{},['nastyCleaver']),
    },
    monsters: {
      monster: makeMonster('manAtArms')
    }
  };

  t.deepEqual(
    find_hero_attack_options(battle, {heroId: 'hero'}).nastyCleaver,
    <Attack>{ using: 'nastyCleaver', type: 'meelee', stat: 'STR' },
    'nasty cleaver offers STR attack'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]},
      attack: {using: 'nastyCleaver', stat: 'STR', type: 'meelee'}
    }).value,
    3,
    'nasty cleaver gives +1 damage when power die is 6'
  );

  battle.heroes.hero.vars.powerDie = 4;
  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]},
      attack: {using: 'nastyCleaver', stat: 'STR', type: 'meelee'}
    }).value,
    2,
    'nasty cleaver has no effect when power die isnt 6'
  );

  battle.heroes.hero.vars.powerDie = 6;
  battle.heroes.hero.vars.stance = 'defence';
  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]},
      attack: {using: 'nastyCleaver', stat: 'STR', type: 'meelee'}
    }).value,
    2,
    'nasty cleaver has no effect when not assaulting'
  );

  t.end();
});
