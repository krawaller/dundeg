import * as React from 'react';
import { withBattle } from '../connector';

import { BattleState, MonsterId } from '../../engine/src/interfaces';

import { monsters } from '../../engine/src/library/monsters';
import { heroes } from '../../engine/src/library/heroes';

export interface GivenProps { monsterId: MonsterId }

export const Monster = withBattle<GivenProps>((props)=>{
  let monster = props.battle.monsters[props.monsterId];
  let blueprint = monsters[monster.blueprint];
  let status = 
    monster.vars.killedBy ? 'dead' :
    monster.vars.target ? 'targetting '+heroes[props.battle.heroes[monster.vars.target].blueprint].name :
    monster.vars.escaped ? 'escaped' : 
    'idle';
  return (
    <div className="monster">
      <strong>Monster: {blueprint.name}</strong>
      <div>HP: {monster.vars.HP}/{blueprint.stats.HP}, status: {status}</div>
      <div>skills: {Object.keys(blueprint.skills).join(',')}</div>
      {Object.keys(monster.states).length>0 && <div>states: {Object.keys(monster.states).join(',')}</div>}
    </div>
  );
});
