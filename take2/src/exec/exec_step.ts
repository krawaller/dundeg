import { BattleState, FlowInstruction, FlowApply, FlowFurther } from '../interfaces';
import { deepCopy } from '../utils/helpers';

import { exec_apply } from './exec_apply';
import { exec_flow } from './exec_flow';

export function exec_step(battle: BattleState): BattleState{
  let ret = deepCopy(battle);
  if (!ret.stack || !ret.stack.length){
    throw "No next step to execute in this battle!";
  }
  let instruction: FlowInstruction = ret.stack.shift();
  switch(ret[0]){
    case 'apply': return exec_apply(ret, <FlowApply>instruction);
    case 'flow': return exec_flow(ret, <FlowFurther>instruction);
  }
}