import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { find_targets_for_monster } from '../../src/find/find_targets_for_monster';

test('find targets for monsters', t => {
  const battle: BattleState = {
    heroes: {
      has8agi: makeHero('hinterLander'),
      alsohas8: makeHero('infamousButcher'),
      hasagi7: makeHero('soldierOfFortune'),
      another8: makeHero('bloodsportBrawler'),
      knocked: makeHero('carnivalDrifter', {knockedOutBy: 'someMonster'}),
      escaped: makeHero('angelOfDeath', {escaped: true})
    },
    monsters: {
      wantshighagi: makeMonster('manAtArms'),
      wantslowagi: makeMonster('ratThing')
    }
  };

  t.deepEqual(
    find_targets_for_monster(battle, {monsterId: 'wantshighagi'}),
    ['has8agi','alsohas8','another8'],
    'correctly found all high agility targets'
  );

  t.deepEqual(
    find_targets_for_monster(battle, {monsterId: 'wantslowagi'}),
    ['hasagi7'],
    'correctly found all low agility targets'
  );

  t.end();
});
