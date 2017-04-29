import * as React from 'react';
import { withBattle } from '../connector';

import { BattleState, LogMessageLine, LogMessagePart, LogMessageItemRef, CalculationResult, LogMessageHeroRef, LogMessageMonsterRef } from '../../engine/src/interfaces';

import { heroes } from '../../engine/src/library/heroes';

export interface GivenProps { line: LogMessageLine, where?: string }

export const LogLine = withBattle<GivenProps>((props)=>{
  function renderItem(item:LogMessagePart,n){
    if (typeof item === 'string'){
      return <span key={n}>{item}</span>;
    } else if ((item as CalculationResult).hasOwnProperty('value')){
      return <span key={n} onClick={e=>props.showCalculation(item,props.where === 'calc')} className='calculation'>{(item as CalculationResult).value}</span>;
    } else if ((item as LogMessageHeroRef).heroRef){
      return <span key={n}>{heroes[props.battle.heroes[(item as LogMessageHeroRef).heroRef].blueprint].name}</span>;
    } else if ((item as LogMessageMonsterRef).monsterRef){
      return <span key={n}>{props.battle.monsters[(item as LogMessageMonsterRef).monsterRef].name}</span>;
    } else if ((item as LogMessageItemRef).itemRef){
      return <span key={n}>{(item as LogMessageItemRef).itemRef}</span>;
    } else {
      console.log("WHat is this?!", item);
      throw "WHATT"
    }
  }
  if (!props.line){
    console.log("whats going on?!", props)
  }
  return (
    <div className="logline">
      {props.line.map( renderItem )}
    </div>
  );
});
