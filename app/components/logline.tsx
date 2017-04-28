import * as React from 'react';
import { typedConnect } from '../connector';

import { BattleState, LogMessageLine, LogMessagePart, CalculationResult, LogMessageHeroRef, LogMessageMonsterRef } from '../../engine/src/interfaces';

import { heroes } from '../../engine/src/library/heroes';

export type LogLineProps = StateProps & GivenProps;

export interface GivenProps {
  line: LogMessageLine
}

export interface StateProps {
  battle: BattleState
}

import { AppState } from '../interfaces';

const mapStateToProps = (appState: AppState, givenProps: GivenProps)=> ({
  battle: appState.battle
});

export const LogLine = typedConnect(mapStateToProps)((props)=>{
  function renderItem(item:LogMessagePart){
    if (typeof item === 'string'){
      return item;
    } else if ((item as CalculationResult).value){
      return (item as CalculationResult).value;
    } else if ((item as LogMessageHeroRef).heroRef){
      return (item as LogMessageHeroRef).heroRef;
    } else if ((item as LogMessageMonsterRef).monsterRef){
      return (item as LogMessageMonsterRef).monsterRef;
    } else {
      throw "WHATT"
    }
  }
  return (
    <div className="logline">
      {props.line.map( i=>renderItem(i) ).join(' ')}
    </div>
  );
});
