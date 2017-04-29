import * as React from 'react';
import { withBattle } from '../connector';

import { BattleState, LogMessageLine, LogMessagePart, LogMessageItemRef, CalculationResult, LogMessageHeroRef, LogMessageMonsterRef } from '../../engine/src/interfaces';

import { heroes } from '../../engine/src/library/heroes';

export interface GivenProps { line: LogMessageLine }

export const LogLine = withBattle<GivenProps>((props)=>{
  function renderItem(item:LogMessagePart){
    if (typeof item === 'string'){
      return item;
    } else if ((item as CalculationResult).hasOwnProperty('value')){
      return (item as CalculationResult).value;
    } else if ((item as LogMessageHeroRef).heroRef){
      return (item as LogMessageHeroRef).heroRef;
    } else if ((item as LogMessageMonsterRef).monsterRef){
      return (item as LogMessageMonsterRef).monsterRef;
    } else if ((item as LogMessageItemRef).itemRef){
      return (item as LogMessageItemRef).itemRef;
    } else {
      console.log("WHat is this?!", item);
      throw "WHATT"
    }
  }
  return (
    <div className="logline">
      {props.line.map( i=>renderItem(i) ).join(' ')}
    </div>
  );
});
