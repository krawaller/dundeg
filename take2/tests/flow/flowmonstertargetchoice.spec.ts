import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';

import { BattleState, LogMessagePart, Question, FlowInstruction, FlowTarget } from '../../src/interfaces';
import { flow_monster_target_choice, MonsterTargetChoiceSpec } from '../../src/flow/flow_monster_target_choice';

test('flow monster target choice', t => {
  let result, battle: BattleState = {
    heroes: {
      brawler: makeHero('bloodsportBrawler'), // MRL 8
      soldier: makeHero('soldierOfFortune')   // MRL 8
    },
    monsters: { monster: makeMonster('footPad') }, // MRL-
  };

  battle.monsters.monster.vars.target = 'brawler';
  result =flow_monster_target_choice(battle, {monsterId: 'monster'});
  t.ok(!result, 'we get no instruction when monster already had live target');

  delete battle.monsters.monster.vars.target;
  result = flow_monster_target_choice(battle, {monsterId: 'monster'});
  t.equal(result[1], 'question', 'we got a question');
  let q = <Question>result[2];
  t.deepEqual(Object.keys(q.options), ['Bloodsport Brawler','Soldier of Fortune'], 'we got correct options');

  battle.heroes.butcher = makeHero('infamousButcher'); // MRL 6
  result = <FlowTarget>flow_monster_target_choice(battle, {monsterId: 'monster'});
  t.equal(result[0], 'apply');
  t.equal(result[1], 'monsterTargetChoice', 'we got a monsterTargetChoice instruction');
  t.equal(result[2].heroId, 'butcher');

  t.end();
});

