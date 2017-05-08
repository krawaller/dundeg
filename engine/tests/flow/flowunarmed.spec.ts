import * as test from "tape";
import { makeHero, makeMonster, execUntil, justReply, reply } from '../testutils';
import { BattleState, FlowExecuteAction, Attack, FlowPerformMonsterAttack, FlowInitiateMonsterAttack } from '../../src/interfaces';
import { monsters, misc } from '../../src/library';

test('unarmed hero attacks', t => {
  let startingHP = 10;
  let battle: BattleState = {
    heroes: { hero: makeHero('infamousButcher', {target: 'monster',HP:startingHP}) }, // AGI 8, STR 8
    monsters: { monster: makeMonster('slimeCorpse', {target:'hero'}) }, // ATK 4, ARM 1, HP 8
    log: []
  };
  let blueprint = monsters.slimeCorpse;
  let result: BattleState;
  let DMG = blueprint.stats.ATK;

  result = execUntil(battle, ['flow','selectAction',{heroId:'hero'}]);
  t.ok(result.question.options[misc.basicActions.unarmedAGI], 'Hero gets unarmed AGI attack');
  t.ok(result.question.options[misc.basicActions.unarmedSTR], 'Hero gets unarmed STR attack');

  battle = execUntil(battle, ['flow','selectAction',{heroId:'hero'}]);
  battle = reply(battle, misc.basicActions.unarmedSTR); // make Battle from now on have unarmed AGI selected

  battle.heroes.hero.vars.attackDice = [6,3]; // will fail since 6+3 > 8
  result = execUntil(battle, <FlowExecuteAction>['flow','executeAction',{heroId:'hero'}]);
  result = reply(result,result.monsters.monster.name);
  t.equal(
    result.monsters.monster.vars.HP,
    blueprint.stats.HP,
    'failed attack dealt no damage'
  );
  
  battle.heroes.hero.vars.attackDice = [1,4]; // will succeed since 1+4 <= 8
  battle.heroes.hero.vars.powerDice = [5]; 
  battle.heroes.hero.vars.stance = 'assault'; // will use power die as attack, meaning 3 in dmg (halved rounded up)
  result = execUntil(battle, <FlowExecuteAction>['flow','executeAction',{heroId:'hero'}]);
  result = reply(result,result.monsters.monster.name);
  t.equal(
    result.monsters.monster.vars.HP,
    blueprint.stats.HP - 2,
    'dealt 3 damage (power die) -1 armour'
  );

  battle.heroes.hero.vars.attackDice = [2,4]; // will succeed since 2+4 <= 8
  battle.heroes.hero.vars.powerDice = [1];
  result = execUntil(battle, <FlowExecuteAction>['flow','executeAction',{heroId:'hero'}]);
  result = reply(result,result.monsters.monster.name);
  t.equal(
    result.monsters.monster.vars.HP,
    blueprint.stats.HP - 1,
    'dealt 2 damage (lower die because more than power), -1 armour'
  );

  battle.heroes.hero.vars.powerDice = [6]; 
  battle.heroes.hero.vars.stance = 'guard';
  result = execUntil(battle, <FlowExecuteAction>['flow','executeAction',{heroId:'hero'}]);
  result = reply(result,result.monsters.monster.name);
  t.equal(
    result.monsters.monster.vars.HP,
    blueprint.stats.HP - 1,
    'dealt 2 damage (lowest attack, ignore power since not in assault), -1 armour'
  );

  // Ok, now also test halving defence

  delete battle.question
  battle.heroes.hero.vars.defenceDice = [1,2];
  battle.heroes.hero.vars.powerDice = [5,3];
  battle.heroes.hero.vars.stance = 'guard';
  result = execUntil(battle, <FlowPerformMonsterAttack>['flow','performMonsterAttack',{monsterId:'monster'}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG - 3),
    'defending hero uses highest power dice for defence, but halved because unarmed'
  );

  battle.heroes.hero.vars.defenceDice = [1,3];
  battle.heroes.hero.vars.powerDice = [3];
  battle.heroes.hero.vars.failedDefence = true;
  result = execUntil(battle, <FlowInitiateMonsterAttack>['flow','initiateMonsterAttack',{monsterId:'monster'}]);
  result = reply(result, 'POW die 3');
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (DMG - 2),
    'unless they choose to use POW die for defence (although still halved)'
  );


  t.end();
});

