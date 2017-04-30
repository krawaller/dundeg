import * as test from "tape";
import { makeMonster, makeHero, lastLogHasStr, makeRoll, execUntil, reply, justReply } from '../testutils';
import { BattleState, FlowInstruction, FlowPerformHeroAttack } from '../../src/interfaces';
import { apply_weakness_invocation_result } from '../../src/apply/apply_weakness_invocation_result';
import { find_hero_actions } from '../../src/find/find_hero_actions';
import { heroSkills, monsters } from '../../src/library';

test('the hero weakness skill', t => {
  let result: BattleState, battle: BattleState = { // brawler has PER = 6
    heroes: { hero: makeHero('bloodsportBrawler',{target:'monster',stance:'assault'},{},{findWeakness:true}) },
    monsters: { monster: makeMonster('slitherFish') },
    log: [],
    seed: 'weaknessomgomgomg' // will roll 4 3 2 2
  };

  t.ok(
    !find_hero_actions(battle,{heroId:'hero'})[heroSkills.findWeakness.actions.findWeakness],
    'find weakness not available in assault stance'
  );

  battle.heroes.hero.vars.stance = 'defence';
  
  battle = execUntil(battle, ['flow','selectAction',{heroId:'hero'}]);
  battle = reply(battle, heroSkills.findWeakness.actions.findWeakness);
  if (!battle.heroes.hero.vars.target) battle = reply(battle, battle.monsters.monster.name); // maybe auto selected since only 1

  result = execUntil(battle, ['flow','executeAction',{heroId:'hero'}]);
  result = reply(result, result.monsters.monster.name);
  result = reply(result,makeRoll); // was prompted to roll for test, will fail
  t.ok(!result.monsters.monster.states.weakness, 'Weakness wasnt applied since invocation failed');
  t.ok( lastLogHasStr(result, 'fail'), 'log acknowledges fail' );

  result = execUntil(battle, ['flow','executeAction',{heroId:'hero'}]);
  result = reply(result, result.monsters.monster.name);
  result = reply(result,makeRoll); // was prompted to roll for test, will succeed
  t.equal(result.monsters.monster.states.weakness, 'hero', 'Weakness state was correctly set');
  t.ok( lastLogHasStr(result, 'success'), 'log acknowledges success' );

  result.heroes.hero.vars.attackDice = [1,1]; // slitherfish has 1 arm, won't do anything
  result = execUntil(result, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId:'hero',attack:{stat:'STR'}}]);
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.slitherFish.stats.HP,
    'weakness has no effect if didnt do damage'
  );

  result.heroes.hero.vars.attackDice = [1,3];
  result = execUntil(result, <FlowPerformHeroAttack>['flow','performHeroAttack',{heroId:'hero',attack:{stat:'STR'}}]);
  t.equal(
    result.monsters.monster.vars.HP,
    monsters.slitherFish.stats.HP - (3 + 1 - monsters.slitherFish.stats.ARM),
    'weakness gives 1 additional damage'
  );

  t.end();

});
