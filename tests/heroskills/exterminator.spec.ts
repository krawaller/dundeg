import * as test from "tape";
import { makeHero, makeMonster, calcRes, execUntil } from '../testutils';

import { BattleState, FlowPerformHeroAttack } from '../../src/interfaces';
import { monsters } from '../../src/library';

test('the Exterminator hero skill', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{attackDice:[1,3]},{},{exterminator:true}),
    },
    monsters: {
      vermin: makeMonster('slitherFish'),
      nonvermin: makeMonster('manAtArms')
    },
    log: []
  };

  let result: BattleState;
  let heroId = 'hero';
  let attack = {type:'meelee',stat:'STR'};
  let DMG = 3; // highest attack die

  battle.heroes.hero.vars.stance = 'assault';
  battle.heroes.hero.vars.target = 'vermin';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack}]);
  t.equal(
    result.monsters.vermin.vars.HP,
    monsters.slitherFish.stats.HP - (DMG + 1 - monsters.slitherFish.stats.ARM),
    'exterminator gives 1 additional damage vs vermin'
  );

  battle.heroes.hero.vars.target = 'nonvermin';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack}]);
  t.equal(
    result.monsters.vermin.vars.HP,
    monsters.manAtArms.stats.HP - (DMG - monsters.manAtArms.stats.ARM),
    'exterminator gives 1 additional damage vs vermin'
  );

  battle.heroes.hero.vars.target = 'vermin';
  battle.heroes.hero.vars.stance = 'defence';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack}]);
  t.equal(
    result.monsters.vermin.vars.HP,
    monsters.slitherFish.stats.HP - (DMG - monsters.slitherFish.stats.ARM),
    'defending exterminator has no effect'
  );

  battle.heroes.hero.vars.stance = 'assault';
  battle.heroes.hero.vars.attackDice = [1, monsters.slitherFish.stats.ARM];
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack}]);
  t.equal(
    result.monsters.vermin.vars.HP,
    monsters.slitherFish.stats.HP,
    'exterminator has no effect if didnt do damage'
  );

  t.end();
});
