import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';
import * as thunk from 'redux-thunk';

import { BattleState } from '../../engine/src/interfaces';
import { makeHero, makeMonster } from '../../engine/tests/testutils';
import { exec_flow } from '../../engine/src/exec/exec_flow';
import { exec_until } from '../../engine/src/exec/exec_until';
import { exec_step } from '../../engine/src/exec/exec_step';

let battle: BattleState = {
  heroes: {
    hero1: makeHero('soldierOfFortune',{HP: 18, luck: 2, gold: 5},{},{findWeakness:true,rage:true},['skinningKnife','shrapnelBomb','daemonsBlood']),
    hero2: makeHero('bloodsportBrawler',{HP: 18, luck: 3, gold: 10},{},{backStab:true,sixthSense:true,exterminator:true},['spikedGauntlet'])
  },
  monsters: {
    mon1: makeMonster('slitherFish'),
    mon2: makeMonster('footPad'),
    mon3: makeMonster('ratThing'),
    mon4: makeMonster('harpy')
  },
  log: [],
  seed: Math.random()+''
};

battle = exec_flow(battle, ['flow','beginBattle',{}]);
//battle = exec_until(battle);


// A super-simple logger
const logger = store => next => action => {
  console.log('dispatching', action.type,action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const stepper = ({dispatch,getState}) => next => action => {
  let before = getState();
  if (action.type === 'reply'){
    next(action);
    dispatch({type:'step'});
  } else if (action.type === 'step' && !before.battle.question){
    next(action);
    let after = getState();
    if (!after.battle.question && after.battle.stack.length){
      if (before.battle.log.length !== after.battle.log.length){
        setTimeout(()=>dispatch({type:'step'}),1000);
      } else {
        dispatch({type:'step'});
      }
    }
  } else if (action.type === 'beginBattle'){
    next(action);
    dispatch({type:'step'}); // set it off! :D
  } else {
    next(action);
  }
}

export const store = applyMiddleware(stepper,logger)(createStore)( reducer, <any>{battle,calculation:[],active:false} );
