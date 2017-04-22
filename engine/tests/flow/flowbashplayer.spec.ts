import * as test from "tape";
import { makeHero, makeMonster, step, execUntil } from '../testutils';

import { BattleState, FlowInstruction } from '../../src/interfaces';

test('flow bash player spec', t => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('hinterLander',{HP: 10})
    },
    monsters: {
      monster1: makeMonster('backAlleyBruiser'), // ATK 4
      monster2: makeMonster('slitherFish'), // ATK 3
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
  result = execUntil(battle, ['flow','bashPlayer',{heroId}]);
  t.equal(result.heroes.hero.vars.HP, 3, 'both monsters did damage (10-4-3)')

  t.end();
});

