import { BattleState } from '../interfaces';

import { exec_step } from './exec_step';

export interface ReplySpec {
  option: string
}

export function exec_reply(battle: BattleState, {option}: ReplySpec): BattleState{
  if (!battle.question){
    throw "Attempted to reply but battle had no question!";
  }
  if (!battle.question.options.hasOwnProperty(option)){
    throw "Attempted to reply with unknown option "+option+", available ones were: "+Object.keys(battle.question.options).join(",");
  }
  return {
    ...battle,
    question: undefined,
    stack: [].concat(battle.question.options[option] ? [battle.question.options[option]] : []).concat(battle.stack || [])
  };
}