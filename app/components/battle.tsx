import * as React from 'react';
import { withBattle } from '../connector';

import { BattleState } from '../../engine/src/interfaces';

import { LogLine } from './logline';
import { Replier } from './replier';

export const Battle = withBattle(props=>{
  let b = props.battle;
  let log = props.battle.log.map(
    (msg,n) => <li key={n}><LogLine key={n} line={msg.line}/></li>
  ).reverse()
  return (
    <div>
      { b.question && <Replier/> }
      <ul>
        {log}
      </ul>
    </div>
  )
});
