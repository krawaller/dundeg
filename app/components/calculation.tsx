import * as React from 'react';

import { Question, BattleState, CalculationResult } from '../../engine/src/interfaces';

import { LogLine } from './logline';

import { withBattle } from '../connector';

export interface GivenProps { calculation: CalculationResult }

export const Calculation = withBattle<GivenProps>(props => {
  let rows = props.calculation.history.map((entry,n)=>(
    <tr key={n}>
      <td><LogLine line={entry[0]} /></td>
      <td>{entry[1]}</td>
    </tr>
  ));
  return (
    <div className='calctable'>
      <strong>Calculating {props.calculation.title}</strong>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
});
