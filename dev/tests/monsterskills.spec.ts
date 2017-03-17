import * as test from "tape";

import { World } from '../../src/world';
import { slitherFish, backAlleyBruiser, Monster } from '../../src/monsters';
import { bloodbrawl, Hero } from '../../src/hero';
import { Fierce, Horde } from '../../src/monsterskills';

test("Horde does its thing", t => {
  let world = new World();
  let fish = new Monster(slitherFish);
  let fish2 = new Monster(slitherFish);
  let bandit = new Monster(backAlleyBruiser);
  let absentBandit = new Monster(backAlleyBruiser);
  let hordeFishoid = new Horde('fishoid');
  let hordeBandit = new Horde('bogus');
  world.addEntity(fish);
  world.addEntity(hordeFishoid, fish);
  world.addEntity(fish2);
  world.addEntity(bandit);
  world.addEntity(hordeBandit, bandit);
  world.addEntity(absentBandit);
  fish.state.battleId = 'THISBATTLE';
  fish2.state.battleId = 'THISBATTLE';
  bandit.state.battleId = 'THISBATTLE';
  absentBandit.state.battleId = 'anotherbattleentirely';

  t.plan(2);
  world.sendEvent('calculate_monster_stat', {
    type: 'build',
    stat: 'ATK',
    monster: fish
  }).then(result => {
    t.equal(result.value, slitherFish.stats.ATK + 1, 'horde increased ATK when other fish nearby');
  });
  world.sendEvent('calculate_monster_stat', {
    type: 'build',
    stat: 'ATK',
    monster: bandit
  }).then(result => {
    t.equal(result.value, backAlleyBruiser.stats.ATK, 'horde doesnt increase because of monsters in other battles');
  })
});

test("Fierce increases attack versus defending heroes", t => {
  let world = new World();
  let monster = new Monster(slitherFish);
  let anotherMonster = new Monster(slitherFish);
  world.addEntity(monster);
  world.addEntity(anotherMonster);
  let defendingHero = new Hero(bloodbrawl);
  world.addEntity(defendingHero);
  defendingHero.state.stance = 'defence';
  let attackingHero = new Hero(bloodbrawl);
  world.addEntity(attackingHero);
  let fierce = new Fierce();
  world.addEntity(fierce, monster);

  t.plan(4);
  world.sendEvent('calculate_monster_stat', {
    type: 'build',
    stat: 'ATK',
    start: 0,
    monster: monster,
    hero: defendingHero
  }).then(result => {
    t.equal(result.value, slitherFish.stats.ATK + 2, 'fierce increased attack vs defending heroes');
  });
  world.sendEvent('calculate_monster_stat', {
    type: 'build',
    stat: 'ATK',
    start: 0,
    monster: monster,
    hero: attackingHero
  }).then(result => {
    t.equal(result.value, slitherFish.stats.ATK, 'fierce has no effect versus non-defending heroes');
  });
  world.sendEvent('calculate_monster_stat', {
    type: 'build',
    stat: 'ATK',
    start: 0,
    monster: anotherMonster,
    hero: defendingHero
  }).then(result => {
    t.equal(result.value, slitherFish.stats.ATK, 'fierce only triggers for the monster it is attached to');
  });
  world.sendEvent('calculate_monster_stat', {
    type: 'build',
    stat: 'ARM',
    start: 0,
    monster: monster,
    hero: defendingHero
  }).then(result => {
    t.equal(result.value, slitherFish.stats.ARM, 'fierce has no effect for other stats');
  });
});
