/*
State caused by Dimwit skill
*/

import * as test from "tape";
import { lastLogHasStr, makeMonster, makeHero, execUntil } from '../testutils';
import { monsters } from '../../src/library';
import { BattleState, FlowPerformMonsterAttack, EvilAttack } from '../../src/interfaces';
import { apply_end_of_round_to_monster } from '../../src/apply/apply_end_of_round_to_monster';

test('the raging mad monster state', t => {

  const startingHP = 10;
  const DEF = 2;
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{HP:10,defenceDice:[1,DEF]})
    },
    monsters: {
      monster: makeMonster('megaRat',{target:'hero'},{ragingMad: true}) // atk 5
    },
    log: []
  };
  const ATK = monsters.megaRat.stats.ATK;
  const attack:EvilAttack = {type: 'regular'};
  const monsterId = 'monster';
  let result: BattleState;

  result = execUntil(battle, <FlowPerformMonsterAttack>['flow','performMonsterAttack',{monsterId,attack}]);
  t.equal(
    result.heroes.hero.vars.HP,
    startingHP - (ATK + 2 - DEF),
    'attack is plus 2'
  );

  battle = apply_end_of_round_to_monster(battle, {monsterId: 'monster'});
  t.ok(!battle.monsters.monster.states.ragingMad, 'ragingMad was removed')
  t.ok(lastLogHasStr(battle, 'rag'), 'message announced raging mad removal');

  t.end();
});
