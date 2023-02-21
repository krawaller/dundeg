import {
  BattleState,
  FlowInstruction,
  FlowApply,
  FlowFurther,
} from '../interfaces'
import { deepCopy } from '../utils/helpers'

import { exec_apply } from './exec_apply'
import { exec_flow } from './exec_flow'

export function exec_step(battle: BattleState): BattleState {
  const ret = deepCopy(battle)
  if (!ret.stack || !ret.stack.length) {
    throw 'No next step to execute in this battle!'
  }
  const instruction: FlowInstruction = ret.stack.shift()
  switch (instruction[0]) {
    case 'apply':
      return exec_apply(ret, <FlowApply>instruction)
    case 'flow':
      return exec_flow(ret, <FlowFurther>instruction)
    default:
      throw 'Unknown instruction: ' + instruction
  }
}
