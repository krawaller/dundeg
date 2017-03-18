import * as test from "tape";

import { World } from '../../src/world';

import { bloodbrawl, Hero } from '../../src/hero';

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

test("Hero responds to stance question", t=> {
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