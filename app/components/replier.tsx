import * as React from 'react';

import { Question, BattleState } from '../../engine/src/interfaces';

import { LogLine } from './logline';

export interface ReplierProps {
  question: Question,
  battle: BattleState
}212

export class Replier extends React.Component<ReplierProps,undefined> {
  render(){
    let btns = [];
    for(let opt in (this.props.question.options)){
      btns.push(<button key={opt}>{opt}</button>);
    }
    return (
      <div>
        <LogLine line={this.props.question.line} />
        {btns}
      </div>
    )
  }
}
