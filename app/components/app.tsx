import * as React from 'react';
import { withBattle } from '../connector';

import { Battle } from './battle';

export const App = withBattle(props=>{
  return (
    props.active ? <Battle/> : (
      <div className="index">
        <div>
          <h4>Debug scenario #1</h4>
          <p>Here should be a proper description of who is involved in this scenario, items, skills, opponents, etc.</p>
          <button onClick={e=>props.beginBattle()}>Start this scenario</button>
        </div>
        <div>
          <h4>ToDo</h4>
          <p>Updated <strong>17-05-04</strong>.</p>
          <ul>
            <li>add Quick Actions</li>
            <li>add Pain enemy skill</li>
            <li>add infrastructure for hero entry skills</li>
            <li>add Provoke skill</li>
            <li>add Ferocious charge</li>
            <li>add Sneak attack</li>
            <li className="done">make power half for DEF too when attacking unarmed</li>
            <li className="done">add default unarmed attack</li>
            <li className="done">limit Find Weakness to 1 enemy at a time</li>
            <li className="done">change Escape to new rules</li>
            <li className="done">only allow reroll of stat tests</li>
            <li className="done">Hide unimplemented monster skills</li>
          </ul>
        </div>
        <div>
          <h4>Implemented Hero Skills</h4>
          <ul>
            <li>Backstab</li>
            <li>Blood curse</li>
            <li>Exterminator</li>
            <li>Find weakness</li>
            <li>Foekiller</li>
            <li>Rage</li>
            <li>Sixth sense</li>
          </ul>
        </div>
        <div>
          <h4>Implemented items</h4>
          <ul>
            <li>Daemon's blood</li>
            <li>Flash bomb (but requires fixing quick actions)</li>
            <li>Luncheon Truncheon (but requires quick actions)</li>
            <li>Nasty Cleaver</li>
            <li>Night cloak</li>
            <li>Shrapnel bomb</li>
            <li>Skinning Knife</li>
            <li>Spiked gauntlets</li>
            <li>Studded Leather</li>
          </ul>
        </div>
        <div>
          <h4>Implemented hero states</h4>
          <ul>
            <li>Blessed</li>
            <li>Exalted</li>
            <li>Focused</li>
            <li>Poisoned</li>
            <li>Stunned</li>
          </ul>
        </div>
        <div>
          <h4>Implemented Monster skills</h4>
          <ul>
            <li>Ambush</li>
            <li>Dimwit</li>
            <li>Drain</li>
            <li>Evade</li>
            <li>Fierce</li>
            <li>Horde</li>
            <li>Infect</li>
            <li>Pierce</li>
            <li>Pursue</li>
            <li>Skirmish</li>
            <li>Thief</li>
          </ul>  
        </div>
      </div>
    )
  )
});
