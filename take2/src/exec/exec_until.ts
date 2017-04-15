import { BattleState } from '../interfaces';

import { exec_step } from './exec_step';

export function exec_until(battle: BattleState): BattleState{
  while(battle.stack && battle.stack.length && !battle.question){
    battle = exec_step(battle);
  }
  return battle;
}