/*
Will trigger flow_next_player for the correct player. might involve question in case of tie.
Will also go to round end if there was no next player.
*/

import { BattleState, FlowInstruction, ApplyQuestion, LogMessageLine } from '../interfaces';
import { heroes } from '../library/heroes';
import { find_heroes } from '../find/find_heroes';
import { find_party_stat } from '../find/find_party_stat';

export function flow_next_player(battle: BattleState, spec: any): FlowInstruction {
  let party = find_party_stat(battle,{stat:'PER', reason:'playerOrder', group: 'notActed'});
  if (party.ordered.length === 0){
    return ['flow','roundEnd',{}];
  } else if (party.ordered[0].heroes.length === 1){
    let nextId = party.ordered[0].heroes[0];
    return ['flow','all',[
      ['apply','log',{line:[{heroRef: nextId},'has PER',party.individual[nextId],'and goes next']}],
      ['flow','playerRound',{heroId: nextId}]
    ]];
  } else {
    let line = <LogMessageLine>[];
    let opts = {};
    party.ordered[0].heroes.forEach(heroId=>{
      line = line.concat( [{heroRef: heroId}, 'has PER', party.individual[heroId], '. '] );
      opts[ heroes[battle.heroes[heroId].blueprint].name ] = <FlowInstruction>['flow','playerRound',{heroId}]
    });
    return <ApplyQuestion>['apply','question',{
      line: line.concat('Who shall go next?'),
      options: opts
    }];
  }
}
