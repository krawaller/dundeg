import * as React from 'react';

import { Question, BattleState, CalculationResult } from '../../engine/src/interfaces';

import { LogLine } from './logline';

import { withBattle } from '../connector';

export const Calculation = withBattle(props => {
  let rows = props.calculation[0].history.map((entry,n)=>(
    <tr key={n}>
      <td><LogLine line={entry[0]} where="calc" /></td>
      <td>{entry[1]}</td>
    </tr>
  ));
  return (
    <div className='calctable'>
      {props.calculation.length > 1 && <button onClick={e=>props.backCalculation()}>back</button>}
      <strong>Calculating {props.calculation[0].title}</strong>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
});
