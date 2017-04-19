import * as test from "tape";
import { makeHero, makeMonster, execUntil, reply, makeRoll, replyTo } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { items } from '../../src/library';

test('flow player round', t => {
  let startingHP = 10;
  let battle: BattleState = {
    heroes: { hero: makeHero('infamousButcher',{HP:startingHP},{},{},['spikedGauntlet']) },
    monsters: {
      monster: makeMonster('slimeCorpse',{target: 'hero'}),
      monster2: makeMonster('nugBear',{target:'hero'})
    }, // ATK 4
    seed: 'playerroundnpm' //  1 5 1 1 5 ( ATK DEF POW )
  };

  // Initiate round
  battle = execUntil(battle, ['flow','playerRound',{heroId:'hero'}]);

  // Choose stance
  battle = reply(battle, 'assault');

  // Choose action
  battle = reply(battle, items.spikedGauntlet.actions.spikedGauntletAttackAssault);

  // Choose target (as part of registerATtack)
  battle = reply(battle, battle.monsters.monster.name);

  // Roll battle dice
  battle = reply(battle, makeRoll);

  // Escape choice (since double def roll)
  battle = reply(battle, 'remain');

  // Take hit from both monsters
  battle = replyTo(battle, 'continue', ['nextPlayer']);
  battle = replyTo(battle, 'continue', ['nextPlayer']);

  // Player does his thing (obs, no question as of yet, TODO should there be?)
  battle;

  t.equal(
    battle.stack[0][1], 'nextPlayer', 'We have reached end of the round, now go to next player!'
  );

  t.end();
});

