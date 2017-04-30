import * as test from "tape";
import { makeHero, makeMonster, logMessageContains, execUntil, makeRoll, reply } from '../testutils';

import { BattleState, LogMessagePart, Question, FlowInstruction } from '../../src/interfaces';

test('flow battle dice', t => {
  let result:BattleState, battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler') },
    monsters: { monster: makeMonster('slimeCorpse') },
    log: []
  };

  result = execUntil(battle, <FlowInstruction>['flow','battleDice', {heroId:'hero'}] );
  t.ok(!result.question, 'no question was posed since we dont need to roll anything');

  battle.seed = 'defenceroll'; // 3,4,6
  battle.monsters.monster.vars.target = 'hero';
  battle.heroes.hero.vars.action = <FlowInstruction>['flow','throwShrapnelBomb']; // not attack
  result = execUntil(battle, <FlowInstruction>['flow','battleDice', {heroId:'hero'}] );
  t.ok(result.question, 'we did get a question since we need to make a roll');
  result = reply(result, makeRoll);
  t.deepEqual(result.heroes.hero.vars.defenceDice,[3,4], 'we rolled defence dice since monster targetting us');
  t.equal(result.heroes.hero.vars.powerDice[0], 6, 'we rolled power die');
  t.ok(!result.heroes.hero.vars.attackDice, 'we did not roll attack die since no regular attack');

  battle.seed = 'attackroll'; // 6 3 1
  delete battle.monsters.monster.vars.target;
  battle.heroes.hero.vars.action = <FlowInstruction>['flow','performHeroAttack']; // regular attack
  result = execUntil(battle, <FlowInstruction>['flow','battleDice', {heroId:'hero'}] );
  t.ok(result.question, 'we did get a question since we need to make a roll');
  result = reply(result, makeRoll);
  t.deepEqual(result.heroes.hero.vars.attackDice,[6,3], 'we rolled attack dice since were doing regular attack');
  t.equal(result.heroes.hero.vars.powerDice[0], 1, 'we rolled power die');
  t.ok(!result.heroes.hero.vars.defenceDice, 'we did not roll defence die since no one targets us');

  battle.seed = 'attackanddefenceroll'; // 5 1 4 5 6
  battle.monsters.monster.vars.target = 'hero';
  battle.heroes.hero.vars.action = <FlowInstruction>['flow','performHeroAttack']; // regular attack
  result = execUntil(battle, <FlowInstruction>['flow','battleDice', {heroId:'hero'}] );
  t.ok(result.question, 'we did get a question since we need to make a roll');
  result = reply(result, makeRoll);
  t.deepEqual(result.heroes.hero.vars.attackDice,[5,1], 'we rolled attack dice since were doing regular attack');
  t.deepEqual(result.heroes.hero.vars.defenceDice,[4,5], 'we did rolled defence since monster targetting us');
  t.equal(result.heroes.hero.vars.powerDice[0], 6, 'we rolled power die');

  t.end();
});

