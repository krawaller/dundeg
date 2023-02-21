import { AppState } from '../interfaces'

import { exec_until } from '../../engine/src/exec/exec_until'
import { exec_reply } from '../../engine/src/exec/exec_reply'
import { exec_step } from '../../engine/src/exec/exec_step'

export function reducer(currentState: AppState, action): AppState {
  switch (action.type) {
    case 'beginBattle':
      return {
        ...currentState,
        active: true,
      }
    case 'step':
      return {
        ...currentState,
        battle: exec_step(currentState.battle),
      }
    case 'reply':
      return {
        ...currentState,
        battle: exec_reply(currentState.battle, { option: action.option }),
      }
    case 'showcalc':
      return {
        ...currentState,
        calculation: action.dig
          ? [action.calc].concat(currentState.calculation)
          : [action.calc],
      }
    case 'backcalc':
      return {
        ...currentState,
        calculation: currentState.calculation.slice(1),
      }
    default:
      return currentState
  }
}
