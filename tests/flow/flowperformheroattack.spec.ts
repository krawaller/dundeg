import * as test from "tape";
import { makeHero, makeMonster, execUntil } from '../testutils';

import { BattleState, FlowPerformHeroAttack, Attack } from '../../src/interfaces';
import { monsters } from '../../src/library';

test('flow perform hero attack', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('infamousButcher', {target: 'monster'}) }, // CON 8
    monsters: { monster: makeMonster('slimeCorpse') }, // ARM 1, HP 8
    log: []
  };
  let blueprint = monsters.slimeCorpse;

  let result: BattleState, attack: Attack
  attack = {type: 'meelee', stat: 'CON'};

  battle.heroes.hero.vars.attackDice = [6,3]; // will fail since 6+3 > 8
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId:'hero',attack}]);
  t.equal(
    result.monsters.monster.vars.HP,
    blueprint.stats.HP,
    'failed attack dealt no damage'
  );
  
  battle.heroes.hero.vars.attackDice = [2,3]; // will succeed since 2+3 <= 8
  battle.heroes.hero.vars.powerDie = 5; 
  battle.heroes.hero.vars.stance = 'assault'; // will use power die as attack, meaning 5 in dmg
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId:'hero',attack}]);
  t.equal(
    result.monsters.monster.vars.HP,
    blueprint.stats.HP - 4,
    'dealt 5 damage (power die), -1 armour'
  );

  battle.heroes.hero.vars.powerDie = 1; 
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId:'hero',attack}]);
  t.equal(
    result.monsters.monster.vars.HP,
    blueprint.stats.HP - 2,
    'dealt 3 damage (highest die since power was lower), -1 armour'
  );

  battle.heroes.hero.vars.powerDie = 6; 
  battle.heroes.hero.vars.stance = 'defence';
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId:'hero',attack}]);
  t.equal(
    result.monsters.monster.vars.HP,
    blueprint.stats.HP - 2,
    'dealt 3 damage (ignore power since not in assault), -1 armour'
  );

  battle.heroes.hero.vars.attackDice = [0,0];
  result = execUntil(battle, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId:'hero',attack}]);
  t.equal(
    result.monsters.monster.vars.HP,
    blueprint.stats.HP,
    'negative damage doesnt heal monster, that sucks'
  );

  t.end();
});

