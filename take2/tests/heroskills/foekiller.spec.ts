import * as test from "tape";
import { makeMonster, makeHero } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';

test('the foekiller hero skill', t => {
  const battle: BattleState = {
    heroes: {
      foekiller: makeHero('bloodsportBrawler',{stance:'assault'},{},{foeKiller: true})
    },
    monsters: {
      puny: makeMonster('slitherFish'),
      hasVal3: makeMonster('shambler')
    }
  };

  t.plan(4);

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'hasVal3',
      heroId: 'foekiller',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]}
    }).value,
    3,
    'foeKiller gives 1 additional damage against biggie in assault'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'hasVal3',
      heroId: 'foekiller',
      heroATK: {value: 4, history:[]},
      monsterARM: {value: 4, history:[]}
    }).value,
    0,
    'foeKiller has no effect when we didnt do any damage'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'puny',
      heroId: 'foekiller',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]},
    }).value,
    2,
    'no extra against puny enemy'
  );

  battle.heroes.foekiller.vars.stance = 'defence';

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'hasVal3',
      heroId: 'foekiller',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]}
    }).value,
    2,
    'foeKiller has no effect when not in assault mode'
  );

});
