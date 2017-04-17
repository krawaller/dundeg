import * as test from "tape";
import { makeHero, makeMonster, step } from '../testutils';

import { BattleState, FlowInstruction } from '../../src/interfaces';

test('flow bash player spec', t => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('hinterLander')
    },
    monsters: {
      monster1: makeMonster('backAlleyBruiser'),
      monster2: makeMonster('slitherFish'),
      monster3: makeMonster('nachtDrekSlicer'),
      monster4: makeMonster('slimeCorpse')
    },
    stack: []
  };
  let result: BattleState;
  let heroId = 'hero';

  result = step(battle, ['flow','bashPlayer',{heroId}]);
  t.ok(!result.stack.length, 'no one was targetting player, so nothing happened');

  battle.monsters.monster1.vars.target = heroId;
  battle.monsters.monster2.vars.target = heroId;
  battle.heroes.hero.vars.escaped = true;
  result = step(battle, ['flow','bashPlayer',{heroId}]);
  t.ok(!result.stack.length, 'hero has escaped so nothing happens'); // TODO - maybe log?

  delete battle.heroes.hero.vars.escaped;
  battle.monsters.monster3.vars.target = heroId;
  battle.monsters.monster1.vars.killedBy = 'someone';
  battle.monsters.monster2.vars.killedBy = 'someone';
  battle.monsters.monster3.vars.killedBy = 'someone';
  result = step(battle, ['flow','bashPlayer',{heroId}]);
  t.ok(!result.stack.length, 'all potential bashers are dead so nothing happens');

  delete battle.monsters.monster1.vars.killedBy
  delete battle.monsters.monster2.vars.killedBy
  result = step(battle, ['flow','bashPlayer',{heroId}]);
  t.equal(result.stack[0][1], 'all', 'we got a multistack result');
  let question = result.stack[0][2][0];
  t.equal(question[1], 'question', 'first is a question');
  t.deepEqual(Object.keys(question[2].options),['continue'],'we can just move on');
  t.deepEqual(question[2].options.continue,['flow','performMonsterAttack',{monsterId:'monster1'}],'hero will get attacked');
  question = result.stack[0][2][1];
  t.equal(question[1], 'question', 'second is also question');
  t.deepEqual(question[2].options.continue,['flow','performMonsterAttack',{monsterId:'monster2'}],'next monster will attack');

  t.end();
});

