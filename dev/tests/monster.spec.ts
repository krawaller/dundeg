import * as test from "tape";

import { World } from '../../src/world';

import { bloodbrawl, hinterlander, Hero } from '../../src/hero';
import { backAlleyBruiser, Monster, manAtArms } from '../../src/monsters';

test("monster returns base stat when asked for", t => {
  let world = new World();
  let monster = new Monster(backAlleyBruiser);
  let id = world.addEntity(monster);
  t.plan(2);
  world.sendEvent('calculate_monster_stat',{
    type: 'build',
    start: 0,
    monster: monster,
    stat: 'ATK'
  }).then(result => {
    t.equal(result.value, backAlleyBruiser.stats.ATK, "bruiser ATK value added correctly");
  });
  world.sendEvent('calculate_monster_stat',{
    type: 'build',
    start: 0,
    monster: null,
    stat: 'ATK'
  }).then(result => {
    t.equal(result.value, 0, "the id was for another monster");
  });
});

/*
test("Monster correctly says target hero needs defending", t=> {
  let world = new World();
  let brawlerHero = new Hero(bloodbrawl);
  let landerHero = new Hero(hinterlander);
  let bruiserMonster = new Monster(backAlleyBruiser);
  world.addEntity(brawlerHero);
  world.addEntity(landerHero);
  world.addEntity(bruiserMonster);
  bruiserMonster.state.target = brawlerHero;
  world.sendEvent('query_hero_dice_needs', t=> {

  });
});
*/

test("Monster picks correct target", t=> {
  let world = new World();
  let brawlerHero = new Hero(bloodbrawl);
  let landerHero = new Hero(hinterlander);
  let bruiserMonster = new Monster(backAlleyBruiser); // wants lowest str (lander)
  let maaMonster = new Monster(manAtArms); // wants high agi (lander & brawler has same)
  world.addEntity(brawlerHero);
  world.addEntity(landerHero);
  world.addEntity(bruiserMonster);
  world.addEntity(maaMonster);
  t.plan(4);
  world.sendEvent('assign_monster_target',{
    monster: bruiserMonster,
    chooseFrom: [brawlerHero, landerHero]
  }).then(([result]) => {
    t.equal(bruiserMonster.state.target, landerHero, 'bruiser is now targeting the Lander');
    t.equal(result, landerHero, 'Lander was also bubbled as result');
  });
  world.sendEvent('assign_monster_target',{
    monster: maaMonster,
    chooseFrom: [brawlerHero, landerHero]
  }).then(([result]) => {
    t.equal(maaMonster.state.target, brawlerHero, 'manatarms is now targeting the Brawler');
    t.equal(result, brawlerHero, 'brawler was also bubbled as result');
  });
  setTimeout(()=> {
    world.answer(brawlerHero.id);
  }, 10);
});