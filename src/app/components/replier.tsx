import * as React from 'react'

import { Question, BattleState } from '../../engine/src/interfaces'

import { LogLine } from './logline'

import { withBattle } from '../connector'

export const Replier = withBattle((props) => {
  if (!props.battle.question) {
    return <div></div>
  }
  const btns = []
  for (const opt in props.battle.question.options) {
    btns.push(
      <button key={opt} onClick={() => props.reply(opt)}>
        {opt}
      </button>
    )
  }
  return (
    <div>
      <LogLine line={props.battle.question.line} highlight={true} />
      {btns}
    </div>
  )
})
