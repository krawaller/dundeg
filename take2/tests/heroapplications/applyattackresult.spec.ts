import * as test from "tape";
import { makeHero, makeMonster, lastLogHasStr } from '../testutils';

import { BattleState, Attack } from '../../src/interfaces';
import { apply_attack_result, AttackResultSpec } from '../../src/apply/apply_attack_result';

test('apply attack result', t => {
  let result, battle:BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler')
    },
    monsters: {
      monster: makeMonster('slitherFish')
    },
    log: []
  };
  let meelee:Attack = {type: 'meelee', stat: 'STR', using: 'spikedGauntlet'};

  result = apply_attack_result(battle, {heroId: 'hero', monsterId: 'monster', attack: meelee});
  t.ok(lastLogHasStr(result,'misse'), 'log acknowledges miss');

  t.end();
});
