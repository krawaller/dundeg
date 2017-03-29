import * as test from "tape";
import { makeMonster, makeHero, calcRes } from '../testutils';

import { BattleState, Attack } from '../../src/interfaces';
import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';

test('the rage hero skill', t => {
  const battle: BattleState = {
    heroes: {
      rager: makeHero('bloodsportBrawler',{stance:'assault'},{},{rage: true}),
      defendingRager: makeHero('bloodsportBrawler',{stance:'defence'},{},{rage: true}),
    },
    monsters: {
      monster: makeMonster('slitherFish')
    }
  };

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'rager',
      heroATK: calcRes(6),
      monsterARM: calcRes(4),
      attack: <Attack>{stat: 'STR', using: 'nastyCleaver', type: 'meelee'}
    }).value,
    3,
    'rage gives 1 additional damage in assault'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'rager',
      heroATK: calcRes(6),
      monsterARM: calcRes(4),
      attack: <Attack>{stat: 'AGI', using:'nastyCleaver', type: 'meelee'}
    }).value,
    2,
    'rage has no effect when attack isnt using STR'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'rager',
      heroATK: calcRes(4),
      monsterARM: calcRes(4),
      attack: <Attack>{stat: 'STR', using:'nastyCleaver', type: 'meelee'}
    }).value,
    0,
    'rage has no effect when no damage was done'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroId: 'defendingRager',
      heroATK: calcRes(6),
      monsterARM: calcRes(4),
      attack: <Attack>{stat: 'STR', using:'nastyCleaver', type: 'meelee'}
    }).value,
    2,
    'rage has no effect when not in assault mode'
  );

  t.end();
});
