import { createStore } from 'redux';
import { reducer } from './reducer';

import { BattleState } from '../../engine/src/interfaces';
import { makeHero, makeMonster } from '../../engine/tests/testutils';
import { exec_flow } from '../../engine/src/exec/exec_flow';
import { exec_until } from '../../engine/src/exec/exec_until';

let battle: BattleState = {
  heroes: {
    hero1: makeHero('hinterLander',{HP: 16}),
    hero2: makeHero('soldierOfFortune',{HP: 18})
  },
  monsters: {
    mon1: makeMonster('slitherFish')
  },
  log: []
};

battle = exec_flow(battle, ['flow','beginBattle',{}]);
battle = exec_until(battle);

export const store = createStore( reducer, <any>{battle} );
