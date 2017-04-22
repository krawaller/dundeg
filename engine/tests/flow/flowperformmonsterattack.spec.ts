import * as test from "tape";
import { makeHero, makeMonster, execUntil } from '../testutils';

import { BattleState, FlowPerformMonsterAttack, EvilAttack } from '../../src/interfaces';
import { monsters } from '../../src/library';

test('flow perform monster attack', t => {
  let startingHP = 10;
  let battle: BattleState = {
    heroes: { hero: makeHero('infamousButcher',{HP:startingHP}) },
    monsters: { monster: makeMonster('slimeCorpse',{target: 'hero'}) }, // ATK 4
    log: []
  };
  let blueprint = monsters.slimeCorpse;
  let DMG = blueprint.stats.ATK;

  let result: BattleState, attack: EvilAttack
  let monsterId = 'monster'
  attack = {type:'regular'};

  battle.heroes.hero.vars.defenceDice = [1,2];
  battle.heroes.hero.vars.powerDie = 3;
  battle.heroes.hero.vars.stance = 'defence';
  result = execUntil(battle, <FlowPerformMonsterAttack>['flow','performMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG - 3),
    'defending hero uses power dice for defence'
  );

  battle.heroes.hero.vars.defenceDice = [1,3];
  battle.heroes.hero.vars.powerDie = 2;
  battle.heroes.hero.vars.stance = 'defence';
  result = execUntil(battle, <FlowPerformMonsterAttack>['flow','performMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG - 3),
    'defending hero ignores power die if def die is higher'
  );

  battle.heroes.hero.vars.powerDie = 5;
  battle.heroes.hero.vars.stance = 'assault';
  result = execUntil(battle, <FlowPerformMonsterAttack>['flow','performMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG - 3),
    'assaulting hero ignores power die for defence, just uses defence die'
  );

  battle.heroes.hero.vars.failedDefence = true;
  result = execUntil(battle, <FlowPerformMonsterAttack>['flow','performMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - DMG,
    'failed defence means no defence val'
  );

  battle.heroes.hero.vars.usePowForDefence = true;
  battle.heroes.hero.vars.powerDie = 2;
  result = execUntil(battle, <FlowPerformMonsterAttack>['flow','performMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG - 2),
    'unless they choose to use POW die for defence'
  );

  delete battle.heroes.hero.vars.usePowForDefence
  battle.heroes.hero.vars.failedEscape = true;
  result = execUntil(battle, <FlowPerformMonsterAttack>['flow','performMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - DMG,
    'failed escaper has no defence'
  );

  t.end();
});

