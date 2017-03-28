import * as test from "tape";
import { lastLogHasStr, makeMonster, makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_damage_to_hero } from '../../src/apply/apply_damage_to_hero';
import { apply_end_of_round_to_monster } from '../../src/apply/apply_end_of_round_to_monster';

test('the drain monster skill', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler', {HP: 3})
    },
    monsters: {
      drainer: makeMonster('ghoulTroll',{drained: 2, HP: 9})
    },
    log: []
  };
  const instr = {
    heroId: 'hero',
    monsterId: 'drainer',
    heroDMG: {value: 4, history: []}
  }

  t.plan(5);

  let result = apply_damage_to_hero(battle, instr);
  t.equal(result.monsters.drainer.vars.drained, 5, 'the 3 dealt dmg was added to drained');
  t.ok(lastLogHasStr(result, 'drain'), 'drain msg shown');

  result = apply_end_of_round_to_monster(battle, {monsterId: 'drainer'});
  t.equal(result.monsters.drainer.vars.drained, undefined, 'drain count was removed');
  t.equal(result.monsters.drainer.vars.HP, 10, 'HP was increased (hit max)');
  t.ok(lastLogHasStr(result, 'drain'), 'drain recover msg shown');

});
