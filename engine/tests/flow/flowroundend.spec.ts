import * as test from "tape";
import { makeHero, makeMonster, execUntil, execTo } from '../testutils';

import { BattleState, FlowInstruction } from '../../src/interfaces';


test('flow round end', t => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler'),
      hero2: makeHero('hinterLander')
    },
    monsters: { monster: makeMonster('backAlleyBruiser') }
  };
  let result: BattleState

  battle.heroes.hero.vars.hasActed = true;
  battle.heroes.hero.vars.usedPowerDice = [true,false,true];
  battle.heroes.hero.vars.failedDefence = true;
  battle.heroes.hero.vars.failedEscape = true;
  battle.heroes.hero2.vars.action = ['flow','throwShrapnelBomb',{heroId:'hero2'}];
  battle.monsters.monster.vars.hasAttacked = true;


  result = execTo(battle, ['flow','roundEnd',{}], ['winGame','loseGame','newRound']);
  t.ok(!result.heroes.hero.vars.hasActed, 'hasActed was removed from heroes');
  t.ok(!result.heroes.hero.vars.usedPowerDice, 'hasUsedPowForDefence was removed from heroes');
  t.ok(!result.heroes.hero.vars.failedDefence, 'failedDefence was removed from heroes');
  t.ok(!result.heroes.hero2.vars.action, 'action was removed from heroes');
  t.ok(!result.monsters.monster.vars.hasAttacked, 'hasAttacked was removed from monsters');
  t.equal(result.stack[0][1], 'newRound', 'we were sent to a new round');

  battle.heroes.hero.vars.knockedOutBy = 'someone';
  battle.heroes.hero2.vars.escaped = true;
  result = execTo(battle, ['flow','roundEnd',{}], ['winGame','loseGame','newRound']);
  t.equal(result.stack[0][1], 'loseGame', 'we lost the game since no active heroes remain');

  delete battle.heroes.hero.vars.knockedOutBy;
  battle.monsters.monster.vars.killedBy = 'someone';
  result = execTo(battle, ['flow','roundEnd',{}], ['winGame','loseGame','newRound']);
  t.equal(result.stack[0][1], 'winGame', 'we won the game since all monsters are down');

  t.end();
});

