import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BattleState } from '../engine/src/interfaces'

import { App } from './components/app'
import { makeHero, makeMonster } from '../engine/tests/testutils'
import { exec_flow } from '../engine/src/exec/exec_flow'
import { exec_until } from '../engine/src/exec/exec_until'

import { Provider } from 'react-redux'

import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
)
