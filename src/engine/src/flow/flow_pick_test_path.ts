/*
Utility flow method used inside flow_test, to send player down correct path (success/failure)
*/

import { BattleState, FlowInstruction, Test } from '../interfaces'

export function flow_pick_test_path(
  battle: BattleState,
  test: Test
): FlowInstruction {
  if (battle.heroes[test.heroId].vars.testOutcome) {
    return test.success
  } else {
    return test.failure
  }
}
