import { BattleState } from '../src/interfaces';

export function lastLogHasStr(battle: BattleState, str: string){
  if (!battle.log || !battle.log.length){
    throw "No messages in log when we went looking for "+str;
  }
  let lastMsg = battle.log[battle.log.length-1];
  return lastMsg.find( part => !!((<string>part).match && (<string>part).match(str)) );
}