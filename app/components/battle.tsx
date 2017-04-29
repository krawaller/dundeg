import * as React from 'react';
import { withBattle } from '../connector';

import { BattleState } from '../../engine/src/interfaces';

import { LogLine } from './logline';
import { Replier } from './replier';
import { Calculation } from './calculation';
import { Hero } from './hero';
import { Monster } from './monster';

export const Battle = withBattle(props=>{
  let b = props.battle;
  let log = props.battle.log.map(
    (msg,n) => <li key={n}><span className="lognum">{n+1}</span> <LogLine key={n} line={msg.line}/></li>
  ).reverse()
  console.log("WTF",props);
  return (
    <div className="battle">
      <div>
        { b.question && <Replier/> }
        <ul className="loglist">
          {log}
        </ul>
      </div>
      <div>
        {Object.keys(props.battle.heroes).map(heroId=> <Hero key={heroId} heroId={heroId}/>)}
        {Object.keys(props.battle.monsters).map(monsterId=> <Monster key={monsterId} monsterId={monsterId}/>)}
        {props.calculation.length > 0 ? <Calculation/> : undefined}
      </div>
    </div>
  )
});
