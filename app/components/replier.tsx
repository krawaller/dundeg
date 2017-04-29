import * as React from 'react';

import { Question, BattleState } from '../../engine/src/interfaces';

import { LogLine } from './logline';

import { withBattle } from '../connector';

export const Replier = withBattle(props => {
  if (!props.battle.question){
    return <div></div>;
  }
  let btns = [];
  for(let opt in (props.battle.question.options)){
    btns.push(<button key={opt} onClick={()=> props.reply(opt)}>{opt}</button>);
  }
  return (
    <div>
      <LogLine line={props.battle.question.line} />
      {btns}
    </div>
  )
});
