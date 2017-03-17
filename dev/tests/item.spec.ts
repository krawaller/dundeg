import * as test from "tape";

import { World } from '../../src/world';
import { slitherFish, Monster } from '../../src/monsters';
import { bloodbrawl, Hero } from '../../src/hero';
import { SkinningKnife } from '../../src/items';

test("The Skinning Knife", t=> {
  let world = new World();
  let troll = new Monster(slitherFish);
  world.addEntity(troll);
  let hero = new Hero(bloodbrawl);
  world.addEntity(hero);
  let knife = new SkinningKnife();
  world.addEntity(knife, hero);
  
  world.sendEvent('calculate_monster_stat', {
    type: 'build',
    stat: 'ARM',
    start: 0,
    monster: troll,
    using: knife,
    hero: hero
  }).then(result => {
    t.equal(result.value, slitherFish.stats.ARM - 1);
    t.end();
  });
});
