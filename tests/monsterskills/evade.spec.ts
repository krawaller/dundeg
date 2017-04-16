import * as test from "tape";
import { makeHero, makeMonster, lastLogHasStr, execUntil } from '../testutils';

import { BattleState, Attack, FlowInstruction } from '../../src/interfaces';
import { apply_attack_result, AttackResultSpec } from '../../src/apply/apply_attack_result';
import { monsters } from '../../src/library';

test('monster evade skill', t => {
  let result:BattleState, battle:BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{target: 'monster', attackDice:[2,2]})
    },
    monsters: {
      monster: makeMonster('harpy') // has evade
    },
    log: []
  };
  let meelee:Attack = {type: 'meelee'};

  result = execUntil(battle, <FlowInstruction>['flow','performHeroAttack', {heroId:'hero',attack:{type: 'meelee'}}]);
  t.ok(lastLogHasStr(result,'evade'), 'log talks about evade');
  t.equal(result.monsters.monster.vars.HP, monsters.harpy.stats.HP, 'harpy wasnt damaged' );

  result = execUntil(battle, <FlowInstruction>['flow','performHeroAttack', {heroId:'hero',attack:{type: 'ranged'}}]);
  t.ok(result.monsters.monster.vars.HP !== monsters.harpy.stats.HP, 'harpy took damage as normal' );

  t.end();
});
