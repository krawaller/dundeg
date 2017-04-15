import * as test from "tape";
import { makeHero, makeMonster, lastLogHasStr } from '../testutils';

import { BattleState, Attack } from '../../src/interfaces';
import { apply_attack_result, AttackResultSpec } from '../../src/apply/apply_attack_result';

test('monster evade skill', t => {
  let result, battle:BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{attackDice:[2,2]})
    },
    monsters: {
      monster: makeMonster('harpy') // has evade
    },
    log: []
  };
  let meelee:Attack = {type: 'meelee', stat: 'STR', using: 'spikedGauntlet'};

  result = apply_attack_result(battle, {heroId: 'hero', monsterId: 'monster', attack: meelee, success: true});
  t.ok(lastLogHasStr(result,'evade'), 'log talks about evade');

  t.end();
});
