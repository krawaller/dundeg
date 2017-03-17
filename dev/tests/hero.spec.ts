import * as test from "tape";

import { World } from '../../src/world';

import { bloodbrawl, Hero } from '../../src/hero';

test("Hero returns base stat when asked for", t => {
  let world = new World();
  let hero = new Hero(bloodbrawl);
  let id = world.addEntity(hero);
  world.sendEvent('calculate_hero_stat',{
    type: 'build',
    start: 0,
    hero: hero,
    stat: 'CON'
  }).then(result => {
    t.equal(result.value, bloodbrawl.stats.CON);
    t.end();
  });
});

test("Hero doesn't act for wrong ID", t => {
  let world = new World();
  let hero = new Hero(bloodbrawl);
  let id = world.addEntity(hero);
  world.sendEvent('calculate_hero_stat',{
    type: 'build',
    start: 0,
    hero: null,
    stat: 'CON'
  }).then(result => {
    t.equal(result.value, 0, "the id was for another hero");
    t.end();
  });
});