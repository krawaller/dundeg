/*
Ends the current battle round. Initiated from flow_next_player.
Responsible for triggering end-of-round cleanup, as well as triggerign new round or endgame.
*/

import { BattleState, HeroId, FlowInstruction } from '../interfaces';

export interface ExecuteActionSpec {
  heroId: HeroId
}

export function flow_execute_action(battle: BattleState, {heroId}:ExecuteActionSpec): FlowInstruction {
  let hero = battle.heroes[heroId]
  if (!hero.vars.escaped){
    let action = hero.vars.action;
    if (!action){
      throw "Wanted to perform action for "+heroId+" but no action was selected!";
    }
    return action;
  }
}
