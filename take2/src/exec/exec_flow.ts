import { BattleState, FlowFurther, FlowInstruction } from '../interfaces';

export function exec_flow(battle:BattleState, [,what,spec]:FlowFurther):BattleState{
  let newStack:any[] = [];
  switch(what){
    case 'all': break;//newStack = spec; break;
    default: throw 'Unknown flow: '+what;
  }
  return {...battle, stack: newStack.concat(battle.stack || [])};
}