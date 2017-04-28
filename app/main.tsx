import * as React from 'react';
import * as ReactDOM from 'react-dom';


import { BattleState } from '../engine/src/interfaces';

import { Battle } from './components/battle';
import { makeHero, makeMonster } from '../engine/tests/testutils';
import { exec_flow } from '../engine/src/exec/exec_flow';
import { exec_until } from '../engine/src/exec/exec_until';

import { Provider } from 'react-redux';

import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <Battle/>
  </Provider>,
  document.getElementById('wrapper')
);
