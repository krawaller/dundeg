import * as test from "tape";
import { makeMonster, makeHero, lastLogHasStr, makeRoll, execUntil, reply } from '../testutils';
import { BattleState, FlowInstruction } from '../../src/interfaces';
import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';
import { apply_weakness_invocation_result } from '../../src/apply/apply_weakness_invocation_result';
import { find_hero_actions } from '../../src/find/find_hero_actions';
import { heroSkills } from '../../src/library';

test('the hero weakness skill', t => {
  let result: BattleState, battle: BattleState = { // brawler has PER = 6
    heroes: { hero: makeHero('bloodsportBrawler',{target:'monster',stance:'assault'},{},{findWeakness:true}) },
    monsters: { monster: makeMonster('slitherFish') },
    log: [],
    seed: 'findweakness' // will roll 4 2 5 4
  };

  t.ok(
    !find_hero_actions(battle,{heroId:'hero'})[heroSkills.findWeakness.actions.findWeakness],
    'find weakness not available in assault stance'
  );

  let action: FlowInstruction = ['flow','weakness',{heroId:'hero'}];

  battle.heroes.hero.vars.stance = 'defence';
  t.deepEqual(
    find_hero_actions(battle,{heroId:'hero'})[heroSkills.findWeakness.actions.findWeakness],
    action,
    'find weakness available in defence stance'
  );

  result = execUntil(battle, action);
  result = reply(result,makeRoll); // was prompted to roll for test, will succeed
  t.equal(result.monsters.monster.states.weakness, 'hero', 'Weakness state was correctly set');
  t.ok( lastLogHasStr(result, 'success'), 'log acknowledges success' );

  t.equal(
    calculate_damage_vs_monster(result, {
      monsterId: 'monster',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]},
      heroId: 'hero'
    }).value,
    3,
    'weakness gives 1 additional damage'
  );


  result = execUntil(battle, action);
  result = reply(result,makeRoll); // was prompted to roll for test, will fail
  t.ok(!result.monsters.monster.states.weakness, 'Weakness wasnt applied since invocation failed');
  t.ok( lastLogHasStr(result, 'fail'), 'log acknowledges fail' );

  t.equal(
    calculate_damage_vs_monster(result, {
      monsterId: 'monster',
      heroATK: {value: 4, history:[]},
      monsterARM: {value: 4, history:[]},
      heroId: 'hero'
    }).value,
    0,
    'weakness has no effect if didnt do damage'
  );

  t.end();

});
