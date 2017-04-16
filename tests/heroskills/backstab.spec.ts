import * as test from "tape";
import { makeMonster, makeHero, execUntil } from '../testutils';
import { monsters } from '../../src/library';
import { BattleState, FlowPerformHeroAttack } from '../../src/interfaces';

test('the backstab hero skill', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{attackDice: [1,3], target: 'monster'},{},{backStab: true})
    },
    monsters: {
      monster: makeMonster('imperialHuntsman') // ARM 2, HP 4
    },
    log: []
  };

  let result: BattleState;
  let ATK = 3;
  let heroId = 'hero'


  // ------------ Test extra damage -----------------------

  battle.monsters.monster.vars.target = 'hero';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack:{type:'meelee'}}]);
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.imperialHuntsman.stats.HP - (ATK - monsters.imperialHuntsman.stats.ARM),
    'backstab gives no extra damage when monster is targetting us'
  )

  delete battle.monsters.monster.vars.target;
  battle.heroes.hero.vars.stance = 'defence';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack:{type:'meelee'}}]);
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.imperialHuntsman.stats.HP - (ATK - monsters.imperialHuntsman.stats.ARM),
    'backstab gives no extra damage when stance is defence'
  );

  battle.heroes.hero.vars.stance = 'assault';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack:{type:'ranged'}}]);
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.imperialHuntsman.stats.HP - (ATK - monsters.imperialHuntsman.stats.ARM),
    'backstab gives no extra damage when not meelee'
  );

  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack:{type:'meelee'}}]);
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.imperialHuntsman.stats.HP - (ATK + 1 - monsters.imperialHuntsman.stats.ARM),
    'backstab gives no extra damage when not meelee'
  );

  // ------------------- Test -1 ARM ---------------------------

  battle.monsters.monster.vars.target = 'hero';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack:{type:'special',using:'skinningKnife'}}]);
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.imperialHuntsman.stats.HP - (ATK - monsters.imperialHuntsman.stats.ARM),
    'backstab gives no ARM minus when monster is targetting us'
  );

  delete battle.monsters.monster.vars.target;
  battle.heroes.hero.vars.stance = 'defence';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack:{type:'special',using:'skinningKnife'}}]);
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.imperialHuntsman.stats.HP - (ATK - monsters.imperialHuntsman.stats.ARM),
    'backstab gives no ARM minus when stance is defence'
  );

  battle.heroes.hero.vars.stance = 'assault';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack:{type:'special',using:'luncheonTruncheon'}}]);
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.imperialHuntsman.stats.HP - (ATK - monsters.imperialHuntsman.stats.ARM),
    'backstab gives no ARM minus when not using bladed item'
  );

  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack:{type:'special',using:'skinningKnife'}}]);
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.imperialHuntsman.stats.HP - (ATK - (monsters.imperialHuntsman.stats.ARM - 1)),
    'backstab gives 1 ARM minus when attacking someone not targetting us with blade item'
  );

  // ---------------------- BOTH! :D -------------------------------

  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId,attack:{type:'meelee',using:'skinningKnife'}}]);
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.imperialHuntsman.stats.HP - (ATK + 1 - (monsters.imperialHuntsman.stats.ARM - 1)),
    'backstab gives 1 ARM minus AND +1 dmg when meelee attacking someone not targetting us with blade item'
  );

  t.end();
});
