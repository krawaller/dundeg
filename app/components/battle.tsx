import * as React from 'react';
import { typedConnect } from '../connector';

import { BattleState } from '../../engine/src/interfaces';

import { LogLine } from './logline';
import { Replier } from './replier';

export const Battle = typedConnect(
  appState => ({battle: appState.battle})
)(props=>{
  let b = props.battle;
  let log = props.battle.log.map(
    (msg,n) => <li key={n}><LogLine key={n} line={msg.line}/></li>
  ).reverse()
  return (
    <div>
      { b.question && <Replier question={b.question} battle={b} /> }
      <ul>
        {log}
      </ul>
    </div>
  )
});
