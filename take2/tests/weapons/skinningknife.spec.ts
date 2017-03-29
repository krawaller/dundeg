import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/library';
import { calculate_monster_armour } from '../../src/calculate/calculate_monster_armour';
import { find_hero_attack_options } from '../../src/find/find_hero_attack_options';

test('skinning knife', t => {
  const battle: BattleState = {
    heroes: {
      wielder: makeHero('bloodsportBrawler',{},{},{},['skinningKnife'])
    },
    monsters: {
      nonfilth: makeMonster('manAtArms'),
      filth: makeMonster('slitherFish')
    }
  };

  t.equal(
    calculate_monster_armour(battle, {monsterId: 'nonfilth', using: 'skinningKnife'}).value,
    monsters[battle.monsters.nonfilth.blueprint].stats.ARM,
    'just normal base value since wasnt filth'
  );

  t.equal(
    calculate_monster_armour(battle, {monsterId: 'filth', using: 'skinningKnife'}).value,
    monsters[battle.monsters.filth.blueprint].stats.ARM - 1,
    'deducts 1 ARM versus filth'
  );

  t.deepEqual(
    find_hero_attack_options(battle, {heroId: 'wielder'}).skinningKnife,
    { using: 'skinningKnife', type: 'meelee', stat: 'AGI' },
    'skinning knife offers AGI attack'
  );

  t.end();
});
