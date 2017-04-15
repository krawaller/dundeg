import * as test from "tape";
import { makeMonster, makeHero, lastLogHasStr } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { calculate_damage_vs_monster } from '../../src/calculate/calculate_damage_vs_monster';
import { apply_weakness_invocation_result } from '../../src/apply/apply_weakness_invocation_result';
import { find_hero_actions } from '../../src/find/find_hero_actions';

test('the Weakness state caused by Find Weakness skill', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{target:'monster',stance:'assault'},{},{findWeakness:true}) },
    monsters: { monster: makeMonster('slitherFish') },
    log: []
  };

  t.ok(
    !find_hero_actions(battle,{heroId:'hero'}).findWeakness,
    'find weakness not available in assault stance'
  );

  battle.heroes.hero.vars.stance = 'defence';
  t.ok(
    find_hero_actions(battle,{heroId:'hero'}).findWeakness,
    'find weakness available in defence stance'
  );

  battle.heroes.hero.vars.testOutcome = 0; // Failed
  battle = apply_weakness_invocation_result(battle,{heroId:'hero'});
  t.ok(!battle.monsters.monster.states.weakness, 'Weakness wasnt applied since invocation failed');
  t.ok( lastLogHasStr(battle, 'fail'), 'log acknowledges fail' );

  battle.heroes.hero.vars.testOutcome = 5; // success
  battle = apply_weakness_invocation_result(battle,{heroId:'hero'});
  t.equal(battle.monsters.monster.states.weakness, 'hero', 'Weakness state was correctly set');
  t.ok( lastLogHasStr(battle, 'success'), 'log acknowledges success' );

  t.equal(
    calculate_damage_vs_monster(battle, {
      monsterId: 'monster',
      heroATK: {value: 6, history:[]},
      monsterARM: {value: 4, history:[]},
      heroId: 'hero'
    }).value,
    3,
    'weakness gives 1 additional damage'
  );

  t.equal(
    calculate_damage_vs_monster(battle, {
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
