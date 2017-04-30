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
  let log = b.log.map(
    (msg,n) => <li key={n}><span className="lognum">{n+1}</span> <LogLine key={n} line={msg.line} highlight={!b.question && n === b.log.length-1}/></li>
  ).reverse()
  let highlights = {}, from;
  from = b.question ? b.question.line : b.log && b.log.length ? b.log[b.log.length-1].line : [];
  from.forEach(part=>{
    if (part.heroRef){
      highlights[part.heroRef] = true;
    } else if (part.monsterRef){
      highlights[part.monsterRef] = true;
    }
  });
  return (
    <div className="battle">
      <div>
        { b.question && <Replier/> }
        <ul className="loglist">
          {log}
        </ul>
      </div>
      <div>
        {Object.keys(b.heroes).map(heroId=> <Hero key={heroId} heroId={heroId} highlight={highlights[heroId]} />)}
        {Object.keys(b.monsters).map(monsterId=> <Monster key={monsterId} monsterId={monsterId} highlight={highlights[monsterId]}/>)}
        {props.calculation.length > 0 ? <Calculation/> : undefined}
      </div>
    </div>
  )
});
