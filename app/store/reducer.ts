import { AppState } from '../interfaces';

export function reducer(currentState: AppState, action): AppState{
  switch(action.type){
    case 'initiate': return action.newBattle;
    default: return currentState;
  }
}
