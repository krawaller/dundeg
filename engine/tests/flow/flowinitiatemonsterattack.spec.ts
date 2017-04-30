import * as test from "tape";
import { makeHero, makeMonster, execUntil, reply } from '../testutils';

import { BattleState, FlowInitiateMonsterAttack, EvilAttack } from '../../src/interfaces';
import { monsters } from '../../src/library';

test('flow initiate monster attack', t => {
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
  battle.heroes.hero.vars.stance = 'guard';
  result = execUntil(battle, <FlowInitiateMonsterAttack>['flow','initiateMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG - 3),
    'defending hero uses power dice for defence'
  );

  battle.heroes.hero.vars.defenceDice = [1,3];
  battle.heroes.hero.vars.powerDie = 2;
  battle.heroes.hero.vars.stance = 'guard';
  result = execUntil(battle, <FlowInitiateMonsterAttack>['flow','initiateMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG - 3),
    'defending hero ignores power die if def die is higher'
  );

  battle.heroes.hero.vars.powerDie = 5;
  battle.heroes.hero.vars.stance = 'assault';
  result = execUntil(battle, <FlowInitiateMonsterAttack>['flow','initiateMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG - 3),
    'assaulting hero ignores power die for defence, just uses defence die'
  );

  battle.heroes.hero.vars.powerDie = 2;
  battle.heroes.hero.vars.failedDefence = true;
  battle.heroes.hero.vars.stance = 'guard';
  result = execUntil(battle, <FlowInitiateMonsterAttack>['flow','initiateMonsterAttack',{monsterId,attack}]);
  result = reply(result, 'no');
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - DMG,
    'failed defence and opt not to use pow means no defence val'
  );

  result = execUntil(battle, <FlowInitiateMonsterAttack>['flow','initiateMonsterAttack',{monsterId,attack}]);
  result = reply(result, 'yes');
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG - 2),
    'unless they choose to use POW die for defence'
  );
  t.ok(
    !result.heroes.hero.vars.usePowForDefence,
    'usePowForDefence was removed afterwards'
  );
  t.ok(
    result.heroes.hero.vars.hasUsedPowForDefence,
    'hasUsedPowForDefence was set to prevent it from being used again'
  );

  battle.heroes.hero.vars.hasUsedPowForDefence = true;
  result = execUntil(battle, <FlowInitiateMonsterAttack>['flow','initiateMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - DMG,
    'failed defence and already used pow means no question and no defence val'
  );

  battle.heroes.hero.vars.failedEscape = true;
  result = execUntil(battle, <FlowInitiateMonsterAttack>['flow','initiateMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - DMG,
    'failed escaper has no defence'
  );

  t.end();
});

