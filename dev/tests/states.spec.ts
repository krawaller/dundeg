import * as test from "tape";

import { World } from '../../src/world';
import { slitherFish, Monster } from '../../src/monsters';
import { bloodbrawl, Hero } from '../../src/hero';
import { Exalted, Corroded, Dazed } from '../../src/states';
import { SkinningKnife } from '../../src/items';

test("Dazed state", t => {
  let world = new World();
  let fish = new Monster(slitherFish);
  fish.state.battleId = 'THISBATTLE';
  let dazed = new Dazed();
  world.addEntity(fish);
  world.addEntity(dazed, fish);

  world.sendEvent('calculate_monster_stat', {
    type: 'build',
    stat: 'ATK',
    monster: fish
  }).then(result => {
    t.equal(result.value, Math.floor(slitherFish.stats.ATK/2), 'dazed halves attack rounding down');
  }).then(()=> {
    world.sendEvent('battle_round_end',{
      type: 'collect',
      battleId: 'WRONGBATTLE'
    }).then(()=>{
      t.ok(world.exists(dazed), 'Dazed isnt removed by roundend in other battle');
    }).then(()=>{
      world.sendEvent('battle_round_end',{
        type: 'collect',
        battleId: 'THISBATTLE'
      }).then(()=>{
        t.ok(!world.exists(dazed), 'Dazed was removed by round end');
        t.end();
      });
    });
  });
});

test("Exalted increases magic", t => {
  let world = new World();
  let hero = new Hero(bloodbrawl);
  world.addEntity(hero);
  let exalted = new Exalted();
  world.addEntity(exalted, hero);
  world.sendEvent('calculate_hero_stat', {
    type: 'build',
    start: 0,
    hero: hero,
    stat: 'MAG'
  }).then(result => {
    t.equal(result.value, bloodbrawl.stats.MAG + 1);
    t.end();
  });
});

test("Corroded makes armour be 0 and overrides other modifiers", t => {
  let world = new World();
  let troll = new Monster(slitherFish);
  world.addEntity(troll);
  let hero = new Hero(bloodbrawl);
  world.addEntity(hero);
  let knife = new SkinningKnife();
  world.addEntity(knife, hero);
  let corroded = new Corroded();
  world.addEntity(corroded, troll);
  world.sendEvent('calculate_monster_stat', {
    type: 'build',
    stat: 'ARM',
    start: 0,
    monster: troll,
    hero: hero
  }).then(result => {
    t.equal(result.value, 0, 'armour is corroded down to 0');
    t.end();
  });
});
