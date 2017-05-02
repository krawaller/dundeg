/*
Ends the current battle round. Initiated from flow_next_player.
Responsible for triggering end-of-round cleanup, as well as triggerign new round or endgame.
*/

import { BattleState, MonsterId, FlowInstruction, ApplyQuestion } from '../interfaces';

import { find_heroes } from '../find/find_heroes';
import { find_monsters } from '../find/find_monsters';

export function flow_round_end(battle: BattleState,spec:any): FlowInstruction {
  let andThen:FlowInstruction;
  if (!find_heroes(battle).length){
    andThen = ['flow','loseGame',{}];
  } else if (!find_monsters(battle,{}).length){
    andThen = ['flow','winGame',{}];
  } else {
    andThen = ['flow','newRound',{}];
  }
  return ['flow','all',[
    ['flow','eachMonster',monsterId=> <FlowInstruction>['apply','endRoundMonster',{monsterId}]],
    ['flow','eachHero',heroId=> <FlowInstruction>['apply','endRoundHero',{heroId}]],
    ['flow','eachEscapedHero',heroId=> <FlowInstruction>['apply','endRoundHero',{heroId}]],
    andThen
  ]];
}
