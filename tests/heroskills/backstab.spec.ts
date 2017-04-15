import * as test from "tape";
import { makeMonster, makeHero, calcRes } from '../testutils';
import { monsters } from '../../src/library';
import { BattleState } from '../../src/interfaces';
import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';
import { calculate_monster_armour } from '../../src/calculate/calculate_monster_armour';

test('the backstab hero skill', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{},{},{backStab: true})
    },
    monsters: {
      monster: makeMonster('imperialHuntsman')
    }
  };

  // ------------ Test extra damage -----------------------

  battle.monsters.monster.vars.target = 'hero';
  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      attack: {stat: 'STR', type: 'meelee', using: 'nastyCleaver'},
      heroATK: calcRes(6),
      monsterARM: calcRes(4)
    }).value,
    2,
    'backstab gives no extra damage when monster is targetting us'
  );

  delete battle.monsters.monster.vars.target;
  battle.heroes.hero.vars.stance = 'defence';
  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      attack: {stat: 'STR', type: 'meelee', using: 'nastyCleaver'},
      heroATK: calcRes(6),
      monsterARM: calcRes(4)
    }).value,
    2,
    'backstab gives no extra damage when stance is defence'
  );

  battle.heroes.hero.vars.stance = 'assault';
  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      attack: {stat: 'STR', type: 'ranged', using: 'nastyCleaver'},
      heroATK: calcRes(6),
      monsterARM: calcRes(4)
    }).value,
    2,
    'backstab gives no extra damage when not meelee'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      attack: {stat: 'STR', type: 'meelee', using: 'nastyCleaver'},
      heroATK: calcRes(6),
      monsterARM: calcRes(4)
    }).value,
    3,
    'backstab gives 1 extra damage when attacking someone not targetting me with meelee'
  );

  // ------------------- Test -1 ARM ---------------------------

  battle.monsters.monster.vars.target = 'hero';
  t.equal(
    calculate_monster_armour(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      attack: {stat: 'STR', type: 'meelee', using: 'skinningKnife'},
    }).value,
    monsters.imperialHuntsman.stats.ARM,
    'backstab gives no ARM minus when monster is targetting us'
  );

  delete battle.monsters.monster.vars.target;
  battle.heroes.hero.vars.stance = 'defence';
  t.equal(
    calculate_monster_armour(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      attack: {stat: 'STR', type: 'meelee', using: 'skinningKnife'},
    }).value,
    monsters.imperialHuntsman.stats.ARM,
    'backstab gives no ARM minus when stance is defence'
  );

  battle.heroes.hero.vars.stance = 'assault';
  t.equal(
    calculate_monster_armour(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      attack: {stat: 'STR', type: 'ranged', using: 'nastyCleaver'},
    }).value,
    monsters.imperialHuntsman.stats.ARM,
    'backstab gives no ARM minus when not using bladed item'
  );

  t.equal(
    calculate_monster_armour(battle, {
      monsterId: 'monster',
      heroId: 'hero',
      attack: {stat: 'STR', type: 'meelee', using: 'skinningKnife'},
    }).value,
    monsters.imperialHuntsman.stats.ARM - 1,
    'backstab gives 1 ARM minus when attacking someone not targetting us with blade item'
  );


  t.end();
});
