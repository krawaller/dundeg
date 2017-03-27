import * as test from "tape";

import { World } from '../../src/world';

import { bloodbrawl, Hero } from '../../src/hero';
import { backAlleyBruiser, Monster, manAtArms } from '../../src/monsters';

test("Hero chooses correct target", t => {
  let world = new World();
  let hero = new Hero(bloodbrawl);
  let anotherHero = new Hero(bloodbrawl);
  let monster = new Monster(manAtArms);
  let monster2 = new Monster(manAtArms);
  world.addEntity(hero);
  world.addEntity(anotherHero);
  let monsterId = world.addEntity(monster);
  let monsterId2 = world.addEntity(monster2);
  monster.state.target = hero;
  t.plan(2);
  world.sendEvent('assign_hero_target', {
    hero: hero
  }).then(([result]) => {
    t.equal(result.id, monsterId, 'hero autochose only available monster');
  });
  world.sendEvent('assign_hero_target', {
    hero: anotherHero
  }).then(([result]) => {
    t.equal(result.id, monsterId2, 'hero chose selected monster');
  });
  setTimeout(()=> {
    world.answer(monsterId2);
  }, 10);
});

test("Hero finds correct monster targets", t => {
  let world = new World();
  let hero = new Hero(bloodbrawl);
  let anotherHero = new Hero(bloodbrawl);
  let monster = new Monster(manAtArms);
  let monster2 = new Monster(manAtArms);
  let monster3 = new Monster(manAtArms);
  world.addEntity(hero);
  world.addEntity(anotherHero);
  let monsterId = world.addEntity(monster);
  let monsterId2 = world.addEntity(monster2);
  let monsterId3 = world.addEntity(monster3);
  monster.state.target = hero;
  monster2.state.target = hero;
  t.plan(2);
  world.sendEvent('find_available_targets_for_hero', {
    type: 'build',
    start: [],
    hero: hero
  }).then(result => {
    t.deepEqual(result.value.map(m=>m.id),[monsterId,monsterId2], 'hero can only target those that target him');
  });
  world.sendEvent('find_available_targets_for_hero', {
    type: 'build',
    start: [],
    hero: anotherHero
  }).then(result => {
    t.deepEqual(result.value.map(m=>m.id),[monsterId,monsterId2,monsterId3], 'untargeted hero chooses freely');
  });
});

test("Hero returns base stat when asked for", t => {
  let world = new World();
  let hero = new Hero(bloodbrawl);
  let id = world.addEntity(hero);
  t.plan(2);
  world.sendEvent('calculate_hero_stat',{
    type: 'build',
    start: 0,
    hero: hero,
    stat: 'CON'
  }).then(result => {
    t.equal(result.value, bloodbrawl.stats.CON, "brawler value added correctly");
  });
  world.sendEvent('calculate_hero_stat',{
    type: 'build',
    start: 0,
    hero: null,
    stat: 'CON'
  }).then(result => {
    t.equal(result.value, 0, "the id was for another hero");
  });
});

test("Hero responds to stance question", t => {
  let world = new World();
  let hero = new Hero(bloodbrawl);
  let anotherHero = new Hero(bloodbrawl);
  world.addEntity(hero);
  world.addEntity(anotherHero);
  t.plan(2);
  world.sendEvent('get_hero_battle_stance',{
    hero: hero
  }).then(result => {
    t.equal(hero.state.stance, 'defend', 'Attack stance was correctly set');
  });
  world.answer('defend');
  world.sendEvent('get_hero_battle_stance',{
    hero: anotherHero
  }).then(result => {
    t.equal(anotherHero.state.stance, 'attack', 'Defence stance was correctly set');
  });
  world.answer('attack');
});
