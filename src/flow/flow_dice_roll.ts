import { BattleState, MonsterId, FlowInstruction, FlowTarget, DiceSpec, LogMessageLine, ApplyDiceRoll } from '../interfaces';

export interface MakeRollSpec {
  heroId,
  diceTypes: DiceSpec,
  line: LogMessageLine
}

export function flow_dice_roll(battle: BattleState, {heroId,diceTypes,line}:MakeRollSpec): FlowInstruction {
  return ['apply','question',{
    line: line,
    options: {
      roll: ['flow','all',[
        <ApplyDiceRoll>['apply','diceRoll',{heroId,diceTypes}],
        ['flow','offerReroll',{heroId,diceTypes}]
      ]]
    }
  }];
}
