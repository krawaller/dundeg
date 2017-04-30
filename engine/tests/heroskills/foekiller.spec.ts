import * as test from "tape";
import { makeMonster, makeHero, execUntil } from '../testutils';
import { BattleState, FlowPerformHeroAttack } from '../../src/interfaces';
import { monsters } from '../../src/library';

test('the foekiller hero skill', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{attackDice:[1,3]},{},{foeKiller: true})
    },
    monsters: {
      puny: makeMonster('slitherFish'),
      hasVal3: makeMonster('shambler')
    },
    log: []
  };

  let result: BattleState;
  let heroId = 'hero';
  let attack = {stat:'STR'}
  let DMG = 3;


  battle.heroes.hero.vars.stance = 'assault';
  battle.heroes.hero.vars.target = 'hasVal3';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack}]);
  t.equal(
    result.monsters.hasVal3.vars.HP,
    monsters.shambler.stats.HP - (DMG + 1 - monsters.shambler.stats.ARM),
    'foeKiller gives 1 additional damage against biggie in assault'
  );

  battle.heroes.hero.vars.target = 'puny';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack}]);
  t.equal(
    result.monsters.puny.vars.HP,
    monsters.slitherFish.stats.HP - (DMG - monsters.slitherFish.stats.ARM),
    'no extra against puny enemy'
  );

  battle.heroes.hero.vars.target = 'hasVal3';
  battle.heroes.hero.vars.stance = 'guard';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack}]);
  t.equal(
    result.monsters.hasVal3.vars.HP,
    monsters.shambler.stats.HP - (DMG - monsters.shambler.stats.ARM),
   'foeKiller has no effect when not in assault mode'
  );
  
  battle.heroes.hero.vars.stance = 'assault';
  battle.heroes.hero.vars.attackDice = [0,0];
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack}]);
  t.equal(
    result.monsters.hasVal3.vars.HP,
    monsters.shambler.stats.HP,
   'foeKiller has no effect when we didnt do any damage'
  );

  t.end();
});
