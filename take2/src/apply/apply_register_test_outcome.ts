import { BattleState, Test } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';

export function apply_register_test_outcome (battle:BattleState, test: Test): BattleState {
  let ret = deepCopy(battle);
  let calc = calculate_hero_stat(ret, {heroId: test.heroId, stat: test.stat, reason: test.reason});
  let hero = ret.heroes[test.heroId];
  let dice = test.dice === 'attack' ? hero.vars.attackDice : hero.vars.defenceDice;
  let versus = dice[0] + dice[1];
  if (versus > calc.value){
    addLog(ret, [{heroRef: test.heroId}, `rolled ${versus} but ${test.stat} is`,calc,'so test failed'], 'fail');
    hero.vars.testOutcome = 0;
  } else {
    addLog(ret, [{heroRef: test.heroId}, `rolled ${versus} and ${test.stat} is`,calc,'so test succeeded'], 'success');
    hero.vars.testOutcome = Math.max(dice[0],dice[1]);
  }
  return ret;
}
