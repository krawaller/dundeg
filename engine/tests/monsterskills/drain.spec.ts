import * as test from "tape";
import { lastLogHasStr, makeMonster, makeHero, execUntil } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_wounds_to_hero } from '../../src/apply/apply_wounds_to_hero';
import { apply_end_of_round_to_monster } from '../../src/apply/apply_end_of_round_to_monster';

test('the drain monster skill', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler', {HP: 3}) },
    monsters: { drainer: makeMonster('ghoulTroll',{target:'hero',drained: 2, HP: 9}) }, // ATK 6
    log: []
  };

  battle = execUntil(battle, ['flow','performMonsterAttack',{monsterId:'drainer'}]);
  t.equal(battle.monsters.drainer.vars.drained, 5, 'the 3 dealt dmg was added to drained');
  t.ok(lastLogHasStr(battle, 'drain'), 'drain msg shown');

  battle = execUntil(battle, ['flow','roundEnd',{}]);
  battle = apply_end_of_round_to_monster(battle, {monsterId: 'drainer'});
  t.equal(battle.monsters.drainer.vars.drained, undefined, 'drain count was removed');
  t.equal(battle.monsters.drainer.vars.HP, 10, 'HP was increased (hit max)');
  //t.ok(lastLogHasStr(battle, 'drain'), 'drain recover msg shown'); // TODO - need better tool to test this!

  t.end();

});
