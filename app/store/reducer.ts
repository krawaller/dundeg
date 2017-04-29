import { AppState } from '../interfaces';

import { exec_until } from '../../engine/src/exec/exec_until';
import { exec_reply } from '../../engine/src/exec/exec_reply';

export function reducer(currentState: AppState, action): AppState{
  switch(action.type){
    case 'reply':
      console.log("Got action", action);
      return {
        ...currentState,
        battle: exec_until(exec_reply(currentState.battle, {option:action.option}))
      };
    case 'showcalc':
      return {
        ...currentState,
        calculation: action.calc
      }
    default: return currentState;
  }
}
