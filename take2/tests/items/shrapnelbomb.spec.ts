import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { calculate_monster_armour } from '../../src/calculate/calculate_monster_armour';
import { find_hero_actions } from '../../src/find/find_hero_actions';
import { monsters } from '../../src/library';

test('shrapnel bomb item', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{},{},{},['shrapnelBomb']) },
    monsters: { monster: makeMonster('slitherFish') }
  };

  battle.heroes.hero.vars.stance = 'defence';
  t.ok(
    find_hero_actions(battle,{heroId:'hero'}).shrapnelBomb,
    'shrapnel bomb is available as action'
  );

  battle.heroes.hero.vars.attackDice = [1,1];
  t.equal(
    calculate_monster_armour(battle, {monsterId: 'monster', using: 'shrapnelBomb', heroId: 'hero'}).value,
    monsters.slitherFish.stats.ARM, 'shrapnel bomb has no piercing by default'
  );

  battle.heroes.hero.vars.attackDice = [6,1];
  t.equal(
    calculate_monster_armour(battle, {monsterId: 'monster', using: 'shrapnelBomb', heroId: 'hero'}).value,
    0, 'shrapnel bomb has piercing when die was 6'
  );

  t.end();
});

// TODO - in progress
