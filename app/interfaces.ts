import { BattleState, CalculationResult } from '../engine/src/interfaces'

export interface AppState {
  battle?: BattleState
  calculation: CalculationResult[]
  active?: boolean
}

export type Action = {
    type: string,
    [name: string]: any,
};

// https://www.silviogutierrez.com/blog/react-redux-and-typescript-typed-connect/

export interface Dispatch {
  <R>(asyncAction: (dispatch: Dispatch, getState: () => AppState) => R): R;
  <R>(asyncAction: (dispatch: Dispatch) => R): R;
  // (neverAction: (dispatch: Dispatch, getState: () => GetState) => never): never;
  (action: Action): void;
  // (action: Thunk): ; // thunks in this app must return a promise
}