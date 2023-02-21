import { BattleState } from '../interfaces'

import { exec_step } from './exec_step'

import { FlowInstruction } from '../interfaces'

export interface ReplySpec {
  option: string
}

export function exec_reply(
  battle: BattleState,
  { option }: ReplySpec
): BattleState {
  if (!battle.question) {
    console.log(
      'dwokefirgjk',
      battle.question,
      JSON.parse(JSON.stringify(battle))
    )
    throw new Error(
      "Attempted to reply '" + option + "' but battle had no question!"
    )
  }
  if (!battle.question.options.hasOwnProperty(option)) {
    throw new Error(
      'Attempted to reply with unknown option ' +
        option +
        ', available ones were: ' +
        Object.keys(battle.question.options).join(',')
    )
  }
  return {
    ...battle,
    question: undefined,
    stack: [
      <FlowInstruction>[
        'apply',
        'log',
        { line: battle.question.line.concat([' => ', option]), type: 'reply' },
      ],
    ]
      .concat(
        battle.question.options[option] ? [battle.question.options[option]] : []
      )
      .concat(battle.stack || []),
  }
}
