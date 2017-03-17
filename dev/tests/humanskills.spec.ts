import * as test from "tape";

import { World } from '../../src/world';
import { bloodbrawl, Hero } from '../../src/hero';
import { SixthSense } from '../../src/humanskills';

test("The SixthSense skill", t => {
  let world = new World();
  let hero = new Hero(bloodbrawl);
  let hero2 = new Hero(bloodbrawl);
  let hero3 = new Hero(bloodbrawl);
  hero.state.battleId = hero2.state.battleId = 'SOMEBATTLE';
  let sense = new SixthSense();
  world.addEntity(hero);
  world.addEntity(sense, hero);
  world.addEntity(hero2);
  world.addEntity(hero3);

  t.plan(5);
  world.sendEvent("calculate_hero_stat", {
    type: 'build',
    testAgainst: 'ambush',
    stat: 'PER',
    hero: hero
  }).then(result => {
    t.equal(result.value, 666, "Sixth Sense makes hero immune to ambush");
  });
  world.sendEvent("calculate_hero_stat", {
    type: 'build',
    stat: 'PER',
    hero: hero
  }).then(result => {
    t.equal(result.value, bloodbrawl.stats.PER, "Sixth Sense doesnt help if not VS ambush");
  });
  world.sendEvent("calculate_hero_stat", {
    type: 'build',
    stat: 'PER',
    testAgainst: 'ambush',
    hero: hero2
  }).then(result => {
    t.equal(result.value, bloodbrawl.stats.PER + 1, "Friend with Sixth Sense adds +1");
  });
  world.sendEvent("calculate_hero_stat", {
    type: 'build',
    stat: 'PER',
    hero: hero2
  }).then(result => {
    t.equal(result.value, bloodbrawl.stats.PER, "Friend with Sixth Sense doesnt help if not against ambush");
  });
  world.sendEvent("calculate_hero_stat", {
    type: 'build',
    stat: 'PER',
    hero: hero3
  }).then(result => {
    t.equal(result.value, bloodbrawl.stats.PER, "Friend with Sixth Sense doesnt help if not in same battle");
  });
});